# PhishProof Campus — 5 Likely Judge Questions & Answers
**Competition**: PromptWars × KickToTech 2026  
**Track**: Cybersecurity & Digital Safety  

---

### Question 1: *"Why did you choose plain HTML5, CSS3, and JavaScript instead of React, Next.js, or Vue?"*
**Answer**:
> *"That was a deliberate engineering decision based on hackathon reliability, zero-overhead deployment, and universal accessibility.  
>
> Modern web browsers already possess full support for ES6+ state management, custom CSS properties, flexbox/grid layouts, and responsive DOM manipulation. By avoiding heavy framework runtimes (like Node bundlers, hydration layers, or npm dependency chains), PhishProof Campus loads in under 50 milliseconds, operates completely offline without network latency, and has zero risk of build failures or package deprecations.  
>
> We maintained modular separation of concerns: `scenarios.js` contains our curriculum data, `storage.js` handles schema-safe persistence, `app.js` runs the state machine, and `redflag-lab.js` handles interactive forensics. It delivers a fast, predictable experience that runs on any laptop, tablet, or smartphone without installation."*

---

### Question 2: *"How did you ensure the application is safe and won't be misused to launch actual phishing attacks?"*
**Answer**:
> *"Safety was our primary architectural constraint from minute one. We implemented four layers of protection:  
> 1. **Zero Active Links**: All simulated URLs are rendered inside non-clickable `<code>` tags with styling indicating they are inert text. Users cannot accidentally open or redirect to dangerous domains.  
> 2. **Fictionalized Domains and Names**: We use lookalike and fictionalized entities (e.g. `campus-sso-verify.net`, `state.campus.edu`, `@gmail-facultydesk.net`) rather than reproducing real universities or corporate trademarks.  
> 3. **Zero Credential Harvesting**: The app contains no password input fields, authentication tokens, or credential collection forms.  
> 4. **No Outbound Networking**: The application operates without backend servers, telemetry trackers, or external APIs. There is zero code capable of sending emails, SMS messages, or network requests."*

---

### Question 3: *"Why do you include legitimate campus announcements in your training instead of only phishing attacks?"*
**Answer**:
> *"In real-world cybersecurity education, one of the biggest pitfalls is 'alert fatigue' and hyper-paranoia. If you teach students that every urgent or official-looking email is malicious, they will eventually disregard all campus safety alerts, miss financial aid deadlines, or spam IT with false reports.  
>
> In Scenario 8, we feature a legitimate communication from the Dean of Academic Services. We teach students to evaluate **trust signals** alongside red flags: authentic `@state.campus.edu` institutional sender domains, absence of coercive deadlines, and instructions that direct students to log in via their regular portal bookmarks rather than clicking embedded links. Real security literacy is about discernment, not blind skepticism."*

---

### Question 4: *"How does the scoring and persistence system prevent cheating or duplicate submissions?"*
**Answer**:
> *"We implemented strict interaction guards within `app.js`. When a student clicks 'Check My Answer', the engine immediately flips the session flag `hasAnsweredCurrent = true`, disables all choice buttons, and hides the submit button. Any subsequent clicks or keypresses are rejected.  
>
> For persistence, `StorageService` in `storage.js` provides defensive `localStorage` management. It wraps reads and writes in `try/catch` blocks to protect against quota exhaustion or privacy mode restrictions. If stored JSON is malformed or corrupted, it falls back to a verified `DEFAULT_STATE` without crashing the application. Furthermore, the reset progress feature is guarded behind an accessible modal dialog requiring explicit user confirmation."*

---

### Question 5: *"How did you use AI during development, and what did you personally verify and test?"*
**Answer**:
> *"We used AI as an accelerator across four disciplines: scenario content modeling, accessibility audit generation, stress-test scripting, and design system scaffolding.  
>
> However, every single AI-generated output was rigorously inspected and verified:  
> 1. **Pedagogical Verification**: We audited all 10 scenarios to guarantee accurate cybersecurity taxonomies (quishing, advance-fee fraud, spear phishing, credential harvesting) and ensured legitimate trust signals were authentic.  
> 2. **Code & Security Review**: We reviewed the code to ensure zero network requests, sanitized HTML escaping to prevent XSS, and proper keyboard navigation (`tabindex`, `aria-live`, `:focus-visible`).  
> 3. **Automated Testing**: We authored and executed an automated test suite (`test/test_runner.ps1`) comprising 46 distinct checks that validate schema integrity, scoring math, interaction locking, and persistence recovery."*
