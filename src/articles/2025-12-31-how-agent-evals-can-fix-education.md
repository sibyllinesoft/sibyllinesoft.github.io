---
title: "How Model Evals Can Fix Education"
description: "AI broke traditional assessment. The techniques used to build AI can fix it."
date: 2025-12-31
published: true
tags:
  - articles
  - ai
  - society
layout: article.njk
image: "/img/optimized/article-agent-evals-education.webp"
cardImage: "/img/optimized/article-agent-evals-education.webp"
---

<div class="tldr-banner">
  <strong>tl;dr:</strong>
  <p>In order to succeed, students need to learn how to bring value as co-creators with AI. Instead of fighting students, give them freedom and challenge them to do something exceptional. Instead of scoring them, rank them; if everyone has AI, the students who come out on top will be the ones that bring the most value beyond AI. Techniques from competitive gaming and statistics make this tractable.</p>
</div>

AI broke assessment. A B+ essay is now trivial, and things are only going to get worse. The responses so far have been AI detectors that don't work, regression to pencil and paper that don't transfer to the workplace and wishful thinking in the form of pledges and honor codes. None of this is going to hold.

We're not going back to a world without AI. The question is whether grading adapts or becomes theater.

"Did they cheat?" is unanswerable and increasingly irrelevant. "Who did the best work?" is answerable. If every student has access to the same tools, the differentiator is what they add on top: selection, synthesis, judgment, taste. That's worth measuring. That's what their future employers will care about.

## The evaluation problem

When AI can produce competent work on demand, how do you gauge a student's grasp of the material? It might surprise you to learn that AI labs deal with a version of this problem when training their models. They need to be able to measure the performance impact of their changes on the model, just like teachers need to measure the impact of their tutelage on students.

One thing teachers and AI labs can agree on is that grading is a hassle. Scoring systems are hard to come up with and time consuming to apply, and they tend to be inaccurate without manual adjustment on a case by case basis. To get around this problem, AI labs use human preference as a proxy for quality. 

A good example of this is Chatbot Arena. Chatbot Arena ranks language models using pairwise votes aggregated via Bradley-Terry models, the same statistical framework used in chess rankings. When traditional benchmarks saturate, pairwise comparison still differentiates. Pairwise evaluation produces more stable rankings than pointwise scoring, especially for subjective stuff like "which essay argues its point better."

Given the built-in vibes based component in standard grading, pairwise comparison has another huge advantage: rigorous scoring. Humans are great at saying which of two B papers is better, but really bad at saying why one paper should get an 87 and another should get an 84. Pairwise comparison gives you an objective score for an answer based on its win/loss history against other answers that's mathematically grounded and defensible.

General principle for anyone building AI systems: when you can't define an objective metric, you can still measure relative quality. This works for model selection, prompt tuning, fine-tuning evaluation, anywhere ground truth is fuzzy or expensive.

## You don't need n² comparisons

Teachers will immediately ask: "I have 150 students. You want me to compare 22,500 pairs?" No. You can use algorithms to reduce that by an order of mangitude, and you can have AI help by creating seed rankings. Your task becomes going through student assignments in seed ranking order, correcting misrankings and providing helpful feedback rather than applying a rubric to assign a grade. You solve the AI "cheating" problem, your total work goes down and your grading ironically gets more rigorous.

The gaming industry solved this decades ago. Swiss-style tournaments pair competitors with similar records each round. Winners play winners, losers play losers. After log₂(n) rounds, you have strong signal on relative ordering without every pair having met. Bayesian rating systems like TrueSkill (Microsoft built this for Xbox Live) go further: they maintain a probability distribution over each player's skill, updating after each match, converging to stable rankings in 3-10 matches per player.

For 150 students, that's roughly 1,000-1,500 pairwise comparisons instead of 22,500. An LLM can process these in minutes for a few dollars.

You can also run additional "disambiguation" rounds only where uncertainty is high. If the model is confident students 1-10 are clearly above students 50-60, leave it. But if students 23-27 are tightly clustered with overlapping confidence intervals, run targeted comparisons. Compute goes where it's needed.

## From rankings to grades

A ranking isn't a grade. Teachers need letter grades or percentages. Two options:

*Percentile mapping*: ranked 15th out of 100 means 85th percentile, map to whatever grade your institution requires. Transparent, defensible, purely relative.

*Projection to scores*: TrueSkill estimates a skill value with uncertainty (μ ± σ). Project these onto a scoring scale by fitting a normal distribution, then apply whatever curve you normally use. This preserves information about absolute quality, so a strong cohort looks different from a weak one.

Percentile mapping is simpler and harder to argue with, but it could result in pass/fail decisions that feel unfair in some cases. Projection preserves more information but requires trusting the rating system's scale. For early adoption, start with percentiles and manually determine the rank failure cutoff so it matches your intuition.

## The system

Teachers upload assignments and a rubric. An LLM judge, something on the cost-performance frontier like Gemini Flash or Claude Haiku, runs a tournament bracket comparing pairs of submissions against the teacher's criteria.

The system outputs a proposed ranking with confidence indicators. Where the model is certain, where it's uncertain, why. Think of it like a first pass by a competent but unimaginitive TA - a starting point for teacher intution, not the final word. The comparison history is auditable, so there's something defensible teachers can point students and parents towards in the case of grade disputes.

## The AI-judging-AI-work thing

School for humans veering towards AI judging AI work is ironic, but the future is cybernetic. If a teacher's job is to prepare a student for success in the world, it helps to acknowledge how they will be expected to work. If it's any consolation, research shows LLM-as-judge aligns with human preferences around 85% of the time, which is higher than human-to-human agreement (~81%), and this number will  increase.

The teacher is still driving the evaluations. They supply the rubric, review the order and provide student feedback; AI is just doing a preliminary sorting. The student is still being graded on their merits; the measure has just shifted to "how much value can you add on top of AI?"

If you're worried about AI biases, LLM-as-judge has known failure modes with known fixes. Position bias (models prefer whichever response comes first) can be fixed by swapping position and averaging. Verbosity bias can be handled via prompting and length normalization.

## Why I think this transfers

I spend a fair amount of time evaluating AI models. The same problem keeps showing up: lack of ground truth.

In cost-sensitive deployments (customer service bots, document analysis) you're trying to find the Pareto frontier of models for your specific application. An answer key is rarely available (or expensive to generate), the "right" output is contextual, and mainstream model benchmarks don't capture performance on your specific application. You end up doing ad-hoc comparisons anyway as a gut check, so why not just start with that and do it the right way?

The beauty of this approach is that it's both simple and rigorous. There's also a certain elegance to using the poison as the cure: the same advances in AI that are derailing education have lowered the cost of a solution.

This method sidesteps the question of how to score work, while producing more mathematically defensible scores. You could argue that the transition from measuring "what people know" to measuring "what people can produce" loses something, but you could also argue that this is closer to the way students will be assessed in the workforce, and thus more relevant.

If you're a teacher who feels like they're losing the war with AI in the classroom and you're open to running some experiments, hit me up. I'm willing to build a simple version of this for you and discuss how to design assignments that push students under the assumption of AI use at no charge.

<div class="cta-section cta-section--centered article-github-cta">
  <a href="javascript:void(0)" class="btn-unified btn-primary" data-contact-type="contact" data-subject-type="waitlist" data-custom-body="I'm interested in the pairwise grading described in 'How Agent Evals Can Fix Education'.">
    <span class="btn-inner">
      Rethink Education
      <i data-lucide="mail"></i>
    </span>
  </a>
</div>