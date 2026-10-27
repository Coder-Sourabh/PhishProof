/**
 * PhishProof Campus - Red Flag Lab (Interactive Forensic Workbench)
 * Track: Cybersecurity & Digital Safety
 * 
 * Allows users to inspect a simulated deceptive email, identify suspicious elements,
 * evaluate detection accuracy, and review detailed forensic explanations.
 */

const RedFlagLabState = {
  selectedTokens: new Set(),
  evaluated: false
};

function initRedFlagLab() {
  const container = document.getElementById("lab-interactive-container");
  if (!container) return;

  renderRedFlagLab();
}

function renderRedFlagLab() {
  const container = document.getElementById("lab-interactive-container");
  if (!container) return;

  const data = RED_FLAG_LAB_DATA;
  RedFlagLabState.selectedTokens.clear();
  RedFlagLabState.evaluated = false;

  container.innerHTML = `
    <div class="lab-workspace">
      <!-- Left / Top: Interactive Email Inspector -->
      <div class="lab-email-panel">
        <div class="lab-panel-header">
          <div class="panel-tag">
            <span class="live-dot"></span> SIMULATED SUSPECT ARTIFACT #PH-804
          </div>
          <span class="panel-hint">Tip: Click highlighted elements directly or use the checklist</span>
        </div>

        <div class="lab-email-card">
          <div class="lab-email-headers">
            <div class="lab-header-row">
              <span class="l-lbl">From:</span>
              <span class="inspectable-element" data-token-id="token-sender" tabindex="0" role="button" aria-pressed="false">
                ${escapeHtml(data.senderName)} &lt;<strong>${escapeHtml(data.senderEmail)}</strong>&gt;
              </span>
            </div>
            <div class="lab-header-row">
              <span class="l-lbl">Reply-To:</span>
              <span class="inspectable-element" data-token-id="token-replyto" tabindex="0" role="button" aria-pressed="false">
                &lt;<strong>${escapeHtml(data.replyTo)}</strong>&gt;
              </span>
            </div>
            <div class="lab-header-row">
              <span class="l-lbl">Subject:</span>
              <span class="l-subject">${escapeHtml(data.subject)}</span>
            </div>
            <div class="lab-header-row">
              <span class="l-lbl">Date:</span>
              <span>${escapeHtml(data.date)}</span>
            </div>
          </div>

          <div class="lab-email-body">
            <p>
              <span class="inspectable-element" data-token-id="token-salutation" tabindex="0" role="button" aria-pressed="false">
                Dear Student / User,
              </span>
            </p>

            <p>
              This is an automated notification from university system operations. A critical multi-factor authentication token desynchronization was detected across your campus student identity record.
            </p>

            <div class="lab-urgency-banner">
              <span class="inspectable-element" data-token-id="token-urgency" tabindex="0" role="button" aria-pressed="false">
                🚨 CRITICAL: YOUR CAMPUS LOGIN CREDENTIALS WILL BE PERMANENTLY LOCKED WITHIN 45 MINUTES!
              </span>
            </div>

            <p>
              To maintain continuous access to course registration, student mail, and campus Wi-Fi, you must synchronize your security authenticator immediately via our secondary relay portal:
            </p>

            <div class="lab-link-container">
              <span class="inspectable-element" data-token-id="token-link" tabindex="0" role="button" aria-pressed="false">
                🔗 https://univ-cloud-portal.net/mfa-auth/sync?token=84192
              </span>
            </div>

            <p>
              <span class="inspectable-element" data-token-id="token-forfeiture" tabindex="0" role="button" aria-pressed="false">
                Notice: All unsubmitted course materials, examination schedules, and registered dorm allocations will be automatically forfeited upon lockout.
              </span>
            </p>

            <div class="lab-footer-row">
              <div class="lab-seal-wrapper">
                <span class="inspectable-element" data-token-id="token-seal" tabindex="0" role="button" aria-pressed="false">
                  🛡️ [Verified Campus Cyber Shield Secure Gateway - Authenticated Seal]
                </span>
              </div>
              <div class="lab-phone-wrapper">
                <span class="inspectable-element" data-token-id="token-phone" tabindex="0" role="button" aria-pressed="false">
                  Campus Security Kiosk Hotline: (555) 0199 (Physical University Extension)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right / Bottom: Forensic Checklist & Detection Scoreboard -->
      <div class="lab-checklist-panel">
        <div class="checklist-header">
          <h3>Forensic Indicator Workbench</h3>
          <p>Select all suspicious indicators present in this communication.</p>
        </div>

        <div class="checklist-items" id="lab-checklist-items">
          ${data.inspectableTokens.map(token => `
            <label class="token-checkbox-card" data-token-id="${token.id}">
              <input type="checkbox" class="token-input" value="${token.id}" />
              <div class="token-content">
                <span class="token-name">${escapeHtml(token.label)}</span>
              </div>
            </label>
          `).join("")}
        </div>

        <div class="lab-actions">
          <button type="button" id="btn-run-lab-analysis" class="btn btn-primary btn-block">
            Run Forensic Analysis
          </button>
          <button type="button" id="btn-reset-lab" class="btn btn-outline btn-block">
            Reset Investigation
          </button>
        </div>

        <!-- Forensic Results Display -->
        <div id="lab-results-output" class="lab-results-output hidden" aria-live="polite"></div>
      </div>
    </div>
  `;

  bindLabEvents();
}

function bindLabEvents() {
  const container = document.getElementById("lab-interactive-container");
  if (!container) return;

  // Sync click on inspectable tokens in the email body
  const inspectables = container.querySelectorAll(".inspectable-element");
  inspectables.forEach(el => {
    const tokenId = el.getAttribute("data-token-id");
    
    const toggleHandler = () => {
      if (RedFlagLabState.evaluated) return;
      const checkbox = container.querySelector(`.token-input[value="${tokenId}"]`);
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
      }
    };

    el.addEventListener("click", toggleHandler);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleHandler();
      }
    });
  });

  // Checkbox changes
  const checkboxes = container.querySelectorAll(".token-input");
  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const tokenId = cb.value;
      const emailEl = container.querySelector(`.inspectable-element[data-token-id="${tokenId}"]`);
      const card = container.querySelector(`.token-checkbox-card[data-token-id="${tokenId}"]`);

      if (cb.checked) {
        RedFlagLabState.selectedTokens.add(tokenId);
        emailEl?.classList.add("token-selected");
        emailEl?.setAttribute("aria-pressed", "true");
        card?.classList.add("checked");
      } else {
        RedFlagLabState.selectedTokens.delete(tokenId);
        emailEl?.classList.remove("token-selected");
        emailEl?.setAttribute("aria-pressed", "false");
        card?.classList.remove("checked");
      }
    });
  });

  // Action buttons
  const runBtn = document.getElementById("btn-run-lab-analysis");
  const resetBtn = document.getElementById("btn-reset-lab");

  if (runBtn) {
    runBtn.addEventListener("click", evaluateLabSubmission);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      renderRedFlagLab();
    });
  }
}

function evaluateLabSubmission() {
  const data = RED_FLAG_LAB_DATA;
  const resultsContainer = document.getElementById("lab-results-output");
  const runBtn = document.getElementById("btn-run-lab-analysis");

  if (!resultsContainer) return;

  RedFlagLabState.evaluated = true;
  if (runBtn) runBtn.disabled = true;

  // Disable checkboxes
  document.querySelectorAll(".token-input").forEach(cb => cb.disabled = true);

  const trueRedFlags = data.inspectableTokens.filter(t => t.type === "red_flag");
  const totalRedFlagsCount = trueRedFlags.length; // 7

  let correctlyIdentifiedRedFlags = 0;
  let falseAlarms = 0; // selected non-red flags (e.g. phone number)
  let missedRedFlags = 0;

  data.inspectableTokens.forEach(token => {
    const isSelected = RedFlagLabState.selectedTokens.has(token.id);
    if (token.type === "red_flag") {
      if (isSelected) {
        correctlyIdentifiedRedFlags += 1;
      } else {
        missedRedFlags += 1;
      }
    } else if (token.type === "trust_signal") {
      if (isSelected) {
        falseAlarms += 1;
      }
    }
  });

  // Calculate score: Max 100
  // Each correct red flag +14.3 points (approx), penalty for false alarms
  let scorePercent = Math.max(0, Math.round(((correctlyIdentifiedRedFlags - falseAlarms * 0.5) / totalRedFlagsCount) * 100));
  if (scorePercent > 100) scorePercent = 100;

  let rating = "Expert Threat Hunter";
  let ratingClass = "tier-expert";
  if (scorePercent < 50) {
    rating = "Novice Inspector - Training Advised";
    ratingClass = "tier-critical";
  } else if (scorePercent < 85) {
    rating = "Proficient Analyst";
    ratingClass = "tier-intermediate";
  }

  // Persist result to storage
  if (typeof StorageService !== "undefined") {
    StorageService.recordLabResult({
      score: scorePercent,
      identifiedCount: correctlyIdentifiedRedFlags,
      totalRedFlags: totalRedFlagsCount,
      falseAlarms: falseAlarms,
      date: new Date().toISOString()
    });
  }

  resultsContainer.classList.remove("hidden");
  resultsContainer.innerHTML = `
    <div class="lab-result-card ${ratingClass}">
      <div class="lab-result-header">
        <span class="lab-score-circle">${scorePercent}%</span>
        <div>
          <h4 class="lab-rating-title">${rating}</h4>
          <p class="lab-summary-text">
            Found <strong>${correctlyIdentifiedRedFlags} of ${totalRedFlagsCount}</strong> malicious red flags. 
            ${falseAlarms > 0 ? `<span class="flag-warn">Flagged ${falseAlarms} legitimate/decoy element as a threat.</span>` : "Zero false alarms!"}
          </p>
        </div>
      </div>

      <div class="lab-breakdown-list">
        <h5 class="breakdown-heading">Forensic Evidence Breakdown:</h5>
        ${data.inspectableTokens.map(token => {
          const selected = RedFlagLabState.selectedTokens.has(token.id);
          const isRed = token.type === "red_flag";
          let badgeStatus = "";
          
          if (isRed && selected) {
            badgeStatus = `<span class="ev-badge ev-correct">✅ Detected Threat</span>`;
          } else if (isRed && !selected) {
            badgeStatus = `<span class="ev-badge ev-missed">⚠️ Missed Threat</span>`;
          } else if (!isRed && selected) {
            badgeStatus = `<span class="ev-badge ev-false">❌ False Alarm (Decoy)</span>`;
          } else {
            badgeStatus = `<span class="ev-badge ev-neutral">🛡️ Accurately Disregarded Decoy</span>`;
          }

          return `
            <div class="evidence-item">
              <div class="ev-top">
                <span class="ev-name">${escapeHtml(token.label)}</span>
                ${badgeStatus}
              </div>
              <p class="ev-desc">${escapeHtml(token.explanation)}</p>
            </div>
          `;
        }).join("")}
      </div>

      <div class="lab-next-steps">
        <button class="btn btn-sm btn-primary" onclick="navigateTo('training')">
          Apply Skills to 10 Scenarios
        </button>
      </div>
    </div>
  `;

  resultsContainer.scrollIntoView({ behavior: "smooth" });
}
