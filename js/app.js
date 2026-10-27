/**
 * PhishProof Campus - Application Logic & Controller
 * Track: Cybersecurity & Digital Safety
 * Tagline: Think Before You Click.
 */

// Application State
const AppState = {
  currentView: "landing", // 'landing', 'training', 'results', 'dashboard', 'lab'
  session: {
    active: false,
    currentIndex: 0,
    score: 0,
    answers: [], // Array of { scenarioId, selectedIndex, isCorrect, category, scenario }
    hasAnsweredCurrent: false,
    selectedOptionIndex: null
  }
};

// Initialize Application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupNavigation();
  setupTrainingControls();
  setupResetModal();
  renderLandingCategories();
  renderLandingLivePreview();
  updateDashboardView();
  
  // Listen for hash changes if user uses browser history
  window.addEventListener("hashchange", handleHashChange);
  
  // Handle initial route
  if (window.location.hash) {
    handleHashChange();
  } else {
    navigateTo("landing");
  }

  // Initialize Red Flag Lab if available
  if (typeof initRedFlagLab === "function") {
    initRedFlagLab();
  }
}

/**
 * View Routing & Navigation
 */
function navigateTo(viewName) {
  AppState.currentView = viewName;
  window.location.hash = viewName;

  // Update visible view containers
  const views = ["landing", "training", "results", "dashboard", "lab"];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove("hidden");
        el.removeAttribute("aria-hidden");
        // Scroll to top of active view
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        el.classList.add("hidden");
        el.setAttribute("aria-hidden", "true");
      }
    }
  });

  // Update navigation active states
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-target") === viewName) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // Specific view lifecycle hooks
  if (viewName === "dashboard") {
    updateDashboardView();
  } else if (viewName === "training" && !AppState.session.active) {
    startNewTrainingSession();
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  const validViews = ["landing", "training", "results", "dashboard", "lab"];
  if (validViews.includes(hash)) {
    navigateTo(hash);
  }
}

function setupNavigation() {
  document.querySelectorAll("[data-nav-target]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-nav-target");
      navigateTo(target);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("main-nav");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", String(!isExpanded));
      navMenu.classList.toggle("is-open");
    });

    // Close menu when clicking nav link on mobile
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/**
 * Landing Page Components
 */
function renderLandingCategories() {
  const container = document.getElementById("categories-grid");
  if (!container) return;

  const categories = [
    { title: "Career & Internship Fraud", icon: "💼", desc: "Fake research offers, Telegram interviews, and upfront equipment check scams." },
    { title: "Account & SSO Verification", icon: "🔐", desc: "Deceptive password expirations, MFA resets, and spoofed university login portals." },
    { title: "Financial Aid & Grants", icon: "💰", desc: "Advance-fee scholarship traps promising thousands for an upfront handling voucher." },
    { title: "Campus Mail & Deliveries", icon: "📦", desc: "Smishing package notices charging micro-fees to harvest credit card numbers." },
    { title: "Faculty Impersonation", icon: "🎭", desc: "Urgent gift-card requests sent from personal Gmail accounts posing as department chairs." },
    { title: "Physical Quishing (QR Codes)", icon: "📱", desc: "Malicious sticker overlays placed on library noticeboards and dining hall tables." },
    { title: "Student Accounts & Bursar", icon: "💳", desc: "Shockwire transfer receipts designed to induce panic and trigger fake disputes." },
    { title: "Legitimate Campus Notices", icon: "🛡️", desc: "Learn to identify authentic communications without succumbing to alert fatigue." }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="category-card">
      <div class="category-icon" aria-hidden="true">${cat.icon}</div>
      <h3 class="category-title">${cat.title}</h3>
      <p class="category-desc">${cat.desc}</p>
    </div>
  `).join("");
}

function renderLandingLivePreview() {
  const previewBox = document.getElementById("landing-live-preview");
  if (!previewBox) return;

  const sample = SCENARIOS[0]; // Suspicious internship
  previewBox.innerHTML = `
    <div class="preview-chrome">
      <div class="chrome-header">
        <span class="chrome-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></span>
        <span class="chrome-title">Simulated Student Inbox Preview</span>
        <span class="chrome-badge badge-warning">Simulated Threat</span>
      </div>
      <div class="email-headers">
        <div class="header-line"><strong>From:</strong> ${escapeHtml(sample.senderName)} &lt;${escapeHtml(sample.senderEmail)}&gt;</div>
        <div class="header-line"><strong>Subject:</strong> ${escapeHtml(sample.subject)}</div>
      </div>
      <div class="email-preview-body">
        <p>Dear Student, I selected your profile for an urgent Remote Research Assistant role ($35/hr). Contact via Telegram @DrFinchResearch immediately. We will courier an advance check of $1,850 for supplies...</p>
      </div>
      <div class="preview-cta-bar">
        <span class="preview-hint">Can you identify the 5 distinct red flags in this message?</span>
        <button class="btn btn-sm btn-primary" data-nav-target="training">Start Real Challenge</button>
      </div>
    </div>
  `;

  // Attach navigation to the preview button
  previewBox.querySelector("button")?.addEventListener("click", () => navigateTo("training"));
}

/**
 * Training Engine: Session Lifecycle & Interaction
 */
function startNewTrainingSession() {
  AppState.session = {
    active: true,
    currentIndex: 0,
    score: 0,
    answers: [],
    hasAnsweredCurrent: false,
    selectedOptionIndex: null
  };

  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const session = AppState.session;
  const total = SCENARIOS.length;
  const currentScenario = SCENARIOS[session.currentIndex];

  if (!currentScenario) {
    finishTrainingSession();
    return;
  }

  // Reset interactive flags for this question
  session.hasAnsweredCurrent = false;
  session.selectedOptionIndex = null;

  // Update Progress Indicators
  const progressText = document.getElementById("q-progress-text");
  const progressBar = document.getElementById("q-progress-bar");
  const scoreCounter = document.getElementById("q-current-score");

  if (progressText) {
    progressText.textContent = `Question ${session.currentIndex + 1} of ${total}`;
  }
  if (progressBar) {
    const percent = Math.round(((session.currentIndex) / total) * 100);
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", String(percent));
  }
  if (scoreCounter) {
    scoreCounter.textContent = `${session.score} pts`;
  }

  // Render Question Details
  const categoryBadge = document.getElementById("q-category-badge");
  const difficultyBadge = document.getElementById("q-difficulty-badge");
  const messageCard = document.getElementById("q-message-card");
  const optionsContainer = document.getElementById("q-options-container");
  const feedbackCard = document.getElementById("q-feedback-card");
  const submitBtn = document.getElementById("btn-check-answer");
  const nextBtn = document.getElementById("btn-next-question");

  if (categoryBadge) {
    categoryBadge.textContent = currentScenario.category;
  }
  if (difficultyBadge) {
    difficultyBadge.textContent = `${currentScenario.difficulty} Level`;
    difficultyBadge.className = `badge badge-${currentScenario.difficulty.toLowerCase()}`;
  }

  // Render Simulated Message Chrome (Realistic Email/Poster View)
  if (messageCard) {
    const isQuishing = currentScenario.type === "phishing" && currentScenario.category.includes("Quishing");
    
    messageCard.innerHTML = `
      <div class="simulated-email">
        <div class="simulated-header">
          <div class="sim-meta-row">
            <span class="sim-label">From:</span>
            <span class="sim-value sender-highlight">${escapeHtml(currentScenario.senderName)}</span>
            <span class="sim-email-tag">&lt;${escapeHtml(currentScenario.senderEmail)}&gt;</span>
          </div>
          <div class="sim-meta-row">
            <span class="sim-label">To:</span>
            <span class="sim-value">${escapeHtml(currentScenario.recipient)}</span>
          </div>
          <div class="sim-meta-row">
            <span class="sim-label">Date:</span>
            <span class="sim-value">${escapeHtml(currentScenario.date)}</span>
          </div>
          <div class="sim-meta-row subject-row">
            <span class="sim-label">Subject:</span>
            <span class="sim-subject">${escapeHtml(currentScenario.subject)}</span>
          </div>
        </div>
        <div class="simulated-body">
          <pre class="message-content">${escapeHtml(currentScenario.messageBody)}</pre>
          ${currentScenario.simulatedLink !== "None (Direct reply requested)" ? `
            <div class="simulated-link-box">
              <span class="link-label">Simulated Link Target (Non-Clickable for Safety):</span>
              <code class="simulated-url">${escapeHtml(currentScenario.simulatedLink)}</code>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }

  // Render Options
  if (optionsContainer) {
    optionsContainer.innerHTML = currentScenario.choices.map((choice, idx) => `
      <button type="button" class="option-card" data-option-index="${idx}" aria-label="Option ${idx + 1}: ${escapeHtml(choice.text)}">
        <span class="option-indicator">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${escapeHtml(choice.text)}</span>
      </button>
    `).join("");

    // Option selection click handlers
    optionsContainer.querySelectorAll(".option-card").forEach(optBtn => {
      optBtn.addEventListener("click", () => {
        if (session.hasAnsweredCurrent) return; // Disallow changes after checking
        
        optionsContainer.querySelectorAll(".option-card").forEach(b => b.classList.remove("selected"));
        optBtn.classList.add("selected");
        session.selectedOptionIndex = parseInt(optBtn.getAttribute("data-option-index"), 10);
        
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      });
    });
  }

  // Reset Submit & Next Buttons
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
  }
  if (nextBtn) {
    nextBtn.classList.add("hidden");
  }
  if (feedbackCard) {
    feedbackCard.classList.add("hidden");
    feedbackCard.innerHTML = "";
  }
}

function setupTrainingControls() {
  const submitBtn = document.getElementById("btn-check-answer");
  const nextBtn = document.getElementById("btn-next-question");
  const restartBtn = document.getElementById("btn-training-restart");

  if (submitBtn) {
    submitBtn.addEventListener("click", checkCurrentAnswer);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", proceedToNextQuestion);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (confirm("Restart training session from Question 1? Current session progress will be reset.")) {
        startNewTrainingSession();
      }
    });
  }

  // Keyboard navigation support: 1-4 to select options, Enter to submit/next
  document.addEventListener("keydown", (e) => {
    if (AppState.currentView !== "training") return;
    
    // Numbers 1-4 or A-D
    const key = e.key.toUpperCase();
    let optionIdx = -1;
    if (["1", "A"].includes(key)) optionIdx = 0;
    else if (["2", "B"].includes(key)) optionIdx = 1;
    else if (["3", "C"].includes(key)) optionIdx = 2;
    else if (["4", "D"].includes(key)) optionIdx = 3;

    if (optionIdx >= 0 && !AppState.session.hasAnsweredCurrent) {
      const optionButtons = document.querySelectorAll("#q-options-container .option-card");
      if (optionButtons[optionIdx]) {
        optionButtons[optionIdx].click();
      }
    } else if (e.key === "Enter") {
      const submitBtn = document.getElementById("btn-check-answer");
      const nextBtn = document.getElementById("btn-next-question");
      if (!AppState.session.hasAnsweredCurrent && submitBtn && !submitBtn.disabled) {
        submitBtn.click();
      } else if (AppState.session.hasAnsweredCurrent && nextBtn && !nextBtn.classList.contains("hidden")) {
        nextBtn.click();
      }
    }
  });
}

function checkCurrentAnswer() {
  const session = AppState.session;
  if (session.hasAnsweredCurrent || session.selectedOptionIndex === null) {
    return;
  }

  // Guard against duplicate points or re-submission
  session.hasAnsweredCurrent = true;

  const currentScenario = SCENARIOS[session.currentIndex];
  const selectedIdx = session.selectedOptionIndex;
  const chosenChoice = currentScenario.choices[selectedIdx];
  const isCorrect = chosenChoice.isCorrect;

  // Award Points (100 base points for correct response)
  const pointsAwarded = isCorrect ? 100 : 0;
  session.score += pointsAwarded;

  // Record Answer Details
  session.answers.push({
    scenarioId: currentScenario.id,
    selectedIndex: selectedIdx,
    isCorrect: isCorrect,
    category: currentScenario.category,
    scenario: currentScenario
  });

  // Update UI Elements
  const submitBtn = document.getElementById("btn-check-answer");
  const nextBtn = document.getElementById("btn-next-question");
  const feedbackCard = document.getElementById("q-feedback-card");
  const scoreCounter = document.getElementById("q-current-score");
  const optionButtons = document.querySelectorAll("#q-options-container .option-card");

  if (submitBtn) submitBtn.classList.add("hidden");
  if (nextBtn) nextBtn.classList.remove("hidden");
  if (scoreCounter) scoreCounter.textContent = `${session.score} pts`;

  // Highlight Options
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (currentScenario.choices[idx].isCorrect) {
      btn.classList.add("correct-choice");
    } else if (idx === selectedIdx && !isCorrect) {
      btn.classList.add("incorrect-choice");
    }
  });

  // Render Detailed Feedback Card
  if (feedbackCard) {
    feedbackCard.classList.remove("hidden");
    feedbackCard.className = `feedback-card ${isCorrect ? "feedback-success" : "feedback-danger"}`;

    const flagsOrSignalsTitle = currentScenario.redFlags.length > 0 ? "Detected Red Flags:" : "Identified Trust Signals:";
    const itemsList = currentScenario.redFlags.length > 0 ? currentScenario.redFlags : currentScenario.trustSignals;

    feedbackCard.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-icon" aria-hidden="true">${isCorrect ? "✅" : "⚠️"}</span>
        <div class="feedback-title-wrap">
          <h4 class="feedback-heading">${isCorrect ? "Excellent Detection! (+100 pts)" : "Incorrect Evaluation (0 pts)"}</h4>
          <p class="feedback-sub">${escapeHtml(chosenChoice.reason)}</p>
        </div>
      </div>
      
      <div class="feedback-content">
        <div class="feedback-section">
          <strong>Deep Explanation:</strong>
          <p>${escapeHtml(currentScenario.explanation)}</p>
        </div>

        <div class="feedback-section">
          <strong>${flagsOrSignalsTitle}</strong>
          <ul class="indicators-list">
            ${itemsList.map(item => `<li><span class="indicator-bullet">${currentScenario.redFlags.length > 0 ? "🚩" : "🛡️"}</span> ${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>

        <div class="feedback-section recommendation-callout">
          <strong>💡 Practical Campus Safety Recommendation:</strong>
          <p>${escapeHtml(currentScenario.recommendation)}</p>
        </div>
      </div>
    `;

    feedbackCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function proceedToNextQuestion() {
  const session = AppState.session;
  session.currentIndex += 1;

  if (session.currentIndex >= SCENARIOS.length) {
    finishTrainingSession();
  } else {
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Session Completion & Results View
 */
function finishTrainingSession() {
  const session = AppState.session;
  session.active = false;

  const totalQuestions = SCENARIOS.length;
  const correctCount = session.answers.filter(a => a.isCorrect).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Persist session to LocalStorage
  StorageService.recordSession({
    score: session.score,
    totalQuestions: totalQuestions,
    correctCount: correctCount,
    answers: session.answers,
    timestamp: new Date().toISOString()
  });

  // Render Results Screen
  renderResultsView(session.score, totalQuestions, correctCount, accuracy, session.answers);
  navigateTo("results");
}

function renderResultsView(score, total, correctCount, accuracy, answers) {
  const scoreNumber = document.getElementById("res-score-number");
  const accuracyText = document.getElementById("res-accuracy-text");
  const gradeBadge = document.getElementById("res-grade-badge");
  const verdictText = document.getElementById("res-verdict-text");
  const mistakesContainer = document.getElementById("res-mistakes-container");

  if (scoreNumber) scoreNumber.textContent = `${score}`;
  if (accuracyText) accuracyText.textContent = `${accuracy}% (${correctCount}/${total} Correct)`;

  // Determine Grade Tier
  let grade = "Cyber Sentinel (Distinction)";
  let gradeClass = "tier-expert";
  let verdict = "Outstanding cyber awareness! You successfully distinguished legitimate communications from deceptive lures, protecting both your credentials and campus safety.";

  if (accuracy < 50) {
    grade = "High Risk - Immediate Review Needed";
    gradeClass = "tier-critical";
    verdict = "Multiple high-risk lures bypassed your evaluation. Review your mistakes below to understand how urgency, gift cards, and spoofed domains trick students.";
  } else if (accuracy < 80) {
    grade = "Vigilant Scout - Promising Defense";
    gradeClass = "tier-intermediate";
    verdict = "Solid foundation! You caught the majority of threats but fell for subtle tactics like advance-fee scholarships or quishing stickers.";
  }

  if (gradeBadge) {
    gradeBadge.textContent = grade;
    gradeBadge.className = `results-tier-badge ${gradeClass}`;
  }
  if (verdictText) {
    verdictText.textContent = verdict;
  }

  // Render Mistakes & Review Section
  if (mistakesContainer) {
    const incorrectAnswers = answers.filter(a => !a.isCorrect);

    if (incorrectAnswers.length === 0) {
      mistakesContainer.innerHTML = `
        <div class="perfect-score-banner">
          <span class="banner-icon">🏆</span>
          <div>
            <h4>Flawless Defense!</h4>
            <p>You answered all 10 campus scenarios correctly without falling for a single trick or false alarm.</p>
          </div>
        </div>
      `;
    } else {
      mistakesContainer.innerHTML = `
        <div class="mistakes-header">
          <h3>Review Your Mistakes (${incorrectAnswers.length} Questions to Learn From)</h3>
          <p>Inspect the specific red flags you overlooked to strengthen your instincts.</p>
        </div>
        <div class="mistakes-list">
          ${incorrectAnswers.map((item, idx) => {
            const sc = item.scenario;
            const chosen = sc.choices[item.selectedIndex];
            const correct = sc.choices.find(c => c.isCorrect);
            return `
              <div class="mistake-review-card">
                <div class="mistake-card-top">
                  <span class="mistake-counter">#${idx + 1}</span>
                  <span class="badge badge-warning">${escapeHtml(sc.category)}</span>
                  <h4 class="mistake-scenario-title">${escapeHtml(sc.badge)}: ${escapeHtml(sc.subject)}</h4>
                </div>
                <div class="mistake-comparison">
                  <div class="comparison-row your-choice">
                    <span class="comp-label">❌ Your Answer:</span>
                    <span class="comp-text">${escapeHtml(chosen.text)}</span>
                  </div>
                  <div class="comparison-row correct-choice-text">
                    <span class="comp-label">✅ Correct Answer:</span>
                    <span class="comp-text">${escapeHtml(correct.text)}</span>
                  </div>
                </div>
                <div class="mistake-explanation">
                  <strong>Why this matters:</strong> ${escapeHtml(sc.explanation)}
                </div>
                <div class="mistake-tip">
                  <strong>Takeaway:</strong> ${escapeHtml(sc.recommendation)}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
  }

  // Setup Results Action Buttons
  const replayBtn = document.getElementById("btn-results-replay");
  const dashBtn = document.getElementById("btn-results-dashboard");
  const labBtn = document.getElementById("btn-results-lab");

  if (replayBtn) {
    replayBtn.onclick = () => {
      startNewTrainingSession();
      navigateTo("training");
    };
  }
  if (dashBtn) {
    dashBtn.onclick = () => navigateTo("dashboard");
  }
  if (labBtn) {
    labBtn.onclick = () => navigateTo("lab");
  }
}

/**
 * Dashboard & Analytics View
 */
function updateDashboardView() {
  const state = StorageService.loadState();

  const totalSessionsEl = document.getElementById("dash-total-sessions");
  const bestScoreEl = document.getElementById("dash-best-score");
  const avgAccuracyEl = document.getElementById("dash-avg-accuracy");
  const latestDateEl = document.getElementById("dash-latest-date");
  const emptyStateEl = document.getElementById("dash-empty-state");
  const contentStateEl = document.getElementById("dash-content-state");
  const historyListEl = document.getElementById("dash-history-list");
  const topicsListEl = document.getElementById("dash-topics-list");

  const hasSessions = state.totalSessionsCompleted > 0;

  if (emptyStateEl && contentStateEl) {
    if (!hasSessions) {
      emptyStateEl.classList.remove("hidden");
      contentStateEl.classList.add("hidden");
      return;
    } else {
      emptyStateEl.classList.add("hidden");
      contentStateEl.classList.remove("hidden");
    }
  }

  // Calculate Average Accuracy
  let avgAccuracy = 0;
  if (state.history.length > 0) {
    const sumAccuracy = state.history.reduce((acc, sess) => acc + (sess.accuracy || 0), 0);
    avgAccuracy = Math.round(sumAccuracy / state.history.length);
  }

  if (totalSessionsEl) totalSessionsEl.textContent = state.totalSessionsCompleted;
  if (bestScoreEl) bestScoreEl.textContent = `${state.bestScore} pts`;
  if (avgAccuracyEl) avgAccuracyEl.textContent = `${avgAccuracy}%`;
  if (latestDateEl) {
    latestDateEl.textContent = state.latestSessionDate 
      ? new Date(state.latestSessionDate).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
      : "Never";
  }

  // Render History Timeline
  if (historyListEl) {
    historyListEl.innerHTML = state.history.map((sess, idx) => `
      <div class="history-item">
        <div class="history-left">
          <span class="history-index">Session #${state.totalSessionsCompleted - idx}</span>
          <span class="history-time">${new Date(sess.date).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div class="history-right">
          <span class="history-badge ${sess.accuracy >= 80 ? 'badge-high' : 'badge-low'}">${sess.accuracy}% Accuracy</span>
          <span class="history-score">${sess.score} pts</span>
        </div>
      </div>
    `).join("");
  }

  // Render Topics to Revisit based on mistakes
  if (topicsListEl) {
    const topics = Object.entries(state.mistakesByTopic)
      .map(([category, stats]) => ({
        category,
        mistakes: stats.incorrectCount,
        total: stats.totalEncountered,
        rate: stats.totalEncountered > 0 ? Math.round((stats.incorrectCount / stats.totalEncountered) * 100) : 0
      }))
      .filter(t => t.mistakes > 0)
      .sort((a, b) => b.rate - a.rate);

    if (topics.length === 0) {
      topicsListEl.innerHTML = `
        <div class="good-standing-box">
          <p>🎯 No recurring vulnerability patterns detected! Keep testing your instincts periodically.</p>
        </div>
      `;
    } else {
      topicsListEl.innerHTML = topics.map(t => `
        <div class="topic-row">
          <div class="topic-info">
            <span class="topic-name">${escapeHtml(t.category)}</span>
            <span class="topic-stats">${t.mistakes} mistake(s) across ${t.total} encounters (${t.rate}% error rate)</span>
          </div>
          <div class="topic-bar-wrap">
            <div class="topic-bar-fill" style="width: ${t.rate}%"></div>
          </div>
        </div>
      `).join("");
    }
  }
}

/**
 * Reset Progress Modal Setup
 */
function setupResetModal() {
  const openBtn = document.getElementById("btn-open-reset-modal");
  const modal = document.getElementById("reset-confirm-modal");
  const cancelBtn = document.getElementById("btn-cancel-reset");
  const confirmBtn = document.getElementById("btn-confirm-reset");

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      cancelBtn?.focus();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      openBtn?.focus();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      StorageService.resetAllProgress();
      modal.classList.add("hidden");
      updateDashboardView();
      alert("All training progress and session history have been safely cleared.");
    });
  }

  // Dismiss on clicking backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Dismiss on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      openBtn?.focus();
    }
  });
}

/**
 * Utility: HTML Escaping
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
