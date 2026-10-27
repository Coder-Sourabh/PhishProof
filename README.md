# 🛡️ PhishProof Campus: Think Before You Click.

**PromptWars × KickToTech 2026**  
**Selected Track**: Cybersecurity & Digital Safety  
**Tagline**: *Think Before You Click.*  
**Target Users**: College students, resident advisors, faculty, and young adults.  

---

## 1. Project Overview & Problem Statement

### The Problem
College students and young adults are among the most heavily targeted demographics for cybercrime. Attackers know students operate under high stress (impending midterms, financial pressure, tuition deadlines) and often lack corporate-grade cybersecurity training. 

Every semester, campus inboxes are flooded with:
- **Fraudulent Employment & Fake Checks**: Unsolicited $35/hour research assistant positions requiring Telegram interviews and upfront equipment checks.
- **Urgent Credential Deactivation Lures**: Deceptive 2-hour Single Sign-On (SSO) countdowns threatening permanent deletion of course enrollment.
- **Advance-Fee Scholarship Scams**: Unclaimed merit awards that demand a $45 "administrative processing voucher" via gift cards.
- **Physical "Quishing" (QR Phishing)**: Glossy vinyl stickers covertly pasted over legitimate campus flyers on library noticeboards and dining hall tables.
- **Faculty Impersonation**: Spoofed emails from professors claiming an emergency prevents phone calls and asking students to buy gift cards.
- **Deceptive Billing Alerts**: Fabricated $4,820 tuition wire transfer receipts designed to induce immediate panic.

Most existing security training consists of generic compliance videos that alienate students. Furthermore, traditional training frequently creates **alert fatigue**—teaching students to suspect every message, leading them to ignore legitimate academic deadlines and campus safety broadcasts.

### The Solution: PhishProof Campus
**PhishProof Campus** is an interactive, zero-overhead cybersecurity learning platform tailored specifically to the collegiate ecosystem. It places students in the driver's seat of realistic simulated scenarios, teaching cognitive discernment rather than blind paranoia. 

Students learn not merely *what* to click or report, but *why*—analyzing sender domains, psychological urgency triggers, advance-fee schemes, and physical tampering indicators. Crucially, the platform includes **legitimate campus announcements**, teaching users to recognize authentic institutional trust signals.

---

## 2. Core Features

### 🎓 Interactive Training Engine (10 Realistic Scenarios)
- **10 Curated Collegiate Scenarios**:
  1. *Suspicious Internship Offer*: Professor Finch offering $35/hr via Telegram with an advance equipment check.
  2. *Urgent SSO Account Deactivation*: 2-hour countdown threatening deletion of Canvas access.
  3. *Unclaimed Scholarship Grant*: $2,500 Chancellor's award requiring a $45 voucher.
  4. *Package Delivery Exception*: Campus mailroom holding parcel for a $2.95 fee.
  5. *Faculty Impersonation*: Professor Arthur Vance requesting Apple gift cards for guest lecturers.
  6. *Physical QR Code Tampering (Quishing)*: Sticker overlay on library coffee promo poster.
  7. *Deceptive Tuition Billing Alert*: Reverse-psychology panic wire receipt of $4,820.
  8. *Legitimate Campus Announcement*: Dean of Academic Services extended library hours notice (authentic trust signals).
  9. *Suspicious Job Application Request*: Remote data entry clerk job asking for emailed SSN and photo ID.
  10. *Manipulative Conduct Summons*: Urgent 1-hour academic misconduct notice threatening suspension.
- **Realistic Visual Chrome**: Realistic email and poster views complete with sender headers, timestamps, and non-clickable simulated URLs.
- **Immediate Forensic Feedback**: Instant scoring (+100 pts), deep educational explanations, visual red flag bullet points, and practical campus safety recommendations.
- **Anti-Cheat Interaction Guard**: Submissions are locked after answering to prevent duplicate score inflation.

### 🔬 Red Flag Lab (Interactive Threat Hunter Workbench)
- An investigative bonus workbench featuring an authentic simulated phishing artifact.
- **Two-Way Element Selection**: Click directly on highlighted tokens inside the email body or toggle indicators in the forensic checklist.
- **Discernment Testing**: Includes a benign decoy element (campus security hotline) to penalize false alarms and reward genuine discernment.
- **Forensic Evidence Breakdown**: In-depth analysis of lookalike domains, hidden reply-to relays, manufactured urgency, and uncertified security seals.

### 📊 Defense Profile Dashboard & Analytics
- **Performance Metrics**: Completed session counter, all-time best score, average accuracy rate, and latest activity timestamp.
- **Topics to Revisit Diagnostics**: Categorical error-rate analytics identifying specific vulnerabilities (e.g. Financial Scams vs Quishing) where the student made mistakes.
- **History Timeline**: Chronological log of past sessions with accuracy badges.
- **Defensive Persistence**: Robust `localStorage` management that gracefully recovers from corrupted data and handles storage limits.
- **Reset Progress Control**: Guarded behind an accessible confirmation modal.

### 🎨 Visual & Interaction Design
- **High-Contrast Cyber Aesthetic**: Deep space navy background (`#0B1120`), slate card surfaces (`#1E293B`), emerald green trust signals (`#10B981`), and electric cyan highlights (`#06B6D4`).
- **Full Accessibility**: Keyboard shortcuts (`1-4` for choices, `Enter` to submit/advance), `:focus-visible` outlines, ARIA roles, skip-link navigation, and reduced-motion media queries.
- **100% Offline & Safe**: Zero external tracking scripts, zero web fonts, zero CDNs, and zero backend requirements.

---

## 3. Technology Stack

- **Frontend Core**: Semantic HTML5, Modular CSS3 (Custom Properties, Flexbox & Grid), Vanilla Modern JavaScript (ES6+).
- **Persistence**: Browser `localStorage` with defensive schema validation and fallback state.
- **Testing**: PowerShell 5.1 Automated Test Suite (`test/test_runner.ps1`).
- **Server Utility**: Zero-config socket-based HTTP server script (`server.ps1`).

---

## 4. Installation & Run Instructions

PhishProof Campus requires **no installation, no npm packages, no build steps, and no internet connection**.

### Method 1: Direct Browser Launch (Recommended / Instant)
Simply double-click `index.html` or open it in any modern browser:
```text
file:///c:/Users/soura/Downloads/antigravity-project/index.html
```

### Method 2: Lightweight Local Server (PowerShell)
To serve the application locally over HTTP at `http://localhost:8080/`:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```
Open your browser to: **`http://localhost:8080/`**

*(Alternatively, you may use any static server such as `python -m http.server 8080` or `npx serve`)*.

---

## 5. Project Structure

```
antigravity-project/
├── index.html                   # Core single-page web application container
├── server.ps1                   # Zero-dependency socket-based local HTTP server
├── README.md                    # Main hackathon submission & architectural guide
├── css/
│   └── styles.css               # Design system, cyber dark theme, responsive layouts
├── js/
│   ├── scenarios.js             # 10 realistic campus scenarios & Red Flag Lab data
│   ├── storage.js               # Safe LocalStorage persistence & topic diagnostics
│   ├── app.js                   # Application state machine, routing, scoring, feedback
│   └── redflag-lab.js           # Interactive threat hunter email workbench
├── test/
│   └── test_runner.ps1          # Automated test suite (46 verification checks)
└── docs/
    ├── DEMO_SCRIPT.md           # 3-to-4-minute live presentation script
    ├── JUDGES_QNA.md            # 5 likely judge questions and technical answers
    ├── CODE_EXPLANATION.md      # Concise explanation of core codebase architecture
    └── FEATURE_CHECKLIST.md     # Feature verification checklist & QA report
```

---

## 6. Testing Instructions & Actual Outcomes

### Running the Automated Test Suite
Execute the automated test suite from PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File test/test_runner.ps1
```

### Actual Verification Results
```text
======================================================================
  PHISHPROOF CAMPUS - TEST & VERIFICATION SUITE
======================================================================

1. File & Architecture Integrity Checks
  [PASS] index.html exists and is not empty
  [PASS] css/styles.css exists and is not empty
  [PASS] js/scenarios.js exists and is not empty
  [PASS] js/storage.js exists and is not empty
  [PASS] js/app.js exists and is not empty
  [PASS] js/redflag-lab.js exists and is not empty
  [PASS] server.ps1 exists for local execution

2. Scenario Curriculum & Threat Coverage Checks
  [PASS] Dataset contains at least 10 scenarios
  [PASS] Scenario 1: Suspicious internship offer present
  [PASS] Scenario 2: Urgent college account verification present
  [PASS] Scenario 3: Scholarship announcement present
  [PASS] Scenario 4: Parcel delivery notification present
  [PASS] Scenario 5: Faculty impersonation attempt present
  [PASS] Scenario 6: QR-code poster (quishing) present
  [PASS] Scenario 7: Fake payment confirmation present
  [PASS] Scenario 8: Legitimate campus announcement present
  [PASS] Scenario 9: Suspicious job application request present
  [PASS] Scenario 10: Message using manipulative urgency present
  [PASS] Dataset includes BOTH phishing and legitimate communications
  [PASS] All scenarios include red flags or trust signals
  [PASS] All scenarios include practical safety recommendations

3. Red Flag Lab Interactive Data Checks
  [PASS] RED_FLAG_LAB_DATA is defined with tokens
  [PASS] Lab data contains both true red flags and decoy trust signals

4. HTML Structure, Accessibility & Security Checks
  [PASS] HTML5 DOCTYPE, lang='en' and UTF-8 charset present
  [PASS] Accessibility skip-link exists
  [PASS] Semantic landmark roles used (banner, main, contentinfo, navigation)
  [PASS] All 5 core views exist in DOM (landing, training, results, dashboard, lab)
  [PASS] Interactive training elements present (progress, options, check button, next button, feedback card)
  [PASS] Results screen elements present (score, accuracy, mistakes review, replay button)
  [PASS] Dashboard elements present (empty state, stats, history, topics to revisit, reset modal)
  [PASS] Reset confirmation modal is fully formed with cancel and confirm buttons
  [PASS] Zero external script or stylesheet CDNs (100% self-contained & safe offline)

5. CSS Design System & Accessibility Checks
  [PASS] Visible keyboard focus indicator (:focus-visible) defined
  [PASS] Prefers-reduced-motion media query implemented
  [PASS] Responsive tablet/mobile breakpoints defined
  [PASS] Color system variables defined for surfaces, text, and status states

6. Application Logic, Scoring & Storage Guard Verification
  [PASS] Scoring logic awards 100 points for correct answer and 0 for incorrect
  [PASS] Submission guard: duplicate submission prevented by hasAnsweredCurrent flag
  [PASS] Options are disabled upon submission to lock choices
  [PASS] Progress calculation uses percentage across total questions
  [PASS] Storage engine handles missing/corrupted localStorage with safe fallback
  [PASS] Storage engine records completed session, bestScore, and mistakes by topic
  [PASS] Storage engine provides clean resetAllProgress function

7. Red Flag Lab Logic Verification
  [PASS] Lab evaluates true red flags, false alarms, and calculates score
  [PASS] Lab provides forensic evidence breakdown for each token
  [PASS] Lab supports two-way interaction (click in email or check in list)

======================================================================
  TEST RESULTS SUMMARY
======================================================================
  Total Tests Run:  46
  Passed Tests:     46
  Failed Tests:     0

>>> ALL 46 AUTOMATED TESTS PASSED SUCCESSFULLY! <<<
```

---

## 7. Submission Deliverables Summary

1. **Concise Project Submission Description**:
   > *"PhishProof Campus is an interactive cybersecurity training platform designed for college students and young adults. Rather than relying on generic corporate quizzes, it immerses students in 10 realistic campus-specific scenarios—including fraudulent research jobs, fake tuition receipts, urgent SSO deactivations, advance-fee scholarships, and physical library quishing stickers. Students receive instant forensic feedback, review mistakes, track topic vulnerabilities on a defense dashboard, and investigate simulated attacks in an interactive Red Flag Lab. It is 100% safe, educational, offline-functional, and requires zero external APIs or credentials."*
2. **3-to-4-Minute Live Demonstration Script**: Located at [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md).
3. **Five Likely Judge Questions & Answers**: Located at [`docs/JUDGES_QNA.md`](docs/JUDGES_QNA.md).
4. **Feature Checklist & Test Inventory**: Located at [`docs/FEATURE_CHECKLIST.md`](docs/FEATURE_CHECKLIST.md).
5. **Concise Explanation of Core Code**: Located at [`docs/CODE_EXPLANATION.md`](docs/CODE_EXPLANATION.md).

---

## 8. Known Limitations

- **Browser-Scoped Storage**: Training metrics and history are stored within the client's local browser (`localStorage`). Progress does not synchronize across distinct devices or incognito sessions.
- **Static Scenario Catalog**: The current build contains 10 curated scenarios and 1 interactive lab artifact. Extending the catalog requires updating `js/scenarios.js` (an online scenario editor is outlined under future improvements).
- **Simulated Email Protocol**: Messages are modeled within authentic CSS email containers rather than rendering raw `.eml` or RFC 822 MIME source files.

---

## 9. AI Tools Used & Human Review Workflow

During the development of PhishProof Campus, AI was leveraged as an agentic pair-programming partner:
- **Scenario Content & Lure Generation**: AI assisted in drafting authentic collegiate phrasing (e.g. realistic bursar wire transfer references and faculty emergency scenarios) adhering to accurate social engineering taxonomies.
- **Architectural Scaffolding**: AI assisted in structuring the clean MVC separation between `scenarios.js`, `storage.js`, `app.js`, and `redflag-lab.js`.
- **Automated QA Scripting**: AI generated the 46-point verification test runner in PowerShell (`test/test_runner.ps1`).

### What Was Personally Inspected & Verified:
1. **Safety Verification**: Verified that zero active links exist, all simulated URLs are wrapped in inert text tags, no credentials are requested, and zero external network calls are performed.
2. **Pedagogical Balance**: Personally verified that Scenario 8 represents a legitimate campus communication with authentic trust signals, ensuring students are not taught blind paranoia.
3. **Storage & State Guard**: Verified that rapid clicking on "Check My Answer" cannot award multiple points, and verified that corrupted `localStorage` will not throw unhandled exceptions.
4. **Accessibility Audit**: Verified keyboard navigation (`1-4` option selection, `Enter` submission), focus ring visibility, and WCAG AA contrast.

---

## 10. Originality Declaration

> **Originality & Compliance Confirmation**:  
> *I declare that PhishProof Campus is an original, safe, and ethical web application created specifically for PromptWars × KickToTech 2026 under the Cybersecurity & Digital Safety track. All scenarios, sender names, organizations, and domains are entirely fictional. The application does not collect credentials, send malicious messages, connect to live external targets, or execute unauthorized code. All code, design systems, and documentation have been thoroughly tested and verified.*
