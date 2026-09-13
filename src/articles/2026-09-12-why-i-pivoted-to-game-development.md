---
title: "Why I pivoted to game development"
date: 2026-09-12
published: true
tags:
  - articles
  - ai
  - game development
  - hexborne
image: /img/hexborne/temperate-tactical.webp
cardImage: /img/hexborne/temperate-tactical.webp
layout: article.njk
stylesheets:
  - /styles/components/mailing-list.css
  - /styles/components/game-gallery.css
---

For those familiar with me, you know that I've been very "AI pilled" for a while now, and my efforts were focused on autonomous software engineering. So how did I end up hard pivoting into games? The short answer is passion, but I think that's reductive, so I'd like to invite you on a journey through my game dev origin story.

## Setting the Scene

My "Aha!" moment with AI coding was with Aider with Gemini Pro 2.5 preview 1 (affectionately titled 0325 by those who know). I'd tried Cursor and Cline with Claude 3 and GPT-4, and while they seemed cute in a "robo battler" kind of way, what I saw was no way it was usable for real work by serious engineers. Gemini's (at the time) unique combination of reasoning and fairly usable 1M token context made it functional when operating over large chunks of codebase, and Aider's ability to run tests, linting and other automated checks on each turn and feed failures back to the model while capturing modifications in granular commits demonstrated that the automation of my trade was imminent. It wasn't there yet, the code was far messier and more verbose than I'd have liked, and the model needed to be hand-held a fair amount, but those were surmountable problems.

That experience led me to believe that it'd be possible to get to 99.999% automation of software engineering within 3 years. I'd say we're a bit over 90% now from an optimistic 30-40% possible at the time, so we're a little behind if you discount the exponential capex, but I think there's a good chance we'll hit it. You also have to factor in the difference between "what's possible" and "what people are comfortable with."

Because the models were/are spikey and human understanding is the ultimate bottleneck, I built tools to try and provide structure around capabilities gaps while also facilitating human understanding and verification. A lot of other people had similar ideas, and while I enjoyed the Cambrian explosion of ideas, it created audience fatigue and generally made people wary of projects in the AI space. This wariness combined with the influencer driven AI hype culture resulted in an extremely social-proof fed, fad-driven product adoption environment. The culmination of this is things like OpenClaw, Gastown, Hermes, etc.

At the same time this faddish behavior was taking over, the labs were starting to aggressively push agentic behavior and tool use. Areas like RAG were being turned upside-down; people spent tons of time engineering curated data packets for models, and agents with grep and access to an elastic API were trouncing it. The interesting thing I found is that even when you provided agents with tools that provided more relevant results than common search tools, it often had minimal effect or even degraded performance. When I dove into the evals, this turned out to be caused by agents having a facility with common tools like grep that didn't carry over to custom tools. They would use it to explore in stupid ways, deviate from explicit instructions and misuse documented parameters regularly, even with hook reinforcement. Optimized prompts and a theoretically superior tool were outperformed by a simpler approach because it didn't fight the current. The whole thing felt very Taoist.

The take home lesson was clear: current capabilities gaps were no indication of long term capabilities limitations, and as a result AI developer tools are unstable ground. At this point I was pretty burned out on the prospect of dealing with both a shifting target and a slightly unhinged market, and overwhelmed with the amount of hype, hate and delusion going around on all sides. I needed something that felt fulfilling to create on its own merits, while maximizing the asymmetric benefits of AI. At the same time, there were a lot of complications with my son's health that limited my free time. To be honest, it left me feeling a little hopeless, and as I often do, I turned to games as an escape.

## A Lifetime of Passion

As a kid I'd wanted to develop games, in fact it was the reason I learned to program in the first place. As a teenager, I looked at John Carmack the way my peers looked at Michael Jordan. I didn't have the patience to build anything large by myself, but I obsessed over clever algorithms and data structures. Ultimately when I learned about the conditions at most game studios, I wrote off the idea of working professionally in game development.

Throughout my career I often recreated classic games as a way to learn new languages or frameworks. Because of my time spent following John Carmack, I thought engine-level programming was what serious people did, and since I wasn't planning on working in game dev, I avoided using a pre-existing engine on the assumption that experience with the low level primitives would be more valuable and transferable. I wasn't blind to the effects of engines becoming widely available; as an avid gamer, it was clear that Unity had triggered an indie game dev renaissance.

In parallel with this, I've been an avid Magic: The Gathering fan since its release in 1993. I've owned two different Black Lotuses, and I sold my cards (including the power 9, a full playset of beta dual lands and 4 Juzam Djinns) to buy my first computer because my family was too poor to buy one for me. This is relevant because designing some sort of card game that solves magic's major faults has been a topic of thought since soon after I started playing. As such, I'd built up a design document with some (at the time) radical ideas. I'd considered making the game in paper or digitally, but always had higher priorities. I continued to curate and revise this document until the birth of my son; I know some dads that can juggle a job, a family and a serious project, but my son was born with cerebral palsy and hydrocephalus, and later diagnosed with severe autism, so my situation is different. There was no way I was going to be able to finish anything on that scale in my spare time, and putting further energy into it was a waste.

That was, until recently.

## New Possibilities Emerge

Being a burned out solo founder, I didn't have a day job to deal with, and I needed a major rest from building developer tooling. That left just my son's needs and my unfamiliarity with game development as challenges to overcome, which felt surmountable. I'd never built with a preexisting engine, done any 3d modelling/animation or even remotely considered indie game development as a realistic option to bet my family's livelihood on, but with the change in the software development landscape and the evolution of agents, I started to see that making games might actually be a fantastic option.

The engine inexperience turned out to be a non-issue. GPT 5.5 is quite facile with Godot, and newer models (particularly Astra) are amazing at driving your game with screen capture and a profiler running for hours to identify hotspots, allocation/collection issues and rendering anomalies. I can and probably will do a whole series of articles on how to close the loop like this with agents, but for now I think it's enough that you know that it's possible and works well.

The asset intensiveness of game dev also turned out to be much less of an issue than anticipated. It should be obvious how good generative image models are for textures, and people have been making a lot of noise about Astra's ability to drive Blender, but the bigger shift already hit earlier, with Trellis2 on generated images. Trellis2 by itself often produces rough surfaces and patchy models, however agents are capable of evaluating the outputs and algorithmically cleaning them up, or adjusting the input images to clarify details that aren't converting well. Astra is also quite good at "caulking" seams with Blender. The models often don't animate fantastically, but for static game assets they're quite usable.

Beyond models and textures, Agents can do audio as well! Direct audio models (such as Stable Audio) aren't amazing, but I found that if I had the agents prompt a scene in Minimax H3, it could extract and trim the relevant audio, and it often sounds pretty good! Agents can augment this with searches for relevant assets in the various engine asset stores and free sites like Pixabay, then create an in-game test panels where you can switch the effect on the fly and pick the best sound effect with full context.

The remaining area where AI fails badly is animation; they can drive Komodo or Rokoko to get animations, but the results tend to be pretty far off the mark, and they don't seem good at iteratively refining them to a workable state. This may change with the next generation of models, but for now good animators are still valuable.

Beyond the technical reasons why making games became viable, I think games are more resilient to the effects of AI than business and productivity software. Agents will eventually render most user facing software obsolete, but if anything games are going to become more important in society as AI progresses, for a few reasons:

1. Ideally most people will have more free time that needs to be filled
2. AI can use games as simplified environments to build skills that transfer to the real world (just like humans!)

Finally, with AI agents running all these automated pipelines and writing code, I could see my game ideas come to life at a speed that actually kept me engaged, and made me feel like I could reasonably tackle something large without losing motivation.

So with that, I dusted off my document with years of notes and began building. I started with a simple 2d proof of concept to validate my ideas, and after things started to stabilize I started to bring the world into 3d and make it beautiful. Some of my ideas didn't survive contact with reality, but I think enough did that I'll be able to progress the state of the art in Magic-style dueling card games in a meaningful way while providing a compelling roguelike deckbuilder single player experience.

## So what exactly am I building, and what makes it unique?

The game is called Hexborne, and the core gameplay is best described as a deck-based tactical brawler with tower defense and city builder elements. You draw a hand of units and structures via two separate decks, then deploy them to create a base from which to stage your offense and defense. Unlike many modern card games such as Sorcery which use a game board but have very simplified combat, Hexborne gives everything a full tactical treatment, like a scaled down version of Final Fantasy: Tactics or X-Com combined with Slay the Spire and Magic. DoTA and Starcraft influences are also present. Critically, Hexborne also uses an alternating activation system (like Chess) rather than the probablematic "I go, you go" system of Magic and most other card games. This mitigates some major flaws like first turn kills and a lot of the first player advantage (in fact, in tactics games, going first lowers your win rate very slightly).

In addition to refining the idea of a tactical card game, Hexborne includes an innovative system for encouraging "good" variance, the type that leads to more diverse games while still letting players feel like they have agency. Variance is critical in game replayability, but when you miss a shot in X-Com that you had a 99% chance on, or you get mana flooded/screwed or sit across from a hard counter deck in Magic, it feels bad. I achieve this by having players draw cards from decks, then letting those players customize those cards at play time with face-down drafted modifiers. This creates a complex hidden information game where you have to take your knowledge of the board state and your opponent's tells to infer their underlying strategy.

That might be a little tricky to understand, so let me explain in very crude terms: imagine a game of chess where you took turns placing pieces on the board (or moving existing pieces), and each piece had a paper-rock-scissors choice hidden face down under it that affected how the piece could move or what happened when you tried to take it once revealed. It goes beyond simple paper-rock-scissors though, because you're drafting a small hand of unique modifiers that can interact. For example, you might augment a knight to move an extra square in either horizontal, or modify a pawn so it loses the ability to capture other pieces, but it acts like a landmine when another unit tries to capture it; an opponent who wasn't aware of and playing around these possibilities could mistakenly lose a queen making "chess correct" plays.

Beyond this, I've tried to capture Magic's powerful card interaction mechanics while simplifying timing rules significantly. I've always loved how expressive Magic is (it's Turing complete!), but felt that instant speed interaction (and the need for it) is a large source of both confusion and frustration with players. The system I settled on is two-tiered, with cards that follow "normal" game priority rules (i.e. sorceries), and reactive/triggered cards (i.e. conditional instants). This is still Turing complete and capable of producing infinite combos, but conditional triggers reduce the amount of stuff that can form a stack, and the reaction rules make the order more explicit.

{% include "components/hexborne-gallery.njk" %}

## How long have I been working on this, and how far along am I?

If you count the age of the design document in my Google drive, 11 years. My first code commit was on June 6th of this year, and a month of that was mostly taken up by separate client work, so a little over 3 months in terms of actual implementation time.

I have the game rules in place and functional with ~100 cards designed and tested, 60+ fps 3d environments including multiple biomes, a fleshed out UI, decent AI, multiplayer and a deck editor!

There is still a lot of work to do on card design and refinement, the single player campaign mode hasn't been started (but I have lots of ideas, think Slay the Spire + Civilization with an unfolding story like Hades), many models are still placeholders and VFX  need some love. I'll also need to replace the generated card art with human drawn pieces so as not to get review bombed and cancelled on social media by the more zealous gamers waiting in the wings (not that the generated art is good, but unlike the models/animations, it's "good enough").

I could do most of this with a shoestring budget. Hiring someone to work over pre-cleaned Trellis2 baselines is surprisingly affordable, and with bones and rigging in place you can re-use animations (even just parts of them) so the total amount of work that needs to be done is modest. Likewise, there are a lot of prefab VFX packs available for cheap and Astra is decent at building them when you have it loop you in for art direction.

The killer is card art. Card games are notoriously art-intensive, and I can't afford to burn my runway commissioning art for a game with potentially hundreds of cards without some risk mitigation. I'd also like to retain an experienced art director part time to help me take the aesthetic experience to the next level; I think it's possible to get the visuals to DOTA2/LOL/Civ5 parity without spending an unreasonable amount of money. This means that I need to either secure a publisher or crowdfund the game to complete it as envisioned. Given that, I'm preparing a demo, both for publishers and as a "public" alpha so that potential crowdfunders know that I'll deliver. 

If you love games like Magic, Slay the Spire, X-Com, DOTA, Starcraft, Heroes of Might and Magic and Civilization, and you'd like to help support an indie developer building something with passion, please sign up for the mailing list below. I hate spam (part of why I'm so bad at marketing!) so I promise I'll only use your info to notify you about things like the public alpha, a crowdfunding campaign or major milestones on steam.

{% include "components/hexborne-mailing-list.njk" %}
