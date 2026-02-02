---
title: "Pi is the Linux of Agent Harnesses"
description: "Pi's hackability, ergonomics and culture will make it the standard for open source coding agents"
date: 2026-02-02
published: true
tags:
  - articles
  - agents
  - software-engineering
  - opinion
layout: article.njk
image: "/img/optimized/article-pi.webp"
---

If you've been following the Clawdbot/Moltbot/Openclaw/LOLCLAW hype circus with a mixture of amusement and annoyance like I have, you might have missed the really special thing about this little psychedelic-induced social/computational experiment: Pi, the humble harness that powers it. I believe OpenClaw will be relegated to internet meme status before too long, but Pi is going to take on a life of its own in a way that's very analogous to Linux.

Why do I feel this way? The technical answer is that it's a good base for hacking on and the abstractions feel clean. To be honest though, mostly it's because of vibes (have I earned the right to call it wisdom at this point in my life?). I've been fighting tooth and nail with agent harnesses for the last year, but Pi presented me with a playground of possibility. Tinkering with Pi gave me a feeling I've not felt in a long time - a feeling that I've learned to trust throughout my career.

I still remember the feeling I got the first time I installed Linux. I'd installed Slackware 96 from a pile of floppy disks on a Pentium 166 after reading John Carmack mention it in his plan. There were some exploits capable of hard locking DOS based operating systems causing havoc on IRC, and servers still hadn't cracked down universally on IP spoofing, so a hardened system, dev tools and the ability to hand craft packets were all alluring to an aspiring cyberpunk. The fact that the hot IRC client was called BitchX and it had real hacker vibes (the windows client of the day, mIRC, felt a bit clownish), and you could rice out your desktop with Enlightenment in a way that even mac users were envious of were icing on the cake.

Linux was a lot of work, but the sense of freedom and total possibility were like a drug. All the cards were on the table, and I was free to change (and fuck up) my system in any way I wanted using the same tools as the people who originally wrote it. Coming from Windows 95, it was like being transported into Oz. Suddenly, everything was in color (including my terminal!). Daemons were singing and dancing. The old rules were out the windows.

Pi gives me vibes. Obviously, everyone has vibes so you're probably wondering why you should trust mine. Let me lay out the other cases in my career I've gotten them so I can establish a track record:

* Postgres. I've been a booster since version 7. The combination of clarity of implementation, the community and modular feature set with an emphasis on integration was a clear winner, even though MySQL had a performance, scaling and hype edge at the time.
* React. I first evaluated this at version 0.7, and I instantly knew JSX would capture hearts and minds. The rest of it had issues, but Angular was a hot mess and anything that could enable the huge pent up demand to create maintainable SPAs was going to blow up.
* Python. In the mid 2000s while most of the scientific community was still on Perl and Matlab, I'd discovered that the growing robustness of Python's ecosystem of scientific and computational tools let me use a single toolkit for all my work, and the code had a literate quality that made it easy to explain to less-technical scientists.
* Notebooks. I used the initial release of the iPython notebook, which later became Jupyter. I knew instantly that it would transform how scientists program, and started educating scientists on how to use it at the university where I worked at the time.

The common thread here is extensible, modular systems with clean abstractions and good community culture. That describes Pi perfectly.

I first heard about Pi from Armin Ronacher's YouTube channel, and since I'd been running into a lot of Claude Code bugs during all my tool eval benchmarks, I decided to give it a spin. If you're not familiar with Armin, he's an accomplished open source maintainer and the ergonomics of the developer tools he produces are consistently top notch, so when he likes a tool, it's a strong signal. He was also way ahead of the curve on the weaknesses of MCP and the power of CLIs which is a lesson a lot in the AI community still haven't fully learned (if you're still using MCPs, come over to the dark side, it's way better!), so I'd say his track record is among the best in the AI tool infosphere at this point. 

Long story short, I ported my benchmark runner to Pi and everything just worked. I was "hooked."

When I dug into the details of Pi, I realized that a lot of projects I'd put on the backburner due to the ergonomics of integrating them with existing agents were now easy. Stuff that was brittle and hacky with Claude Code, Codex or even OpenCode became clear and robust. The vibes were strong at this point.

When I learned that Pi was the harness behind LOLCLAW, it was a done deal. The hype train behind LOLCLAW combined with the clean ergonomics of Pi is an unstoppable juggernaut. Pi is going to eat other agent harnesses like Linux ate other unixes. There's very little reason to rebuild the fundamentals provided by Pi in a new project, and being able to leverage the Pi ecosystem will cause everything to standardize on whatever it does, until we have different Pi "implementations" like we have different Python interpreters.

Of course, this depends a great deal on how well shepherded Pi is. One good sign is that like Linus, Mario Zercher (the creator of Pi) doesn't seem to be afraid to say no, and it's small enough that forks and "dialects" could emerge and all coexist peacefully. Overall, I'm hopeful that Pi will drive a standardized open agent ecosystem that keeps freedom and power in the hands of the users.



