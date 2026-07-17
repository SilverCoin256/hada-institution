# HADA — Institutional Review

*A review board of the kind HADA aspires to be read by: HAI and Oxford Internet Institute directors, MIT Media Lab and Brookings AI-governance researchers, Cochrane methodologists, FT visual-journalism and Nature editors, computational social scientists, research-infrastructure builders.*

**Charge:** Not the UI. Not the code. Not the design. Assume those are solved. **Does HADA deserve to exist — and does this instance earn its own claims?**

---

## Verdict

**The idea deserves to exist. This instance has not yet earned the words "atlas," "cartography," or "infrastructure" — and one feature, the self-assigned confidence grade, could currently do harm rather than merely underdeliver.**

Two separable questions were conflated in the brief, and they get opposite answers:

1. *Is the claim–evidence–gap architecture a legitimate and useful contribution to how this field is organized?* — **Yes, clearly.** It fills a real hole that OpenAlex, the AI Index, OWID, and think-tank commentary each structurally cannot.
2. *Does the artifact as it stands constitute that contribution?* — **Not yet.** It is one fully worked dossier and five stubs in one domain: a rigorous, honest, well-argued **proof-of-concept for infrastructure**, presented in the rhetorical register of infrastructure that already exists. The gap between the promise and the object is the central risk, and it is a credibility risk, not a design one.

The single deepest problem, from which most others follow: **HADA's product is trust, and trust is the one asset its current structure cannot manufacture.** Structure, honesty, taxonomy, and design it can build alone. Authority to grade a body of evidence is *conferred by a community* — it cannot be asserted by a solo, unaffiliated editor, however rigorous. Everything strategic collapses to one imperative: **import external authority as fast as possible** (reviewers, a methodological advisor, an archival registry, an institutional host). Until then, the grade badge is epistemically unbacked while looking institutionally authoritative — and that specific mismatch is the thing a hostile reader will exploit.

---

## I. Intellectual legitimacy — *would serious researchers respect this?*

**Qualified yes, on the concept; reservations on the execution.**

Respectable signals, and they are real:
- The atomic unit is correctly chosen. Organizing by *claim* rather than by paper or by metric is the genuinely original move, and it is defensible in front of experts.
- The evidence is real and correctly characterized. Brynjolfsson–Li–Raymond (QJE 2025), Noy & Zhang (*Science* 2023), Dell'Acqua et al. (HBS WP 24-013), Peng et al. (Copilot RCT), Dietvorst–Simmons–Massey (2015) vs. Logg–Minson–Moore (2019) as the aversion/appreciation contradiction pair — these are the right papers, cited with the right numbers and the right caveats. *(One item to verify before wider release: the Budzyń et al. 2025 endoscopy de-skilling citation — confirm venue, authorship, and that it says what W-006 claims. It is load-bearing for the erosion narrative and is the least familiar of the set.)*
- Keeping the contradiction *on the page*, refusing to vote, and ending each dossier with "what would change this grade" is exactly the intellectual posture that earns respect from methodologists. It is the opposite of the confident-synthesis failure mode.

Where a serious reader's respect stalls:
- **No search protocol.** A systematic evidence map lives or dies on *how the studies were found*. There is none stated. Absent an inclusion protocol and a "last searched" date, six claims × four studies is a **reading list, not a map** — and, fatally for the concept, the gap claims (G-001…G-004) become unfalsifiable. "Absence of evidence" is the most dangerous assertion in scholarship; HADA makes four of them with no demonstrated search behind them. A reviewer's first question — "how do you know that's a gap and not just something you haven't read?" — currently has no answer.
- **The grade is a single reader's judgment wearing GRADE's uniform.** HADA borrows Cochrane's *grammar* (grade tiers, evidence-strength language) without Cochrane's *machinery* (registered protocols, dual independent coding, inter-rater reliability, conflict-of-interest governance, decades of collective authority). The rubric is published — good — but a rubric relocates subjectivity, it does not remove it: "replicated in two or more contexts," "no *credible* contradiction" are judgment calls. With n=1 coder there is no reliability statistic, so the badge is aesthetically rigorous and epistemically unaudited.

## II. Conceptual legitimacy — *is the claim–evidence architecture genuinely useful?*

**Yes — this is the strongest part of the project, and it would be useful even stripped of the branding.**

The four-incumbent analysis in the MASTER architecture is correct and non-trivial: OpenAlex holds documents and their links but not what they claim; OWID holds measured quantities but not contested qualitative mechanisms; the AI Index holds periodic macro-snapshots, not claim-level granularity; think tanks hold argument, which is *downstream* of the neutral evidence layer. The claim-object genuinely sits in the white space between them.

But two conceptual defects in the current instance must be named, because they are the kind a methodologist catches in thirty seconds and they undercut the "map" metaphor:

- **Evidence double-counting across nodes.** W-001 (novice–expert compression), W-002 (jagged frontier), and W-005 (task-level output gains) are drawn from substantially the *same* three-to-four papers — the jagged-frontier node *is* Dell'Acqua. Yet the flagship plate encodes "node area = independent studies on file" and assigns each node an independent grade. Three nodes re-slicing one evidence base, sized and graded as if independent, is precisely the error an evidence graph exists to prevent. The dependency must be modeled explicitly (shared-source edges, or dedup), or the "map" misrepresents its own coverage.
- **Unexplained grade divergence on shared evidence.** W-005 is graded **Robust** and W-001 **Moderate**, though they rest on overlapping short-run task-level studies. There may be a defensible reason (aggregate output gains replicate more universally than the heterogeneity/compression result), but the site never states it — and an unexplained grade split on shared evidence reads as arbitrary, which is the one thing a grading system cannot afford to read as.

Fix both and the architecture is not just useful but demonstrably more honest than the prose syntheses it competes with. This is the asset. Protect it.

## III. Category creation — *new category, or a beautiful dashboard?*

**Aspirationally a new category; currently a superbly executed single-topic evidence synthesis — nearer to an *Annual Review* mini-article or a rigorous Wikipedia section than to infrastructure.**

"Living Evidence Cartography" is, today, branding ahead of substance. The three properties that would make it a category rather than a document — (a) many domains, (b) machine-readable structured output that others build on, (c) a contributor network conferring distributed authority — are all promised in the roadmap and none exist yet. It is not a *dashboard* (it asserts graded, contestable claims; dashboards assert nothing), which is to its credit. But "atlas" is a claim about coverage, and coverage is exactly what one dossier does not have. The category is a **promissory note**. It becomes real at the moment a second independent contributor grades a claim the founder did not — not before.

## IV. Citation potential — *what stops a professor from citing it?*

Four blockers, in order of severity:

1. **The flagship grade is self-assigned and the site says so.** The dossier's own disclosure — "has not yet been externally reviewed" — means a scrupulous scholar *cannot* cite the grade as an authority; they would be citing one anonymous-to-them editor's read. HADA's integrity currently documents its own non-citability. (This is a virtue that resolves the instant one external reviewer signs one dossier.)
2. **No archival persistence or DOI.** "Suggested citation" plus a "permanence rule" asserted on GitHub Pages is not a persistence guarantee; it is a promise from a domain that can lapse. Without a DOI-minting archive (Zenodo, OSF), the citation can rot, and careful authors will not cite what can rot.
3. **Primary-source substitution.** For most sentences, a professor will cite Brynjolfsson or Noy–Zhang *directly* — HADA adds a layer they do not need. HADA is only citable-instead-of-primary when the *synthesis itself* is the contribution.
4. **Which points to the one realistic citation — and it is a good one.** The citable object is not the claim (cite the paper) but the **gap and the framing**: *"the long-run skill-formation question remains open (HADA G-001)."* That is a real, useful, HADA-only citation — but it is only defensible if the gap register is demonstrably comprehensive, i.e. it depends entirely on fixing the missing search protocol (§I). The gap register is simultaneously HADA's best citation asset and its least defended one.

## V. Trust analysis — *what still feels fragile?*

- **Asymmetric error exposure.** With no institutional buffer, the first grading or characterization error a real researcher catches damages the whole "trust me, I grade honestly" edifice out of proportion — one wrong grade outweighs many right ones. Given the founder's documented prior history of a fabrication catch elsewhere in the corpus, this risk is *elevated* and must be managed by conservative grading, visible correction logs, and — above all — external eyes before claims are promoted.
- **The honesty disclosures are the strongest asset and a standing liability at once.** They earn trust and they announce non-citability. Keep every one of them; resolve the liability by earning review, not by deleting the disclosure.
- **Unbacked absence-claims** (the gaps) are the most fragile assertions on the site, per §I.
- **The mission–artifact gap.** The MASTER document's civilizational framing ("world's leading public intelligence infrastructure") read next to one dossier is a credibility hazard if the two are ever seen together. The public site mostly disciplines this ("founding release," "small on purpose"); keep the grand register *internal* and let public copy promise exactly what exists.

## VI. Founder risk — *what still reads "high-school project" rather than "emerging institution"?*

The site handles this better than most — it leads with the intellectual object and, correctly, contains no age, no biography, no school. Remaining tells, in descending order:

1. **Single-domain scope reads as capstone, not institution.** Nothing signals "student project" like one topic covered once. Depth is the intended defense, but depth in *one* place also reads as *a* project. The resolution is not more domains (that reads as over-reach) but external contributors in the one domain — plurality of *people*, not of *topics*.
2. **The project orbits the founder's own research agenda.** The roadmap names the candidate second domain as "AI in institutional review and oversight queues — *the domain in which the founding research program works*." That is portfolio-building wearing an atlas's clothes, and an admissions reader or a scholar will read it that way. Either pick a second domain *outside* the founder's own paper agenda, or make the conflict explicit and governed. Neutral infrastructure cannot visibly exist to cite its builder.
3. **Self-description as "independent researcher."** Naming the editor is honest; the "independent researcher" framing for a high-schooler edges toward exactly the prodigy-cosplay the project should avoid. Let the object carry the authority; minimize the self-label.
4. **Solo governance signals.** No advisory reader, no named methodology contact, no second coder — the absence of any "we" is the quiet tell. A single credible collaborator changes this more than any amount of polish.

## VII. Prestige analysis — Stanford / MIT / Yale / Princeton / Penn M&T

HADA is not competing with these institutions; it is a **signal about a person** to their gatekeepers. Read through each lens:
- **Stanford / MIT (research-builder lens):** rewards the person who built the *connective tissue of a field*, not another model or app. HADA's frame — "I built the evidence layer nobody else holds" — is precisely legible here, *if* the intellectual object leads and the visuals follow. Strong fit.
- **Yale / Princeton (scholarly-seriousness lens):** rewards rigor, honesty about uncertainty, and disciplinary maturity. The "keep the contradiction on the page / register the gaps / grade honestly" posture reads as unusually mature. Strong fit — provided the search-protocol gap is closed, because this reader knows what a systematic review requires.
- **Penn M&T (builder-of-durable-things lens):** rewards a thing that compounds and could outlive its founder. Here HADA is *weakest*: founder-dependence and no persistence layer read as "will be abandoned at matriculation." Fix persistence + one collaborator and this lens flips positive.

Net: the prestige case is real and distinctive, and it rests on the *intellectual* frame surviving scrutiny — not on the design, which these readers discount.

## VIII. Memorability — *what does an admissions reader recall after three days?*

- **The one-liner survives, and it is excellent:** *"the student who built a Cochrane Collaboration for AI's effect on human decisions."* Crisp, repeatable at a committee table, category-defining. This is the single most valuable output of the whole project.
- **The image that survives** is the evidence map with its **hatched *uncharted* region** — "the kid who mapped what we *don't* know." Make the unknown, not the known, the thing the plate is *about*; that is the memorable and defensible inversion.
- **The failure mode** is being filed under "another polished AI website." It is defeated only by leading, in every summary, with the claim-object and the gap register — never with the aesthetics.

## IX. The strongest external critique (steelmanned)

> *"This is a beautifully art-directed literature review by one unaffiliated minor, dressed in the visual and lexical authority of Cochrane and the FT, making graded pronouncements about a fast-moving field with no stated search strategy, no second coder, no external review, and no archival persistence. Its central instrument — the confidence grade — carries the connotation of institutional consensus while being one person's opinion, and its flagship map double-counts the same four papers across three separately-graded nodes while asserting the node sizes represent independent evidence. Its 'gaps' may be reading gaps. Strip the typography and it is a very good student essay with a citation button. The honest disclosures prove the authors know all of this — which makes shipping the authoritative-looking grade anyway the real problem, because a reader who doesn't read the fine print will mistake a teenager's read for a reviewed finding."*

Every clause of that is currently answerable only with "the roadmap will fix it." That is the measure of the work remaining.

## X. Fatal risks within three years (ranked by probability × severity)

1. **Abandonment at matriculation → a rotting atlas.** Highest-probability failure; a stale evidence resource is worse than none. Mitigate with a persistence layer and at least one co-editor *before* scaling.
2. **Never earns external review → grades stay self-assigned → never citable → intellectual influence ≈ 0.** The success metric is unreachable without this one act.
3. **A caught error collapses the trust edifice** (§V), elevated by history. Manage with conservative grading and public correction logs.
4. **Scope creep before depth is proven** → mile-wide/millimeter-deep → uncitable. The roadmap's discipline ("sequenced, not scheduled") must actually hold.
5. **Primary-source substitution** → researchers route around it to the underlying papers, and HADA's layer proves optional.
6. **Unbacked gap claims are falsified** by a reviewer who names the literature HADA missed → the gap register, its best citation asset, becomes its most public embarrassment.

## XI. Required changes, ranked by impact (cosmetics ignored)

1. **Recruit one named external reviewer for the W-001 dossier.** Converts a self-graded badge into a reviewed finding; flips citability status; erases the largest founder-risk tell in a single stroke. *Highest leverage act available.* A grad student, postdoc, or faculty member in the economics of AI or HCI suffices.
2. **Publish the search and inclusion protocol** for the one domain — how studies were found, inclusion/exclusion criteria, and a "last searched" date. Without it, every gap claim is indefensible and "cartography" is unearned. This is the line between a map and a blog.
3. **Deposit each claim/version snapshot in a DOI-minting archive** (Zenodo/OSF). Makes citation mechanically possible and persistent; backs the "permanence rule" with an institution instead of a promise.
4. **Model evidence dependency in the graph** — dedup or explicitly link the shared-source nodes (W-001/W-002/W-005) so grades and node areas stop double-counting. A methodologist checks this first; fix it before they do.
5. **Add a second-coder / independent-grader field** to every claim. Even one other person grading blind gives the rubric its first shred of empirical legitimacy (and a path to an inter-rater statistic later).
6. **Explain grade divergence on shared evidence** (why W-005 Robust but W-001 Moderate) in the dossier itself. Silence here reads as arbitrariness.
7. **De-risk founder-dependence structurally:** name a methodology advisor / co-editor and move from "I" to a credible "we." Pick the second domain *outside* the founder's own research area — or govern the conflict openly.
8. **Discipline the public register:** keep the MASTER document's civilizational language internal; let every public sentence promise exactly and only what exists.

Items 1–3 are the ones that change HADA's *status* (from un-reviewed to reviewed, from un-searched to systematic, from ephemeral to archived). Everything below them improves quality; those three change what HADA *is*.

---

### One-line disposition

**Accept the concept; do not yet accept its claims.** HADA deserves to exist as a *reviewed, searched, archived* object — and is roughly three deliberate acts (an external reviewer, a search protocol, a DOI) away from being one. Until then it is the best-argued proposal for this infrastructure that exists, which is not nothing, and is not yet the infrastructure.
