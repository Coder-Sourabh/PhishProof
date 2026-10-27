# PhishProof Campus — Core Code Architecture & Implementation Defense
**Competition**: PromptWars × KickToTech 2026  
**Track**: Cybersecurity & Digital Safety  

---

## 1. High-Level Architecture

PhishProof Campus follows a **Clean Vanilla Model-View-Controller (MVC)** architectural pattern without external bundlers or runtime frameworks.

```
antigravity-project/
│
├── index.html                 # View: Semantic HTML5, accessible landmarks, single-page container
├── css/
│   └── styles.css             # Styling: High-contrast cyber design system, CSS variables, mobile-first
├── js/
│   ├── scenarios.js           # Model: 10 structured campus scenarios & Red Flag Lab dataset
│   ├── storage.js             # Model/Service: Defensive localStorage persistence & topic analytics
│   ├── redflag-lab.js         # Controller/View: Interactive threat hunter email workbench
│   └── app.js                 # Controller: State machine, hash routing, scoring, and UI orchestration
├── test/
│   └── test_runner.ps1        # QA: 46 automated verification checks
├── server.ps1                 # Dev: Zero-config socket-based local HTTP server
└── docs/                      # Submission documentation & presentation materials
```

---

## 2. Core Modules Breakdown

### A. `js/scenarios.js` (The Curriculum Engine)
- **Role**: Contains the structured educational dataset.
- **Data Structure**:
  - `SCENARIOS`: Array of 10 scenario objects, each with `id`, `category`, `type` (`phishing` vs `legitimate`), `difficulty`, `badge`, `senderName`, `senderEmail`, `recipient`, `date`, `subject`, `messageBody`, `simulatedLink`, `choices` (3 to 4 choices with `text`, `isCorrect`, `reason`), `redFlags`, `trustSignals`, `explanation`, and `recommendation`.
  - `RED_FLAG_LAB_DATA`: Simulated suspect message with inspectable tokens (`token-sender`, `token-replyto`, `token-urgency`, `token-salutation`, `token-link`, `token-forfeiture`, `token-seal`, `token-phone`). Includes a decoy trust signal (`token-phone`) to test discernment.
  - `CATEGORIES_META`: Metadata mapping each campus category to distinct visual icons and accent colors.

### B. `js/storage.js` (Defensive Persistence Service)
- **Role**: Safely persists user metrics across sessions.
- **Key Methods**:
  - `loadState()`: Loads data from `window.localStorage`. Uses defensive `try/catch` and defaults merging so that if storage is cleared, corrupted, or schema is updated, the app gracefully falls back to `DEFAULT_STATE`.
  - `saveState(state)`: Serializes JSON with quota error handling.
  - `recordSession(sessionResult)`: Increments `totalSessionsCompleted`, recalculates `bestScore`, updates rolling 20-session history, and records errors in `mistakesByTopic` by category.
  - `recordLabResult(result)`: Stores forensic investigation score.
  - `resetAllProgress()`: Safely clears the storage key and restores default state.

### C. `js/app.js` (The Central State Machine & Controller)
- **Role**: Drives the Single-Page Application (SPA) lifecycle, view transitions, user interactions, scoring math, and results presentation.
- **Key Functions**:
  - `navigateTo(viewName)`: Manages hash routing between `landing`, `training`, `results`, `dashboard`, and `lab`. Toggles CSS classes, manages `aria-hidden` attributes, and controls scroll position.
  - `startNewTrainingSession()`: Resets session state (`currentIndex = 0`, `score = 0`, `answers = []`).
  - `renderCurrentQuestion()`: Dynamically renders the simulated email client view, choices, and progress indicators.
  - `checkCurrentAnswer()`:
    - **Anti-Cheat Guard**: Sets `session.hasAnsweredCurrent = true` immediately and disables choice buttons to prevent duplicate point exploitation.
    - **Scoring**: Awards 100 points for correct response, 0 for incorrect.
    - **Feedback Rendering**: Injects the deep explanation, bulleted red flags or trust signals, and safety recommendation into `#q-feedback-card` with `aria-live="polite"`.
  - `finishTrainingSession()`: Calculates accuracy, delegates persistence to `StorageService.recordSession`, and routes to the results screen.
  - `renderResultsView()`: Renders score, grade tier (`Cyber Sentinel`, `Vigilant Scout`, or `High Risk`), and an interactive list of incorrect answers with user selection vs correct answer.
  - `updateDashboardView()`: Compiles session history and renders topic error bars to highlight which categories need review.
  - `escapeHtml(str)`: Sanitizes dynamic strings before DOM injection to prevent Cross-Site Scripting (XSS).

### D. `js/redflag-lab.js` (Interactive Threat Hunter Workbench)
- **Role**: Bonus feature providing two-way interactive inspection of a simulated phishing email.
- **Key Mechanics**:
  - Clicking on highlighted tokens within the email directly checks off the corresponding indicator in the sidebar checklist, and vice versa.
  - `evaluateLabSubmission()`: Compares user selections against `trueRedFlags` and penalizes false alarms (flagging benign decoys like campus security numbers).
  - Generates a forensic evidence report explaining every threat vector and decoy.

---

## 3. Security & Safety Defenses

| Concern | Implementation Defense |
|---|---|
| **Simulated Link Safety** | URLs are displayed inside inert `<code class="simulated-url">` tags without hyperlinks (`<a>` tags or `href` attributes). |
| **XSS Prevention** | All dynamic content rendered through templates is filtered through `escapeHtml()` to neutralize potential markup injection. |
| **Offline Privacy** | Zero external CDN scripts (no Google Fonts, no unpinned scripts, no remote tracking). Runs 100% offline. |
| **Duplicate Points** | `session.hasAnsweredCurrent` locks answer checking after the first click. |
| **Accessibility** | Keyboard accessibility (`tabindex="0"`, Enter/Space activation, `1-4` keyboard shortcuts), `focus-visible` outlines, semantic landmarks, and WCAG AA contrast. |
