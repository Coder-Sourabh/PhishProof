# PhishProof Campus — 3-to-4-Minute Live Demonstration Script
**Competition**: PromptWars × KickToTech 2026  
**Track**: Cybersecurity & Digital Safety  
**Product**: PhishProof Campus  
**Tagline**: *Think Before You Click.*

---

## Demo Overview & Strategy

- **Target Duration**: 3 minutes 30 seconds (leaves 30 seconds buffer for questions).
- **Core Message**: College students don't fall for generic Nigerian prince scams—they fall for hyper-contextual campus threats (Telegram research jobs, fake tuition receipts, 2-hour SSO deactivations, and physical quishing stickers). PhishProof Campus bridges the cognitive gap with interactive forensic pedagogy.
- **Demo Style**: Fast-paced, narrative-driven, hands-on, high energy.

---

## Timeline & Step-by-Step Script

### [0:00 – 0:40] Phase 1: The Hook & The Problem
**Action on Screen**: Display the **Landing Page** (`#landing`). Hover over the headline *"Think Before You Click. Defend Your Campus Identity."* and scroll smoothly down past the curriculum matrix.

**Speaker (Say this)**:
> *"Good morning judges! Every single semester, college students receive emails claiming their financial aid grant is ready, their student account will be deleted in two hours, or a professor needs urgent research assistance. Traditional cybersecurity awareness training is boring, corporate, and fails to address the unique vulnerabilities of college life.*  
>
> *Welcome to **PhishProof Campus**, built for the Cybersecurity & Digital Safety track at PromptWars × KickToTech 2026. Our mission is simple: **Think Before You Click.** We teach students not just WHAT is suspicious, but WHY—through realistic, fictional simulations built on real university attack vectors."*

---

### [0:40 – 1:30] Phase 2: Live Training Engine & Real-Time Feedback
**Action on Screen**:
1. Click the prominent primary button **"Start Training Now"** (Observe instant view switch to `#training`).
2. Point out the top header: Progress bar (*Question 1 of 10*), Score tracker (*0 pts*), and Category Badge (*Career & Employment*).
3. Read the simulated email: *Dr. Finch offering $35/hr, asking to chat on Telegram, sending a $1,850 advance check for software.*
4. Select Option B: *"Employment & fake-check scam: Report via campus IT or Career Services..."*
5. Click **"Check My Answer"**.
6. Show the instant green feedback card unfolding:
   - Point out **"+100 pts"** and score update.
   - Point out the **Deep Explanation** explaining the check-overpayment mechanism.
   - Highlight the **Detected Red Flags** list (lookalike `@gmail-facultydesk.net` domain, Telegram off-platforming, upfront check).
   - Read the **Practical Campus Safety Recommendation**.
7. Click **"Next Question ➔"** to load Question 2 (Account SSO Deactivation).

**Speaker (Say this)**:
> *"Notice our interface: it looks like an authentic student email client. In Scenario 1, a professor offers $35 an hour. An excited student might jump at this. But when we analyze it, we spot the red flags: an external Gmail domain, an interview shifted to Telegram, and a classic advance-check scheme.*  
>
> *When I click 'Check My Answer', the platform locks further submissions to prevent point inflation and immediately reveals the forensic breakdown. We don't just say 'wrong' or 'right'—we explain how the financial scam works and give students actionable advice: real campus jobs are listed on official portals like Handshake."*

---

### [1:30 – 2:10] Phase 3: Legitimate Messages & Quishing Nuance
**Action on Screen**:
1. Advance through questions or show Question 6 (*QR Code Quishing Sticker on Library Bulletin*) and Question 8 (*Legitimate Campus Announcement from Dean*).
2. For Question 8, show that it is **Legitimate**! Select Option B (*Legitimate university announcement*).
3. Click **"Check My Answer"** and show the blue/green **Trust Signals** card.

**Speaker (Say this)**:
> *"Here is where PhishProof Campus innovates beyond basic phishing quizzes: **we include legitimate messages and physical attack vectors.** In Question 6, we tackle 'Quishing'—fraudulent QR stickers placed over library flyers. And in Question 8, we present a legitimate announcement from the Dean of Academic Services.*  
>
> *Effective cybersecurity is not about becoming paranoid and reporting every email from your university—that creates alert fatigue. Our platform teaches users to recognize authentic trust signals: institutional domains, absence of coercive deadlines, and guidance to use existing browser bookmarks."*

---

### [2:10 – 2:50] Phase 4: Results, Mistakes Review & Defense Dashboard
**Action on Screen**:
1. Complete Question 10 or navigate to `#results`.
2. Showcase the **Results Card**:
   - Total Score (e.g., *900 / 1000 pts*), Accuracy Percentage, and Tier Badge (*Cyber Sentinel*).
   - Scroll down to the **"Review Your Mistakes"** section showing the exact scenario missed, what was picked, what was correct, and the key takeaway.
3. Click **"View Dashboard"** (`#dashboard`).
4. Point out:
   - **4 Core Metrics**: Completed Sessions, Best Score, Average Accuracy, Latest Activity.
   - **Recent Training Sessions** history timeline.
   - **Topics to Revisit**: Automated error-rate bars revealing which categories (e.g., Financial Aid or Quishing) the student struggled with most.
5. Click **"Reset All Progress"** to show the accessible confirmation modal, and click Cancel.

**Speaker (Say this)**:
> *"Upon completing the 10 scenarios, the student receives their Defense Tier and an interactive Mistakes Review that contrasts their selection against the correct security posture.*  
>
> *Here on the **Defense Dashboard**, all session data is safely persisted in browser `localStorage`. Notice our diagnostics: it pinpoints error patterns by threat category. If a student consistently falls for fake scholarship fees, the platform tells them to revisit financial topics. And if they want to reset, our accessible confirmation modal protects their data."*

---

### [2:50 – 3:30] Phase 5: The Red Flag Lab (Bonus Workbench) & Wrap-Up
**Action on Screen**:
1. Click **"Red Flag Lab"** (`#lab`).
2. Show the interactive email workbench on the left with inspectable hotspots.
3. Click on the sender domain `@univ-cloud-portal.net` directly inside the email header (it highlights in soft crimson with an inspector badge).
4. Click on the 45-minute lockout threat and the generic greeting.
5. Notice how the checkboxes on the right automatically synchronize in real time!
6. Click **"Run Forensic Analysis"**.
7. Show the calculated detection score (e.g. *86% Proficient Analyst*) and the **Forensic Evidence Breakdown** explaining true threats vs decoy university phone numbers.

**Speaker (Say this)**:
> *"Finally, we implemented the **Red Flag Lab**—an interactive forensic workbench. Students can inspect a live simulated attack, clicking directly on suspect headers, manipulative deadlines, and spoofed links. It even tests their discernment with decoy elements like official campus phone numbers.*  
>
> *PhishProof Campus runs 100% offline, requires zero API keys or backend servers, collects zero credentials, and is completely safe for campus-wide deployment.*  
>
> *Thank you, judges! Remember: Think Before You Click. We welcome your questions."*
