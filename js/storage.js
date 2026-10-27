/**
 * PhishProof Campus - Safe Local Storage & Analytics Engine
 * Track: Cybersecurity & Digital Safety
 * 
 * Safely persists training history, sessions, accuracy, and topic analytics.
 * Robust against quota errors, corrupted JSON, missing keys, and schema changes.
 */

const STORAGE_KEY = "phishproof_campus_v1";

const DEFAULT_STATE = {
  version: 1,
  totalSessionsCompleted: 0,
  bestScore: 0,
  latestSessionDate: null,
  history: [],
  categoryStats: {},
  // Topic mistakes map: { [categoryName]: { totalEncountered: 0, incorrectCount: 0 } }
  mistakesByTopic: {},
  redFlagLabCompleted: false,
  redFlagLabScore: null,
  createdAt: new Date().toISOString()
};

const StorageService = {
  /**
   * Load current state from localStorage with full error fallback.
   */
  loadState() {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return { ...DEFAULT_STATE };
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_STATE };
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        console.warn("[PhishProof] Malformed storage found, initializing clean state.");
        return { ...DEFAULT_STATE };
      }

      // Merge defaults to handle missing or schema-migrated properties
      return {
        ...DEFAULT_STATE,
        ...parsed,
        history: Array.isArray(parsed.history) ? parsed.history : [],
        categoryStats: parsed.categoryStats && typeof parsed.categoryStats === "object" ? parsed.categoryStats : {},
        mistakesByTopic: parsed.mistakesByTopic && typeof parsed.mistakesByTopic === "object" ? parsed.mistakesByTopic : {}
      };
    } catch (err) {
      console.error("[PhishProof] Error loading state from localStorage:", err);
      return { ...DEFAULT_STATE };
    }
  },

  /**
   * Save state safely to localStorage.
   */
  saveState(state) {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(STORAGE_KEY, serialized);
      return true;
    } catch (err) {
      console.error("[PhishProof] Failed to persist state to localStorage:", err);
      return false;
    }
  },

  /**
   * Record a completed training session.
   * @param {Object} sessionResult - { score, totalQuestions, correctCount, answers: [...], timestamp }
   */
  recordSession(sessionResult) {
    const state = this.loadState();
    state.totalSessionsCompleted += 1;
    
    if (sessionResult.score > state.bestScore) {
      state.bestScore = sessionResult.score;
    }
    state.latestSessionDate = sessionResult.timestamp || new Date().toISOString();

    // Append to history (keep latest 20 sessions to prevent unbounded growth)
    const historyEntry = {
      id: "sess_" + Date.now(),
      date: state.latestSessionDate,
      score: sessionResult.score,
      totalQuestions: sessionResult.totalQuestions,
      correctCount: sessionResult.correctCount,
      accuracy: Math.round((sessionResult.correctCount / sessionResult.totalQuestions) * 100),
      incorrectScenarioIds: sessionResult.answers
        .filter(a => !a.isCorrect)
        .map(a => a.scenarioId)
    };
    state.history.unshift(historyEntry);
    if (state.history.length > 20) {
      state.history = state.history.slice(0, 20);
    }

    // Update topic stats & mistakes tracking
    if (Array.isArray(sessionResult.answers)) {
      sessionResult.answers.forEach(answer => {
        const cat = answer.category || "General";
        if (!state.mistakesByTopic[cat]) {
          state.mistakesByTopic[cat] = { totalEncountered: 0, incorrectCount: 0 };
        }
        state.mistakesByTopic[cat].totalEncountered += 1;
        if (!answer.isCorrect) {
          state.mistakesByTopic[cat].incorrectCount += 1;
        }
      });
    }

    this.saveState(state);
    return state;
  },

  /**
   * Record completion of the Red Flag Lab.
   */
  recordLabResult(result) {
    const state = this.loadState();
    state.redFlagLabCompleted = true;
    state.redFlagLabScore = result;
    this.saveState(state);
    return state;
  },

  /**
   * Reset all user progress.
   */
  resetAllProgress() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      return { ...DEFAULT_STATE };
    } catch (err) {
      console.error("[PhishProof] Failed to reset localStorage:", err);
      return { ...DEFAULT_STATE };
    }
  }
};
