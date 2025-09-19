# Reflections

## 1) ExplainMeetSum: A Dataset for Explainable Meeting Summarization Aligned with Human Intent (ACL 2023)

**Full citation + link**  
Kim, Hyun; Cho, Minsoo; Na, Seung-Hoon. “ExplainMeetSum: A Dataset for Explainable Meeting Summarization Aligned with Human Intent.” *Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (ACL 2023).* https://aclanthology.org/2023.acl-long.731/


ExplainMeetSum augments meeting summarization with **evidence-aligned annotations**, linking each summary point to supporting sentences. The authors propose a framework (Multi-DYLE) that leverages extractive oracles to supervise evidence selection, improving **faithfulness**. Experiments show better alignment between generated content and human-marked evidence compared to baselines. The work reframes meeting summarization as not just “what was said” but “**prove where it was said**.” This operationalizes transparency and auditability for downstream tools.

**3 insights**  
1. Evidence alignment can be measured and trained for, not just shown as a UI afterthought.  
2. Extractive supervision boosts faithfulness without eliminating abstraction.  
3. Evidence-first datasets encourage **verifiable** meeting tools (quotes + spans).

**2 limitations/risks**  
1. Evidence spans depend on annotators; bias or omission is possible.  
2. Domain coverage is still close to AMI/ICSI styles; enterprise variability may reduce transfer.

**1 concrete idea this inspires for my project**  
Block Jira export of any user-story field (As a / I want / So that / GWT) **unless** at least one timestamped quote is attached.

---

## 2) Action-Item-Driven Summarization of Long Meeting Transcripts (arXiv 2023)

**Full citation + link**  
Golia, Logan; Kalita, Jugal K. “Action-Item-Driven Summarization of Long Meeting Transcripts.” *arXiv preprint* arXiv:2312.17581 (2023). https://arxiv.org/abs/2312.17581
  
This paper centers **action items** as the organizing principle for long meetings. It segments transcripts by topic, applies recursive summarization, extracts action items per segment, and fuses them into a global summary. Results on AMI indicate salience gains (e.g., BERTScore improvements) relative to generic abstractive baselines. The approach helps tame long-context drift and aligns outputs with tasks teams actually execute.

**3 insights**  
1. Topic segmentation + recursive summarization scales better than one-shot LLM passes.  
2. Action-item focus aligns summaries with execution and ownership decisions.  
3. Section-level extraction is parallelizable, reducing latency.

**2 limitations/risks**  
1. AMI gains may not generalize to noisy enterprise ASR or missing speaker tags.  
2. The work optimizes summarization quality, not the **assignment** problem directly.

**1 concrete idea this inspires for my project**  
Run a two-stage pipeline: (a) per-segment **story/action extraction** with timestamps; (b) feed those items into a **RAG-based owner recommender** with short, precise contexts.

---

## 3) Who Should Fix This Bug? (ICSE 2006)

**Full citation + link**  
Anvik, John; Hiew, Lyndon; Murphy, Gail C. “Who Should Fix This Bug?” *Proceedings of the 28th International Conference on Software Engineering (ICSE 2006).* https://dl.acm.org/doi/10.1145/1134285.1134336
 
This classic paper treats **bug triage as developer recommendation** using textual similarity between new bug reports and developers’ historical work. On a large OSS dataset, the method achieves strong top-k accuracy, launching extensive research in developer recommenders. Core idea: represent developers by prior issues/components and **rank** candidates for new issues. It’s directly analogous to **story → owner** matching using skill/history signals.

**3 insights**  
1. Assignment is naturally a **ranking** problem, not a single-label classification.  
2. Textual signals (components/tags/descriptions) carry strong predictive power for ownership.  
3. Feature engineering (history recency, component overlap) matters as much as the model class.

**2 limitations/risks**  
1. No notion of **capacity/availability**—can overload “experts.”  
2. Text-only similarity can **reinforce historical bias** and skill silos.

**1 concrete idea this inspires for my project**  
Combine story–member text similarity with **capacity** and **fairness** factors in a composite score (competence α + availability β + growth γ + continuity δ) and surface **justifications** citing retrieved history snippets.
