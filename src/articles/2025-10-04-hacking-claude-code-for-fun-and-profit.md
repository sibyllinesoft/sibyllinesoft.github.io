---
title: "Hacking Claude Code for Fun and Profit"
description: "Proxy Claude Code through Bifrost to route traffic anywhere while capturing OpenTelemetry traces you can explore in Grafana, Tempo, and ClickHouse."
date: 2025-10-04
published: true
tags: ["articles", "agents", "observability", "otel", "bifrost", "claude"]
layout: article.njk
image: "/img/optimized/article-hacking-claude-code.webp"
---
<div class="tldr-banner">
  <strong>TL;DR</strong>
  <ul>
    <li>Drop Bifrost in front of Claude Code to rewrite inference calls without touching the agent</li>
    <li>Use Bifrost to instrument your agents for Open Telemetry.</li>
    <li>Emit spans for every webhook invocation, then analyze them using Clickhouse.</li>
    </ul>
</div>

<p>
Agents are really easy to hack. Proxies provide a convenient location to hook into agents; this is the technique that Claude Code Router uses to enable multi-provider support. Pretty much all agents support proxying, otherwise they'd be locked out of enterprise. This technique is incredibly powerful; you can rewrite context to completely override harness behavior at the proxy level transparently.
</p>
<p>
Since this is a quick off the cuff article, we're just going to dip our toes into this technique by demonstrating how to leverage the LLM router Bifrost to use Claude Code with any model while emitting Open Telemetry (OTel) traces so you can analyze your agent's failures. These examples are simple to demonstrate the pattern, but Bifrost supports transformational middleware, so the sky's the limit. I've got an optimizing router and a context compiler that both use this same pattern to transparently interact with agents that I'll demo in a future article.
</p>
<p>
I've prepared a demo repo; the code is straightforward. I've included a basic, unopinionated observability stack with an OTel collector, Grafana Tempo and Clickhouse. If your job is to do stuff with agents, I strongly advise becoming comfortable with Clickhouse at a minimum; think of trace analysis like knowing how to use a debugger or profile code, it's a sign of a skilled engineer.
</p>

<div class="cta-section">
  <a href="https://github.com/sibyllinesoft/agent-hacking" class="btn-unified btn-primary" target="_blank" rel="noopener noreferrer">
    <span class="btn-inner">
      View Demo on GitHub
      <i data-lucide="github"></i>
    </span>
  </a>
</div>

## What's included

The [`agent-hacking` repo](https://github.com/sibyllinesoft/agent-hacking) packages everything you need for a realistic lab environment:

- **`claude-code` container**: Claude Code CLI, Bifrost gateway, and sensible OTLP defaults
- **Transformational proxy**: Bifrost forwards `/anthropic` traffic to OpenRouter out of the box; bring your own provider keys
- **Observability stack**: OpenTelemetry Collector, ClickHouse, Grafana Tempo, and Grafana pre-wired for tracing
- **Webhook harness**: Minimal server that shells out to the CLI so you can test flows with plain `curl`

Use it as a sandbox to practice proxy-first agent engineering or as a blueprint for wiring your production fleet.

## Prepare credentials

Clone the repo somewhere convenient and provide API keys that speak the Anthropics surface:

```bash
cp .env.example .env
echo "OPENROUTER_API_KEY=sk-..." >> .env
# Optional: export ANTHROPIC_API_KEY / CLAUDE_API_KEY if you prefer direct Anthropic calls
```

Docker Compose also reads `OPENROUTER_API_KEY` from your shell, so you can `export` it instead of editing `.env` if you prefer.

## Launch the stack

Build and start everything in one command:

```bash
docker compose up --build
```

The `claude-code` service runs `privileged: true` so the bundled Go auto-instrumentation can attach to Bifrost. If you need a non-privileged run, drop `BIFROST_ENABLE_OTEL_AUTOINSTRUMENTATION=0` into `.env` before you start.

Ports are exposed on localhost:

- Claude Code webhook: `http://localhost:8787`
- Bifrost gateway: `http://localhost:6080` (container `8080`)
- Grafana: `http://localhost:6300` (`admin` / `admin`)
- Tempo API: `http://localhost:3200`
- ClickHouse SQL: `http://localhost:8123`
- OTLP ingest: `4317` (gRPC) and `4318` (HTTP)

## Kick the tires with curl

The Claude Code workspace starts empty so you can demonstrate Git workflows or scripted demos, but simple prompts are enough to validate the pipeline:

```bash
curl -X POST http://localhost:8787/ \
  -H 'content-type: application/json' \
  -d '{"prompt":"List the files in the current workspace and exit."}'
```

Because the webhook shells out to the CLI, every run emits two spans—`claude.webhook` and `claude.cli`—even if the downstream provider returns an error. That makes it trivial to smoke-test the stack before you add secrets.

Need a longer trace? Ask for a multi-step workflow and watch the span tree grow:

```bash
curl -s -o /tmp/claude-steps.json -w "\nHTTP %\{http_code\}\n" \
  http://localhost:8787 \
  -H 'content-type: application/json' \
  -d '{"prompt":"In multiple steps create a file hello.txt containing hello world, list the directory after each step, and finally cat the file."}'
cat /tmp/claude-steps.json | jq '.data'
```

## Explore traces in Grafana Tempo

1. Open `http://localhost:6300` and log in with `admin` / `admin`.
2. Navigate to **Explore → Traces** and select the **Tempo** data source.
3. Expand the time range to the last 15 minutes (or longer if your demo has been idle).
4. Run `TraceQL` queries like `{ service.name = "claude-code-bifrost" }` to list webhook executions.
5. Click a trace to inspect attributes for `claude.webhook`, `claude.cli`, and any auto-instrumented `bifrost-gateway` spans.

Tempo's REST API (`http://localhost:3200/api/search?limit=5`) is handy for quick health checks if you're scripting demos.

## Inspect raw spans in ClickHouse

The collector ships everything into the `otel` database so you can query spans with SQL:

```bash
docker compose exec clickhouse clickhouse-client --query "
  SELECT
    toString(Timestamp)                     AS ts,
    SpanAttributes['claude.response.body']  AS final_response,
    SpanAttributes['claude.streams']        AS turn_summaries
  FROM otel.otel_traces
  WHERE ServiceName = 'claude-code-bifrost'
    AND SpanName    = 'claude.cli'
  ORDER BY Timestamp DESC
  LIMIT 1;
"
```

Swap `ServiceName` to `bifrost-gateway` to watch every Anthropic-compatible API call pass through the proxy:

```bash
docker compose exec clickhouse clickhouse-client --query "
  SELECT Timestamp, SpanAttributes['http.request.body'], SpanAttributes['http.response.status_code']
  FROM otel.otel_traces
  WHERE ServiceName = 'bifrost-gateway'
  ORDER BY Timestamp DESC
  LIMIT 1;
"
```

## Point other agents at Bifrost

Claude Code isn't special—any agent that accepts an OpenAI- or Anthropic-style base URL can ride the same proxy. To route Codex or another OpenAI-compatible client, point it at Bifrost's default `/v1` endpoint instead of `/anthropic`, keep your existing keys, and reuse the observability stack. The middleware pattern stays the same: intercept, rewrite, emit spans, and forward downstream.

## Dial in your own stack

- **Swap providers**: Edit `bifrost.config.json` to add weighted provider pools or different Anthropic-compatible backends. Secrets can flow through environment variables or Docker secrets; the entrypoint automatically mirrors `OPENROUTER_API_KEY` into `ANTHROPIC_API_KEY` and `CLAUDE_API_KEY` when those are unset.
- **Tune telemetry**: Adjust `OTEL_SERVICE_NAME` in `docker-compose.yaml` if you run multiple instances, or disable auto-instrumentation with `BIFROST_ENABLE_OTEL_AUTOINSTRUMENTATION=0` for non-privileged environments.
- **Extend playbooks**: Drop richer automation scripts into `playbooks/` to showcase full agent workflows without leaving the container.
- **Reuse the collector**: Because OTLP ports are exposed on localhost, you can feed other workloads into the same ClickHouse + Tempo backends for unified trace analysis.

Bifrost's transformational middleware lets you rewrite context, inject guardrails, or run optimization passes before the agent ever sees the prompt. This demo keeps things simple—proxy requests, surface traces—but the pattern scales to context compilers, routing layers, and whatever else you need to tame production agents.
