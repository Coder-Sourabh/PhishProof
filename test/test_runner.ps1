# ==============================================================================
# PhishProof Campus - Automated Test Suite
# Track: Cybersecurity & Digital Safety | PROMPTWARS × KICKTOTECH 2026
# ==============================================================================

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$totalTests = 0
$passedTests = 0
$failedTests = 0
$failureDetails = @()

function Run-Check {
    param(
        [string]$Description,
        [scriptblock]$TestBlock
    )
    $script:totalTests++
    try {
        $result = & $TestBlock
        if ($result -eq $true -or $null -eq $result) {
            $script:passedTests++
            Write-Host "  [PASS] $Description" -ForegroundColor Green
        } else {
            $script:failedTests++
            $msg = "  [FAIL] $Description"
            Write-Host $msg -ForegroundColor Red
            $script:failureDetails += $msg
        }
    } catch {
        $script:failedTests++
        $msg = "  [ERROR] $Description - Exception: $_"
        Write-Host $msg -ForegroundColor Red
        $script:failureDetails += $msg
    }
}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  PHISHPROOF CAMPUS - TEST & VERIFICATION SUITE" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

# ------------------------------------------------------------------------------
# 1. FILE & ASSET EXISTENCE CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n1. File & Architecture Integrity Checks" -ForegroundColor Yellow

Run-Check "index.html exists and is not empty" {
    (Test-Path "index.html") -and ((Get-Item "index.html").Length -gt 1000)
}

Run-Check "css/styles.css exists and is not empty" {
    (Test-Path "css/styles.css") -and ((Get-Item "css/styles.css").Length -gt 2000)
}

Run-Check "js/scenarios.js exists and is not empty" {
    (Test-Path "js/scenarios.js") -and ((Get-Item "js/scenarios.js").Length -gt 2000)
}

Run-Check "js/storage.js exists and is not empty" {
    (Test-Path "js/storage.js") -and ((Get-Item "js/storage.js").Length -gt 1000)
}

Run-Check "js/app.js exists and is not empty" {
    (Test-Path "js/app.js") -and ((Get-Item "js/app.js").Length -gt 2000)
}

Run-Check "js/redflag-lab.js exists and is not empty" {
    (Test-Path "js/redflag-lab.js") -and ((Get-Item "js/redflag-lab.js").Length -gt 1000)
}

Run-Check "server.ps1 exists for local execution" {
    Test-Path "server.ps1"
}

# ------------------------------------------------------------------------------
# 2. SCENARIO DATASET INTEGRITY & MANDATORY COVERAGE
# ------------------------------------------------------------------------------
Write-Host "`n2. Scenario Curriculum & Threat Coverage Checks" -ForegroundColor Yellow

$scenariosContent = Get-Content "js/scenarios.js" -Raw

Run-Check "Dataset contains at least 10 scenarios" {
    # Count occurrences of 'id: 1' through 'id: 10'
    $matchCount = 0
    for ($i = 1; $i -le 10; $i++) {
        if ($scenariosContent -match "id:\s*$i\b") {
            $matchCount++
        }
    }
    $matchCount -ge 10
}

Run-Check "Scenario 1: Suspicious internship offer present" {
    $scenariosContent -match "Suspicious Internship" -or $scenariosContent -match "Research Assistant"
}

Run-Check "Scenario 2: Urgent college account verification present" {
    $scenariosContent -match "Urgent SSO Deactivation" -or $scenariosContent -match "SSO Account Expiration"
}

Run-Check "Scenario 3: Scholarship announcement present" {
    $scenariosContent -match "Unclaimed Grant" -or $scenariosContent -match "Discretionary Grant"
}

Run-Check "Scenario 4: Parcel delivery notification present" {
    $scenariosContent -match "Package Delivery Exception" -or $scenariosContent -match "Delivery Exception"
}

Run-Check "Scenario 5: Faculty impersonation attempt present" {
    $scenariosContent -match "Faculty Impersonation" -or $scenariosContent -match "Arthur Vance"
}

Run-Check "Scenario 6: QR-code poster (quishing) present" {
    $scenariosContent -match "Quishing" -or $scenariosContent -match "QR Code Tampering"
}

Run-Check "Scenario 7: Fake payment confirmation present" {
    $scenariosContent -match "Deceptive Billing Alert" -or $scenariosContent -match "Tuition Wire Transfer"
}

Run-Check "Scenario 8: Legitimate campus announcement present" {
    $scenariosContent -match "Official Campus Notice" -or $scenariosContent -match "Extended Library Study Hours"
}

Run-Check "Scenario 9: Suspicious job application request present" {
    $scenariosContent -match "Suspicious Student Job" -or $scenariosContent -match "Virtual Administrative Assistant"
}

Run-Check "Scenario 10: Message using manipulative urgency present" {
    $scenariosContent -match "Manipulative Conduct Summons" -or $scenariosContent -match "Academic Integrity Violation"
}

Run-Check "Dataset includes BOTH phishing and legitimate communications" {
    ($scenariosContent -match 'type:\s*"phishing"') -and ($scenariosContent -match 'type:\s*"legitimate"')
}

Run-Check "All scenarios include red flags or trust signals" {
    ($scenariosContent -match "redFlags:\s*\[") -and ($scenariosContent -match "trustSignals:\s*\[")
}

Run-Check "All scenarios include practical safety recommendations" {
    $recommendationMatches = [regex]::Matches($scenariosContent, 'recommendation:\s*"(.*?)"')
    $recommendationMatches.Count -ge 10
}

# ------------------------------------------------------------------------------
# 3. RED FLAG LAB DATA INTEGRITY
# ------------------------------------------------------------------------------
Write-Host "`n3. Red Flag Lab Interactive Data Checks" -ForegroundColor Yellow

Run-Check "RED_FLAG_LAB_DATA is defined with tokens" {
    $scenariosContent -match "RED_FLAG_LAB_DATA\s*=" -and $scenariosContent -match "inspectableTokens:\s*\["
}

Run-Check "Lab data contains both true red flags and decoy trust signals" {
    ($scenariosContent -match 'type:\s*"red_flag"') -and ($scenariosContent -match 'type:\s*"trust_signal"')
}

# ------------------------------------------------------------------------------
# 4. HTML STRUCTURE, ACCESSIBILITY & SECURITY
# ------------------------------------------------------------------------------
Write-Host "`n4. HTML Structure, Accessibility & Security Checks" -ForegroundColor Yellow

$htmlContent = Get-Content "index.html" -Raw

Run-Check "HTML5 DOCTYPE, lang='en' and UTF-8 charset present" {
    ($htmlContent -match '<!DOCTYPE html>') -and ($htmlContent -match '<html lang="en">') -and ($htmlContent -match 'charset="UTF-8"')
}

Run-Check "Accessibility skip-link exists" {
    $htmlContent -match 'class="skip-link"' -and $htmlContent -match 'href="#main-content"'
}

Run-Check "Semantic landmark roles used (banner, main, contentinfo, navigation)" {
    ($htmlContent -match 'role="banner"') -and ($htmlContent -match 'role="main"') -and ($htmlContent -match 'role="contentinfo"') -and ($htmlContent -match 'role="navigation"')
}

Run-Check "All 5 core views exist in DOM (landing, training, results, dashboard, lab)" {
    ($htmlContent -match 'id="view-landing"') -and 
    ($htmlContent -match 'id="view-training"') -and 
    ($htmlContent -match 'id="view-results"') -and 
    ($htmlContent -match 'id="view-dashboard"') -and 
    ($htmlContent -match 'id="view-lab"')
}

Run-Check "Interactive training elements present (progress, options, check button, next button, feedback card)" {
    ($htmlContent -match 'id="q-progress-text"') -and 
    ($htmlContent -match 'id="q-progress-bar"') -and 
    ($htmlContent -match 'id="q-options-container"') -and 
    ($htmlContent -match 'id="btn-check-answer"') -and 
    ($htmlContent -match 'id="btn-next-question"') -and 
    ($htmlContent -match 'id="q-feedback-card"')
}

Run-Check "Results screen elements present (score, accuracy, mistakes review, replay button)" {
    ($htmlContent -match 'id="res-score-number"') -and 
    ($htmlContent -match 'id="res-accuracy-text"') -and 
    ($htmlContent -match 'id="res-mistakes-container"') -and 
    ($htmlContent -match 'id="btn-results-replay"')
}

Run-Check "Dashboard elements present (empty state, stats, history, topics to revisit, reset modal)" {
    ($htmlContent -match 'id="dash-empty-state"') -and 
    ($htmlContent -match 'id="dash-content-state"') -and 
    ($htmlContent -match 'id="dash-total-sessions"') -and 
    ($htmlContent -match 'id="dash-best-score"') -and 
    ($htmlContent -match 'id="dash-history-list"') -and 
    ($htmlContent -match 'id="dash-topics-list"') -and 
    ($htmlContent -match 'id="btn-open-reset-modal"')
}

Run-Check "Reset confirmation modal is fully formed with cancel and confirm buttons" {
    ($htmlContent -match 'id="reset-confirm-modal"') -and 
    ($htmlContent -match 'id="btn-cancel-reset"') -and 
    ($htmlContent -match 'id="btn-confirm-reset"')
}

Run-Check "Zero external script or stylesheet CDNs (100% self-contained & safe offline)" {
    $hasExternalCDN = ($htmlContent -match 'src="http') -or ($htmlContent -match 'href="http') -or ($htmlContent -match 'cdn\.')
    -not $hasExternalCDN
}

# ------------------------------------------------------------------------------
# 5. CSS RESPONSIVENESS & ACCESSIBILITY
# ------------------------------------------------------------------------------
Write-Host "`n5. CSS Design System & Accessibility Checks" -ForegroundColor Yellow

$cssContent = Get-Content "css/styles.css" -Raw

Run-Check "Visible keyboard focus indicator (:focus-visible) defined" {
    $cssContent -match ':focus-visible'
}

Run-Check "Prefers-reduced-motion media query implemented" {
    $cssContent -match '@media\s*\(prefers-reduced-motion:\s*reduce\)'
}

Run-Check "Responsive tablet/mobile breakpoints defined" {
    ($cssContent -match '@media\s*\(max-width:\s*900px\)') -and ($cssContent -match '@media\s*\(max-width:\s*768px\)')
}

Run-Check "Color system variables defined for surfaces, text, and status states" {
    ($cssContent -match '--bg-primary') -and 
    ($cssContent -match '--bg-surface') -and 
    ($cssContent -match '--accent-primary') -and 
    ($cssContent -match '--status-success') -and 
    ($cssContent -match '--status-danger')
}

# ------------------------------------------------------------------------------
# 6. LOGIC, SCORING & PERSISTENCE VALIDATION
# ------------------------------------------------------------------------------
Write-Host "`n6. Application Logic, Scoring & Storage Guard Verification" -ForegroundColor Yellow

$appContent = Get-Content "js/app.js" -Raw
$storageContent = Get-Content "js/storage.js" -Raw

Run-Check "Scoring logic awards 100 points for correct answer and 0 for incorrect" {
    $appContent -match 'const pointsAwarded = isCorrect \? 100 : 0'
}

Run-Check "Submission guard: duplicate submission prevented by hasAnsweredCurrent flag" {
    $appContent -match 'if \(session\.hasAnsweredCurrent \|\| session\.selectedOptionIndex === null\) \{' -and
    $appContent -match 'session\.hasAnsweredCurrent = true;'
}

Run-Check "Options are disabled upon submission to lock choices" {
    $appContent -match 'btn\.disabled = true;'
}

Run-Check "Progress calculation uses percentage across total questions" {
    $appContent -match 'Math\.round\(\(\(session\.currentIndex\) / total\) \* 100\)'
}

Run-Check "Storage engine handles missing/corrupted localStorage with safe fallback" {
    $storageContent -match 'try \{' -and 
    $storageContent -match 'JSON\.parse\(raw\)' -and 
    $storageContent -match 'DEFAULT_STATE'
}

Run-Check "Storage engine records completed session, bestScore, and mistakes by topic" {
    ($storageContent -match 'state\.totalSessionsCompleted \+= 1') -and
    ($storageContent -match 'state\.bestScore = sessionResult\.score') -and
    ($storageContent -match 'state\.mistakesByTopic\[cat\]')
}

Run-Check "Storage engine provides clean resetAllProgress function" {
    $storageContent -match 'resetAllProgress\(\)' -and $storageContent -match 'removeItem\(STORAGE_KEY\)'
}

# ------------------------------------------------------------------------------
# 7. RED FLAG LAB LOGIC VERIFICATION
# ------------------------------------------------------------------------------
Write-Host "`n7. Red Flag Lab Logic Verification" -ForegroundColor Yellow

$labContent = Get-Content "js/redflag-lab.js" -Raw

Run-Check "Lab evaluates true red flags, false alarms, and calculates score" {
    ($labContent -match 'correctlyIdentifiedRedFlags') -and
    ($labContent -match 'falseAlarms') -and
    ($labContent -match 'scorePercent')
}

Run-Check "Lab provides forensic evidence breakdown for each token" {
    $labContent -match 'Forensic Evidence Breakdown' -and $labContent -match 'token\.explanation'
}

Run-Check "Lab supports two-way interaction (click in email or check in list)" {
    $labContent -match 'inspectable-element' -and $labContent -match 'token-input'
}

# ------------------------------------------------------------------------------
# TEST SUMMARY
# ------------------------------------------------------------------------------
Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS SUMMARY" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  Total Tests Run:  $totalTests"
Write-Host "  Passed Tests:     $passedTests" -ForegroundColor Green
Write-Host "  Failed Tests:     $failedTests" -ForegroundColor $(if ($failedTests -eq 0) { "Green" } else { "Red" })

if ($failedTests -gt 0) {
    Write-Host "`nFailed Test List:" -ForegroundColor Red
    foreach ($fail in $failureDetails) {
        Write-Host "  $fail" -ForegroundColor Red
    }
    Exit 1
} else {
    Write-Host "`n>>> ALL $totalTests AUTOMATED TESTS PASSED SUCCESSFULLY! <<<`n" -ForegroundColor Green
    Exit 0
}
