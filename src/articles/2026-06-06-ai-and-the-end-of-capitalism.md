---
title: "AI and the End of Capitalism"
description: "Sovereign debt, AI growth, and the political economy of the next fiscal regime"
date: 2026-06-06
published: false
tags:
  - articles
  - ai
  - economics
  - society
layout: article.njk
image: "/img/optimized/article-ai-end-capitalism.webp"
cardImage: "/img/optimized/article-ai-end-capitalism.webp"
---

<link rel="stylesheet" href="/styles/pages/ai-end-capitalism.css">
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js" defer></script>
<script src="/js/articles/ai-end-capitalism-fiscal.js" defer></script>
<script src="/js/articles/ai-end-capitalism-capture.js" defer></script>

<div class="tldr-banner">
  <strong>tl;dr:</strong>
  <p>AI will end our current model of capitalism not because it makes labor obsolete, but because the United States will have to socialize AI surplus to preserve fiscal solvency.</p>
</div>

## Capitalism Is Eating Itself

You've probably heard big tech CEOs like Elon Musk and Dario Amodei say that AI will end capitalism as we know it, leading us to a post-labor utopia where people receive universal income, freeing them to live a life of leisure. While universal income is a Star Trek fantasy predicated on superintelligent AI, nearly infinite free energy and dozens of robots for every person, their assertion that AI will end capitalism is actually correct, just not for the reasons they think. The real reason that AI will end capitalism as we know it is grounded in something much more mundane: public debt.

To understand how public debt is going to cause this capitalist implosion, you have to understand the fiscal scenario the United States finds itself in currently.

## The Fiscal Cliff

While the national debt has been a subject of debate in politics for decades, several factors conspire to make the situation much more dire now than in the past: slowing growth and rising interest rates against a backdrop of geopolitical realignment and de-dollarization.

The United States national debt sits in excess of 100% of GDP, and even with fairly low average interest rates on that debt (~3.34%), the service burden (18.5% of the budget) is comparable to yearly military expenditures. This sounds bad (and it is), but it's merely a prologue to the horror that awaits us on the path we're currently following given our budget deficit. If the US was paying the same rate on its debt as its citizens have to pay currently to get a mortgage, it would become insolvent in between 10 and 20 years. The really scary thing is that this isn't a hypothetical, we're being rapidly pushed towards this scenario.

US debt has historically been artificially cheap due to the world's reliance on the dollar as the reserve currency, and a reliance on American geopolitical hegemony. With our slow (and lately, not so slow) decline into political dysfunction, fiscal disarray and geopolitical alienation, the bond market is demanding a risk premium on our debt. As a result, not only must new debt be financed at higher rates, but a lot of old debt that was financed with short term bonds under a lower interest rate regime must now be rolled over to higher interest rates as well. This is particularly relevant since the treasury has been leaning towards short term debt recently. As a result, the average rate we're paying on our national debt could (and probably will) spike uncomfortably.

I've included a plot to provide intuition about the scale and time frame of the problem, and its sensitivity to changes in underlying assumptions. The most relevant knob to turn is the interest rates mean shift, which has also been wired into a model of how AI could rescue the economy later in this article.

<figure class="interactive-fiscal-chart" style="margin: 2rem 0;">
  <div class="fiscal-chart-panel" data-fiscal-chart>
    <div class="fiscal-chart-controls" aria-label="Fiscal projection controls">
      <div class="scenario-buttons" role="group" aria-label="Projection scenario">
        <button type="button" class="scenario-button is-active" data-scenario="official">
          CBO-centered prior
        </button>
        <button type="button" class="scenario-button" data-scenario="optimistic">
          Growth-biased prior
        </button>
        <button type="button" class="scenario-button" data-scenario="pessimistic">
          Rate-stress prior
        </button>
      </div>
      <div class="fiscal-eli5" data-eli5></div>
      <details class="config-disclosure" data-config-disclosure>
        <summary>Configure model</summary>
        <div class="fiscal-input-grid" data-config-panel>
          <label>
            Revenue growth mean shift
            <span class="prior-help" tabindex="0" aria-label="Revenue growth mean shift explanation">?</span>
            <span class="prior-tooltip">Moves the center of the annual revenue-growth prior above or below CBO. In real terms, this is your view on whether taxable wages, profits, capital gains, tariffs, inflation, and AI productivity will systematically beat or miss the official path.</span>
            <input type="range" min="-1.5" max="1.5" step="0.1" value="0" data-control="revenueMean">
            <output data-output="revenueMean">+0.0pp</output>
          </label>
          <label>
            Interest-rate mean shift
            <span class="prior-help" tabindex="0" aria-label="Interest-rate mean shift explanation">?</span>
            <span class="prior-tooltip">Moves the center of the effective Treasury-rate prior above or below the CBO-implied path. In real terms, this is your view on persistent inflation, term premia, Treasury demand, Fed policy, and rollover costs.</span>
            <input type="range" min="-1.5" max="1.5" step="0.1" value="0" data-control="rateMean">
            <output data-output="rateMean">+0.0pp</output>
          </label>
          <label>
            Primary deficit stance
            <span class="prior-help" tabindex="0" aria-label="Primary deficit stance explanation">?</span>
            <span class="prior-tooltip">Scales the non-interest deficit path before interest is added. In real terms, lower values mean taxes, entitlement reform, or spending restraint; higher values mean tax cuts, new spending, recessionary transfers, or weaker fiscal discipline.</span>
            <input type="range" min="0.75" max="1.25" step="0.01" value="1" data-control="primaryDeficit">
            <output data-output="primaryDeficit">1.00x</output>
          </label>
          <label>
            Revenue growth prior sigma
            <span class="prior-help" tabindex="0" aria-label="Revenue growth prior sigma explanation">?</span>
            <span class="prior-tooltip">Controls how wide the prior is around CBO's annual revenue-growth path. In real terms, higher values mean more uncertainty about taxable growth from wages, profits, capital gains, tariffs, inflation, and AI productivity.</span>
            <input type="range" min="0.2" max="2.5" step="0.1" value="0.8" data-control="revenueSigma">
            <output data-output="revenueSigma">0.8pp</output>
          </label>
          <label>
            Interest-rate prior sigma
            <span class="prior-help" tabindex="0" aria-label="Interest-rate prior sigma explanation">?</span>
            <span class="prior-tooltip">Controls how wide the prior is around the effective Treasury interest-rate path implied by CBO debt-service projections. In real terms, higher values mean more uncertainty about inflation, term premia, Treasury demand, Fed policy, and rollover costs.</span>
            <input type="range" min="0.2" max="2.5" step="0.1" value="0.7" data-control="rateSigma">
            <output data-output="rateSigma">0.7pp</output>
          </label>
        </div>
      </details>
      <div class="fiscal-fit-summary" data-fit-summary aria-label="Exponential fit summary"></div>
    </div>
    <div id="net-interest-revenue-chart" class="plotly-chart" aria-label="Interactive line chart of federal revenue, net interest outlays, and revenue after interest"></div>
    <div id="debt-chart" class="plotly-chart" aria-label="Interactive line chart of federal debt projections"></div>
    <section class="debt-burden-guide" aria-label="Debt service burden guide">
      <h3>How to read the debt-service burden</h3>
      <p>Think of net interest as rent on past borrowing. At low levels it is annoying but manageable. At high levels it starts crowding out choices: every extra dollar going to bondholders is a dollar that cannot go to defense, health care, tax cuts, infrastructure, or deficit reduction.</p>
      <div class="burden-thresholds" data-burden-summary></div>
      <p class="burden-source">For scale: CBO-derived summaries put interest at roughly <strong>19% of federal revenue in 2026</strong> and about <strong>26% by 2036</strong>, while net interest rises from about <strong>$1.0T</strong> to <strong>$2.1T</strong>. Source: <a href="https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook">CRFB summary of CBO's February 2026 outlook</a>.</p>
    </section>
    <p class="scenario-note" data-scenario-note></p>
  </div>
  <figcaption style="text-align: center; font-size: 0.9rem; color: var(--color-gray-60, #666); margin-top: 0.5rem;">This is a Bayesian-style prior model centered on CBO-derived anchors summarized by <a href="https://www.americanactionforum.org/insight/cbo-projects-troubling-long-term-budget-outlook/">AAF</a> and <a href="https://www.crfb.org/papers/cbos-february-2026-budget-and-economic-outlook">CRFB</a></figcaption>
</figure>

The key intuition to take away from this is that the debt situation is largely driven by the effective interest rate we're paying. Given the historical stabilizing factors for that rate are being dismantled by the current administration, that puts us at risk of a fiscal crisis. Is there anything we can do to save ourselves?

## The Options

We aren't helpless, there are three main ways the math of the debt and federal revenue can be made to work out (in order of feasibility):

* We can grow the economy so the debt becomes a smaller portion of the total pie.
* We can manipulate the debt burden by printing money or implementing financial repression to lower effective rates.
* We can pay down debt using a combination of taxes and austerity.

Of these three, only growing the economy is a true off-ramp that avoids significant pain. If the broligarchy can grow us out of our fiscal problems, that is the preferred solution.

Barring that, inflating the currency is the second best option. Inflation hurts the middle class badly, but it's only a minor annoyance to the wealthy, who have the ability to shelter their wealth in tangible assets while benefitting from increased exports of their products, since the devalued currency makes American goods cheaper for the rest of the world. Inflation does tend to cause political instability, but it's not as pronounced as taxes and austerity since it can be hard to measure and it may actually benefit younger workers with no assets.

Raising taxes and instituting austerity is the measure of last resort because it's highly visible, cross cutting and it can lead to a negative spiral by repressing growth. Taxes and austerity tend to precede major political instability, so self-interested politicians reach for them only when inflating away debt has already failed, and they need to put the brakes on runaway inflation. Austerity works well for that, but the cost is often so severe that you should think of it like amputating a limb to prevent the spread of infection - it could save your life, but you might still bleed out afterwards, and even if you survive you'll be crippled.

Let's examine each of these scenarios to understand how viable they are.

### Growing the Pie

You've probably heard at this point that the US is in a technical recession when AI and AI related capital expenditures are exlucded. I wrote an article about how that was going to warp our economy that's still very relevant, it's worth reading it to understand the geopolitics driving the situation and the psychology of the major players influencing policy. The important detail is that the major leaders of capital and the current administration both view AI dominance as existential from a geopolitical and economic perspective. This isn't hyperbolic, major growth (~6% GPD/year) is the only hope we have of averting the coming fiscal crisis without a lot of collatoral damage, and AI is the only thing on the table at the moment that even hints at being able to achieve that. The broligarchs are hyping AI to no end because the capitalist monopoly board that they're winning is going to get flipped if it fails.

While AI is very impressive, the trillion dollar question is whether it can actually grow the economy sufficiently to avert the fiscal cliff. There are a lot of variables to consider in answering this question, but when you plug in the numbers and turn the crank, the answer is... No, not under reasonable assumptions given our current capitalist system.

This is a scary thought, and since I expect it will be difficult for many of you to accept, I've embedded a simple model of the AI rescue so you can test your preferred assumptions to see if they fare better. I should note that AI fails to rescue the economy in basically all scenarios except in the most bullish GDP growth case, and even there, high interest rates and low capture of the world AI market represent major risks.

It's important to note that the environment in which this AI growth rescue takes place is important. Historically, the CBO-centered scenario is a good choice, however in this case their analysis bakes in the idea that we are in a short, transitory period of instability, and it only holds if there is a return to something resembling the pre-pandemic regime of economic stability. The argument could be made that they're also underestimating the lift we'll get from AI, but I think the scenario where things remain bad for longer than they anticipate is the most likely.

Absent some rescue, the rate stress scenario means we're we're headed for a brutal period of stagflation possibly lasting a decade or more. As a result, there will be enormous political pressure to do something big, and politicians will start to consider things that would have previously been unthinkable.

The problem is that the only scenario presented where AI rescues our economy given historical rates of federal revenue capture involve highly optimistic federal budget projections paired with unrealistically low interest rates and historically rare operating margins. Even with this hyper-optimistic scenario, AI only puts us in the green by ~140 billion/year in 2030, and there are some major problems with that scenario:

* Given the large scale realignments, the chance interest rates go back to historical levels is near zero.
* Political gridlock has gotten worse over time, so optimistic budget predictions are a fantasy.
* It is unlikely the world will trust the US enough to let them capture 35% of the global AI market given our recent trend of bullying allies, and this will be intensified if we institute AI protectionism.

In my opinion, the best likely scenario is some degree of budget course correction, paired with great but not magical AI GDP improvements (on the order of ~$10T/year by 2030). With ~20% of global AI capture, American AI protectionism, historically-based federal corporate revenue capture of ~19%, and reasonably good profit margins, this still leaves us up to $600 billion in the red. This is where the thesis of this article comes in: if you raise the government capture of AI profits to around forty percent, the AI fiscal rescue story starts to look viable even with reasonable assumptions, and government capture around sixty percent enables a rescue even with less than ideal assumptions. I feel particularly comfortable saying this is going to happen because it's the only knob that we can really control, and the non-growth mechanisms for rescuing the economy are politically more painful than deviating from capitalism in this case.

<figure class="interactive-ai-capture-chart" style="margin: 2rem 0;">
  <div class="fiscal-chart-panel" data-ai-capture-model>
    <div class="fiscal-chart-controls" aria-label="AI revenue capture controls">
      <div class="scenario-buttons" role="group" aria-label="AI growth scenario">
        <button type="button" class="scenario-button" data-ai-scenario="pessimistic">Pessimistic</button>
        <button type="button" class="scenario-button is-active" data-ai-scenario="conservative">Conservative</button>
        <button type="button" class="scenario-button" data-ai-scenario="optimistic">Optimistic</button>
      </div>
      <div class="fiscal-eli5" data-ai-eli5>
        <strong>Plain-English assumption</strong>
        <span>This model asks: if the global AI boom is worth a certain amount each year, how much of that value could become U.S. corporate profit, and how much of that profit could become public revenue? The scenario buttons set the global AI value assumption; the sliders show the machinery underneath.</span>
      </div>
      <div class="fiscal-input-grid">
        <label>
          Global AI GDP boost
          <span class="prior-help" tabindex="0" aria-label="Global AI GDP boost explanation">?</span>
          <span class="prior-tooltip">The annual global economic value attributed to AI. Pessimistic maps Acemoglu's modest 10-year GDP effect to today's world economy, conservative uses IDC's 2030 AI impact estimate, and optimistic maps Goldman's 7% global GDP lift to a 2030-scale world economy. The upper slider range reaches PwC's newer 2035 upside case.</span>
          <input type="range" min="1.0" max="22.3" step="0.1" value="4.9" data-ai-control="globalAiValue">
          <output data-ai-output="globalAiValue">$4.9T</output>
        </label>
        <label>
          Global AI capture
          <span class="prior-help" tabindex="0" aria-label="Global AI capture explanation">?</span>
          <span class="prior-tooltip">The share of non-U.S. AI demand captured by U.S. firms. Higher values mean U.S. labs/platforms win more foreign customers despite Chinese and open-source competition.</span>
          <input type="range" min="0" max="100" step="1" value="20" data-ai-control="globalCapture">
          <output data-ai-output="globalCapture">20%</output>
        </label>
        <label class="checkbox-label">
          AI protectionism
          <span class="prior-help" tabindex="0" aria-label="AI protectionism explanation">?</span>
          <span class="prior-tooltip">When checked, the model assumes U.S. law or procurement pressure makes 100% of U.S. domestic AI demand use U.S. AI. When unchecked, domestic capture equals the global capture rate.</span>
          <input type="checkbox" checked data-ai-control="protectionism">
          <output data-ai-output="protectionism">on</output>
        </label>
        <label>
          Corporate profit margin
          <span class="prior-help" tabindex="0" aria-label="AI margin explanation">?</span>
          <span class="prior-tooltip">How much of captured AI revenue/value becomes corporate profit after compute, energy, labor, capex, and operating costs. Presets use comparable big-tech operating margins: Alphabet-like 32%, AWS-like 35%, and Microsoft-like 46%.</span>
          <input type="range" min="5" max="60" step="1" value="35" data-ai-control="margin">
          <output data-ai-output="margin">35%</output>
        </label>
        <label>
          Government capture of profits
          <span class="prior-help" tabindex="0" aria-label="Government capture explanation">?</span>
          <span class="prior-tooltip">The share of AI corporate profits captured by the public sector through taxes, sovereign wealth stakes, compute royalties, excess-profit taxes, or other policy mechanisms. Scenario presets keep this at a shared 19% historical-effective U.S. corporate profit capture default.</span>
          <input type="range" min="0" max="80" step="1" value="19" data-ai-control="govCapture">
          <output data-ai-output="govCapture">19%</output>
        </label>
      </div>
      <div class="fiscal-fit-summary" data-ai-summary aria-label="AI capture model summary"></div>
    </div>
    <div id="ai-capture-revenue-chart" class="plotly-chart" aria-label="Interactive horizontal bar chart of potential public revenue and AI spend per capita and worker"></div>
  </div>
  <figcaption style="text-align: center; font-size: 0.9rem; color: var(--color-gray-60, #666); margin-top: 0.5rem;">AI scenario presets use a defensible current spread: Acemoglu's <a href="https://www.nber.org/papers/w32487">modest 10-year macro estimate</a> for the pessimistic case, IDC's roughly <a href="https://www.idc.com/wp-content/uploads/2025/09/DIR2025_GS_AIPivot_MW.pdf">3.7% of global GDP in 2030</a> estimate for the conservative case, and Goldman's <a href="https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent.html">7% global GDP lift over a decade</a> for the optimistic case. PwC's newer <a href="https://www.pwc.com/my/en/media/press-releases/2025/20250429-ai-adoption-could-boost-global-GDP.html">15 percentage-point 2035 upside case</a> is left as slider headroom rather than a default preset. Profit-margin presets are anchored to comparable reported operating margins: <a href="https://s206.q4cdn.com/479360582/files/doc_news/2026/Feb/04/attachments/2025q4-alphabet-earnings-release.pdf">Alphabet 31.6%</a>, <a href="https://s2.q4cdn.com/299287126/files/doc_earnings/2025/q4/earnings-result/AMZN-Q4-2025-Earnings-Release.pdf">AWS 35.4%</a>, and <a href="https://www.microsoft.com/investor/reports/ar25/index.html">Microsoft 45.6%</a>. Per-capita and per-worker bars divide modeled U.S.-captured AI value by roughly 343M residents and 170M labor-force participants. Government capture defaults to 19% across scenarios as a rough historical-effective U.S. corporate profit capture baseline. The rescue line is the extra annual revenue needed around 2036 so debt grows no faster than federal revenue in the fiscal model above, so it moves when the prior interest-rate, revenue-growth, or primary-deficit assumptions change.</figcaption>
</figure>

<!-- AI GDP ESTIMATE SOURCE NOTES:
  The interactive AI capture model treats "Global AI GDP boost" as an annual GDP-equivalent flow, because the fiscal question is how much annual taxable economic value can plausibly exist in a given scenario.

  Current scenario anchors:
  - Pessimistic default, $1.5T/year: derived from Daron Acemoglu's NBER working paper "The Simple Macroeconomics of AI" (2024), which estimates much smaller 10-year macro effects than the most bullish consulting cases. Source: https://www.nber.org/papers/w32487
  - Conservative default, $4.9T/year: IDC's public 2024/2025 framing includes roughly $19.9T cumulative AI impact through 2030 and an annual 2030 impact around $4.9T; IDC's 2025 AI Pivot deck also frames AI as 3.7% of global GDP in 2030. Sources: https://www.axios.com/2024/09/17/ai-global-economy-idc-2030 and https://www.idc.com/wp-content/uploads/2025/09/DIR2025_GS_AIPivot_MW.pdf
  - Optimistic default, $10.0T/year: Goldman Sachs' widely cited upside case says generative AI could raise global GDP by 7% over a 10-year period. Applying that to a 2030-scale world economy lands around a $10T annual GDP-equivalent lift. Source: https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent.html
  - Slider headroom, up to $22.3T/year: IDC's 2025 deck cites a $22.3T global AI impact in 2030, but this is a broad direct/indirect/induced "AI economy" impact figure, not necessarily clean incremental taxable GDP. Treat it as an extreme upside exploration bound, not the default scenario. Source: https://www.idc.com/wp-content/uploads/2025/09/DIR2025_GS_AIPivot_MW.pdf
  - Additional upside context: PwC's 2025 AI Jobs Barometer release says faster adoption could raise global GDP by up to 15 percentage points by 2035, but that is a longer-horizon upside case with adoption/productivity caveats, so it is not used as a default 2030 annual-flow preset. Source: https://www.pwc.com/my/en/media/press-releases/2025/20250429-ai-adoption-could-boost-global-GDP.html

  Interpretation guardrail:
  Do not treat "$20T by 2030" as "$20T/year of taxable incremental GDP" unless the source explicitly says annual incremental GDP. Many public estimates mix cumulative impact, gross output, direct/indirect/induced ecosystem impact, productivity lift, vendor revenue, and GDP level effects.
-->

Of course, growing our way out of the problem isn't the only solution and 60% government capture of AI revenue is a big ask. You can bet the lobbyists will swarm washington like a plague of locusts trying to prevent the public from keeping itself solvent in a non-destructive way. Fortunately for normal folks, AI is so broadly unpopular with people outside of engineering and management that I believe in combination with the political toxicity of inflation/austerity their lobbying efforts will be mostly futile.

In order to see why I think the state effectively breaking the capitalist model for one sector of the economy is the most viable solution, we have to examine the likely outcomes for inflation and austerity in more detail.

### Inflation / financial repression

Inflation can reduce the real value of existing nominal debt, especially when paired with financial repression that keeps nominal interest rates below inflation. The debt to GDP ratio was 106% immediately after World War II, and while the common story is that the US economy grew its way out of the situation, research by Acalin and Ball suggests that without inflation and financial repression, the debt to GDP ratio would have only fallen to 74%. Research by Reinhart and Sbrancia suggest that real interest rates (nominal rates - inflation) were negative for much of the post-war period of the last century.

The important thing to keep in mind is that inflation is not magic. It works only if the government can keep effective borrowing costs below nominal GDP growth. If bondholders demand higher yields, if entitlement COLAs rise, or if the Fed must tighten to preserve credibility, then inflation may increase nominal receipts while also increasing interest expense and spending. In the worst case, this can result in runaway inflation, which is a precursor to government collapse.

The inflation solution is really a financial-repression solution: the state needs inflation high enough to erode debt, while keeping nominal rates low enough that the debt stock does not reprice upward. That was possible after World War II because the financial system was more captive, capital controls were stronger, and regulated institutions could be induced to hold government debt. It is harder in a modern, globally mobile capital market.

It's questionable that such financial repression would succeed today. The US still occupies a privileged place in the world economy, but the process of realignment and de-dollarization is already underway.

The historical record is mixed. The optimistic example is the postwar United States: debt fell from 106% of GDP in 1946 to 23% in 1974, and <a href="https://www.aeaweb.org/articles?id=10.1257/mac.20230357">Acalin and Ball</a> estimate that without primary surpluses, surprise inflation, and the pre-1951 interest-rate peg, debt would have fallen only to 74%. <a href="https://www.hks.harvard.edu/publications/liquidation-government-debt">Reinhart and Sbrancia</a> also find that advanced economies had negative real rates about half the time from 1945-1980, producing large implicit savings for governments. But those cases worked because postwar financial systems were more captive. The ugly examples are what happens when markets stop cooperating: 1970s Britain combined high inflation, sterling pressure, and an <a href="https://www.nationalarchives.gov.uk/cabinetpapers/themes/imf-crisis.htm">IMF crisis</a>; Turkey's low-rate experiment produced a lira collapse and inflation above 80% before policy had to reverse. The lesson is that repression only works while the state can force someone to hold depreciating claims. Once that breaks, the result is inflation plus austerity, not inflation instead of austerity.

| Inflation path | Effective rate path | Result |
| ----- | ----- | ----- |
| **2% inflation, rates ~4%** | Normal CBO-like regime: inflation returns to target, Treasury rates stay in the low/mid-4s | No inflationary debt rescue. Debt burden depends mainly on primary deficits and real growth. |
| **3-4% inflation, rates stay ~4%** | Mild negative real-rate environment if effective debt costs lag inflation | Some debt erosion. Politically painful but potentially manageable if wages rise and inflation expectations remain anchored. |
| **3-4% inflation, rates rise to 5-6%** | Bondholders demand compensation; Treasury rollover costs rise | Little or no fiscal relief. Higher nominal receipts are offset by higher interest expense and indexed spending. |
| **4-6% inflation, rates rise to 6-8%** | Inflation expectations de-anchor; term premium rises | Bad outcome. Inflation raises cost of living while debt service accelerates. This is "inflation pain without debt relief." |
| **4-6% inflation, rates capped below inflation** | Financial repression: yield-curve control, captive bank demand, regulation, or forced Treasury absorption | Debt erosion possible, but requires coercive state intervention and risks capital flight, bank stress, and legitimacy problems. |
| **5%+ inflation, rates suppressed for years** | Strong financial repression; deeply negative real rates | Large real debt liquidation possible, similar in spirit to some post-WWII episodes, but much harder in modern mobile capital markets. |
| **Runaway inflation / monetary dominance** | Rates either explode or are politically suppressed while currency credibility breaks | Destroys real debt but also damages savings, contracts, investment, and political stability. This is not a controlled solution. |

Inflation can liquidate debt if the state can suppress real rates; otherwise it becomes a debt-service accelerant.

<!-- SOURCE NOTE: Reinhart and Sbrancia's "The Liquidation of Government Debt" is the core source for the financial repression mechanism. Acalin and Ball's "Did the U.S. Really Grow Out of Its World War II Debt?" is the source for the 106% -> 23% actual path and 74% counterfactual. The postwar analogy is limited by open capital accounts, independent central banks, money-market funds, foreign Treasury holders, and inflation-indexed entitlements. -->

### Taxes and austerity

Fiscal consolidation can stabilize debt if it raises the primary balance enough. Mechanically, if debt is around 100-120% of GDP and r - g is positive by 1-2 percentage points, the government needs a primary surplus around 1-2.4% of GDP just to stabilize debt, before accounting for shocks. That is a very large swing from CBO's projected primary deficits of roughly 2% of GDP. CBO projects deficits rising from 5.8% of GDP in 2026 to 6.7% in 2036, while net interest rises from 3.3% to 4.6% of GDP.

<!-- FACT CHECK: The debt-stabilization arithmetic is basically right, but include the formula: primary balance required ~= (r - g) * debt/GDP. Also distinguish primary deficit from total deficit; this paragraph currently mixes deficit and interest references in a way that can confuse readers. -->

Austerity is politically and economically nonlinear. IMF's 2026 Fiscal Monitor says global public debt is near **94% of GDP in 2025** and projected to reach **100% by 2029**, driven by major economies, rising interest burdens, and spending pressures from social needs, defense, and strategic autonomy. It also notes that fiscal consolidation is needed while public support is limited.

The tax/austerity lever is arithmetically straightforward but politically brutal. Stabilizing debt when interest costs are rising requires either materially higher revenue, materially lower spending, or both. But if consolidation suppresses growth, the denominator shrinks and the debt ratio can worsen despite painful cuts. The politics are also adverse: cuts to pensions, health care, defense, and transfers hit organized constituencies, while tax hikes create avoidance, capital-flight, and investment responses. In today's U.S. economy, 2% of GDP is roughly $600 billion per year, which is not a rounding error. It is a package on the scale of a major broad-based tax increase, a politically explosive entitlement deal, or deep cuts across defense, health care, transfers, and discretionary spending.

The failure case is Greece after 2010. The country did improve its primary balance, but the adjustment was so large and fast that output collapsed, unemployment reached depression levels, and the debt ratio rose anyway because GDP fell faster than debt. The <a href="https://www.piie.com/microsites/2022/greek-debt-crisis-no-easy-way-out">Peterson Institute</a> summarizes the outcome starkly: output fell about 25%, unemployment reached 27%, and debt rose from about 130% of GDP in 2009 to around 180% by the end of 2014. Argentina's 2001-2002 collapse is another warning about forced adjustment under a credibility crisis: the <a href="https://www.imf.org/external/np/ieo/2004/arg/eng/pdf/report.pdf">IMF's postmortem</a> describes output falling about 20% over three years, followed by default, banking distress, devaluation, and renewed inflation. These are not perfect analogies for a reserve-currency issuer like the United States, but they show the core risk: if fiscal tightening is imposed after confidence has already broken, the cure can shrink the economy, radicalize politics, and still fail to stabilize debt.

| Fiscal package | Debt impact | Economic risk | Political / stability risk |
| ----- | ----- | ----- | ----- |
| **Mild consolidation: ~1% of GDP** | Slows debt growth; unlikely to stabilize debt if r > g persists | Small drag on demand; manageable if economy is strong | Usually survivable; backlash depends on distribution |
| **Medium consolidation: ~2-3% of GDP** | Could stabilize debt under benign rates/growth | Material drag; recession risk if implemented into weakness | High conflict over taxes, entitlements, defense, and transfers |
| **Severe consolidation: ~4-6% of GDP** | Could force stabilization even under worse rates | High recession/depression risk; may reduce GDP enough to blunt debt gains | Serious legitimacy risk; protests, populist backlash, policy reversal |
| **Revenue-heavy package** | Works if tax base is broad and avoidance is limited | Can reduce investment, capital formation, or labor supply depending on design | Backlash from high earners, firms, asset owners; capital-flight risk |
| **Spending-heavy package** | Directly reduces deficits if cuts stick | Demand shock; transfer cuts can reduce consumption sharply | High risk if cuts hit pensions, health care, veterans, poor, or middle class |
| **Balanced package + growth investment** | Best chance of stabilizing debt without crushing demand | Lower near-term drag if investment raises productivity | Hardest to assemble politically; everyone pays something, benefits arrive later |

Large consolidations during weak growth are historically associated with recessionary pressure, institutional distrust, populist backlash, and social stress; the risk rises with size, speed, and perceived unfairness.

The political risk of austerity is not proportional to the deficit reduction alone; it depends on speed, distribution, timing, and legitimacy. A 2-3% of GDP consolidation during strong growth may be absorbed, while a similar package during recession or inflation can trigger backlash because households experience it as falling real income, lost services, and broken social promises.

<!-- SOURCE NOTE: For austerity failure examples, Greece is the cleanest developed-economy warning because the debt ratio worsened despite extreme consolidation once GDP collapsed. Argentina is a more severe credibility/crisis analogy, not a clean U.S. comparison. The U.S. scale translation assumes nominal GDP around $30T, so 1% of GDP is about $300B/year and 2% is about $600B/year. -->

## The Path Forward

As you can see, fiscal repression and austerity are risky tactics that aren't guaranteed to work. Inflation asks the middle class to absorb a hidden wealth tax and assumes bond markets will tolerate it. Austerity asks voters to accept visible losses in services, transfers, wages, or taxes, often exactly when they already feel poorer. Public capture of AI driven growth is not painless, but if the money is actually there, it targets a concentrated windfall instead of imposing a generalized squeeze. That is why I think it is safer and politically less toxic in the current populist environment. As a result, I believe an increase in government capture of AI revenue is going to be the primary driver of economic stabilization (if it occurs).

Another reason for this is the fact that AI companies are basically guaranteed a government windfall in the form of protectionist tariffs, or even a ban on use of non-American AI. This will be framed as a national security concern, but make no mistake, the true driver will be economic. People will recognize this windfall, and it will create political pressure to extract concessions from the AI companies that benefit, since non-American AI will be significantly cheaper (more on this in a minute).

Of course, given the way politicians try to serve capital while paying lip service to the populace, it's likely the actual solution that is implemented will be a mixture of methods. There is growing political momentum for an increased top line income tax rate paired with tax code reform to limit avoidance, and the administration is pushing financial deregulation which is intended to cause financial repression in tandem with money printing.

The big question in my mind is the way in which public capture of AI revenue is executed. Bernie Sanders and Donald Trump surprisingly have both come out in support of a sovereign wealth fund, where AI companies "donate" a portion of their shares to the public. Sam Altman has also floated something similar, so there's clearly momentum in this direction.

The problem with this approach is that the companies can effectively play shell games to manipulate ownership and profit in order to limit public capture. The Norway and UAE sovereign wealth funds work because they're driven by sales of a real, tangible asset. I don't think the model will prove as effective with stock, and even if it did work initially, market disruptions could throw a wrench in things quickly. In the worst case scenario, the sovereign wealth fund could become a dumping ground for corporate debt and toxic assets.

A better model in my opinion is to target data centers. These are the most broadly unpopular aspect of the AI buildout, being tangible they're the only part which can be completely controlled, and there's a long history of publicly run utilities so the model is familiar. Even better, data centers have massive power needs that must be planned and budgeted for simultaneously, and having everything on the books of a single entity with a single planning commission simplifies that process. The government also has access to cheaper credit (hence OpenAI's desire for a federal backstop) and eminent domain, so it can build them more cheaply and with fewer legal roadblocks than the private sector.

Public ownership of data centers diffuses much of the political tension, since people affected by their construction would be directly compensated. It won't fix the issues with power costs and water use, but an annual check will make it palatable for enough people that the anti-datacenter movement will lose momentum.

Another benefit of government ownership of data centers is that they're critical infrastructure that are subject to risk. In the event of geopolitical conflict, we want the military protecting sites, and we want a state level cybersecurity apparatus keeping them from being compromised. We also want federal disaster planning around broad, multi-site compute failures. The private sector is not incentivized to do any of this, and even if they form agreements with the government, the level of operational complexity is increased because the systems are silo'd and non-homogenous.

You might argue that the private sector is more efficient at construction, but the reality is that a public/private hybrid where the lowest cost contractor gets the job and is backed by the full force of the US government achieves the best of both worlds (assuming no corruption).

So, how would this work? After contracting out construction and maintenance to the lowest bidder, the government would provide short term capacity leases to companies like OpenAI and Anthropic, billing a per compute-hour rate determined by a market demand and required public capture. The government would effectively hold a compute monopoly, with the captured surplus going to the public.

Since compute is the enabler for everything else, there's no avoiding public capture. You can't play shell games, relocate your headquarters, use creative accounting or any of the other tricks big business regularly uses to fleece the government (and by extension, the people) of its share. If you provide AI in America, it's through publicly owned compute and the public gets a sizeable cut of the market value, or you're in violation of the law, with stiff fines and penalties.

There are other options such as special taxation of AI related revenue, but they don't solve the anti-datacenter movement issue, and they're vulnerable to gaming by elites in much the same way as a stock grant.

## The fly in the ointment: Chinese AI

China knows AI is the most likely hail mary play to save our economy, and to a degree it's a hail mary play for them as well, though for different reasons: they need AI and robotics to rescue them from a population bomb, and they need to diversify away from manufacturing due to weak domestic demand and geopolitical pushback on dumping of cheap goods. As a result, they have a strategic interest in competing with and undercutting American AI.

Despite starting from behind, China has a few major advantages that will eventually lead them to dominance in the AI race, even if they don't overtake US in overall capability. The reason for this is that most people don't need infinite intelligence for tasks, they just need a model that is smart enough for what they want to do. Even if Chinese AI stays 3-6 months behind the US frontier overall, once the Chinese labs have achieved "good enough" performance on a given task, the incentive to pay the higher price for American models disappears.

Over time the percentage of tasks where there is a "good enough" Chinese model will trend towards 100%. Once this happens, American consumer AI is cooked. Business AI usage of American AI may remain strong due to security and geopolitical concerns, but even there the incentive is to take open weight Chinese models, obfuscate their origin, then run them somewhere with cheap energy and lax regulations like the UAE or Saudi Arabia. Ultimatley, American frontier labs are structurally unable to compete with China on price for two reasons:

1. China has way more energy, and energy is ~50% of the cost of inference.
2. The Chinese government is willing to bend market rules to pick winners and create advantages in a way that the United States traditionally hasn't been: waived regulation, low cost capital, guaranteed customers, and industrial coordination.

Given this, 100% global capture becomes a fantasy, and even 20% global capture starts to look optimistic when you factor in global backlash against US bullying, unilateralism and participation in genocide. More and more, Europe, Africa, Asia and much of South/Central American view China as the adult in the room, and if they can't afford to provide sovereign AI directly, China becomes the natural fallback.

The combination of national security threat and need to protect the US economy basically guarantees some form of ban on the use of non-American AI in the US. However, even capturing 100% of the AI market in the US is insufficient as previously demonstrated, and in order to capture that critical ~20% of global demand in the face of higher prices and a poor reputation, we'll need a significant lead in capabilities to entice people to pay the American premium. Given China has been closing the gap quickly, this seems unrealistic.

One issue is that in order to protect America's ability to sell a premium product that captures that global 20%, we need to be able to protect America's lead in AI. This is particularly challenging, because it's much easier to distill AI behavior than it is to reverse engineer parts or materials like you would for a traditional product. This is already happening; there is evidence that much of the progress of Chinese models is the result of distilling/training on the outputs of U.S. frontier AI.

As U.S. frontier labs start to push models into diminishing returns and refine harnesses to continue pushing model performance, distillation and harness reverse engineering are going to become increasingly economically damaging for them. This is going to push American frontier labs away from providing tools or agents directly for end users, to having the agents become a service that is called out to, like a virtual consultant, where you don't see the intermediate results or have the ability to steer the model in realtime, but rather where you hand the task off and get a finished or partially finished product back, in order to protect their IP from distillation/reverse engineering.

This isn't hypothetical: multiple labs already obfuscate thinking traces. As models advance, patterns of behavior will become as proprietary as lines of reasoning. From the perspective of the model owners, letting users see the intermediate steps of an agent is exposing billions of dollars in secret sauce. Model labs claim that obfuscating reasoning traces is also a UX improvement, but feedback on social media for this behavior is almost universally negative, so I don't buy that.

As a result, U.S. frontier labs are incentivized to become like virtual consulting firms where you hire AI employees, rather than tool providers. Rather than having employees with agents, you'll have a smaller number of employees and a number of "AI temps" hired from Anthropic. The U.S. frontier labs will be pushing all-inclusive, end-to-end workers you don't have to manage in theory, while the Chinese will be pushing human employees plus slightly less smart agents that the employees directly pilot.

American AI companies have talked about AI as a tool to empower, and lauded the idea of a one person company with a billion dollar valuation, but if this one human company has a thousand AI "employees" from Anthropic, the majority of the economic value there is likely to be captured by Anthropic, not by the entrepreneur. This will drive down wages, weaken demand and force the government to socialize rents to keep fiscal capacity in check. As a result, even if we weren't facing a fiscal cliff, we would still need to find a new way to socialize the revenue from AI in the face of global capital to maintain political stability.

## Wrapping Up

Regardless of your belief about the particular details of how AI will perform and whether it'll make human labor obsolete, the fiscal situation and the public sentiment against AI is undeniable. Whether AI will end capitalism (in the strict sense) comes down to whether politicians can sell their constituents on the idea that they should bear the brunt of the coming economic hardship (which will fall squarely on the middle class under fiscal repression) while AI companies dodge taxes and the super wealthy enjoy 1-15% effective tax rates. Spoiler alert, the pitchforks are already coming out, and things are going to get a lot worse, so I'd put the odds of that at near 0.

To be clear, the end of "capitalism" in this case should not be overblown, in reality it'll just look like a shift more towards a Chinese style socialist market economy. The country will still be broadly market based, the government will just have a larger say in capital expenditures and more leverage for revenue capture due to state ownership of certain industries. The current administration has shown admiration for China's ability to focus their people on long term goals and get things done, so we're already primed to move in this direction.

It is possible AI also ends capitalism in the larger sense, as the majority of people are unable to find gainful employment in the face of extremely cheap superintelligence, but this scenario is not required for AI to radically alter the fabric of our economic system.
