/**
 * PhishProof Campus - Scenarios & Educational Dataset
 * Track: Cybersecurity & Digital Safety
 * Tagline: Think Before You Click.
 * 
 * All scenarios, domains, senders, and references are fictional and safe.
 * URLs are strictly simulated non-clickable text for educational evaluation.
 */

const SCENARIOS = [
  {
    id: 1,
    category: "Career & Employment",
    type: "phishing",
    difficulty: "Medium",
    badge: "Suspicious Internship",
    senderName: "Dr. Alistair Finch (Faculty Research)",
    senderEmail: "finch.research.dept@gmail-facultydesk.net",
    recipient: "student@campus.state.edu",
    date: "Today at 09:14 AM",
    subject: "URGENT: Research Assistant Position Opening - Immediate Start ($35/hr)",
    messageBody: `Dear Student,

I reviewed the university honors directory and selected your profile for an urgent Remote Research Assistant role in our Computational Systems Lab. 

Compensation is $35.00 per hour with 10 flexible hours weekly. Due to departmental deadlines, we cannot conduct interviews through Handshake. Please contact my hiring coordinator via Telegram immediately at @DrFinchResearch to confirm your spot.

We will courier an advance check of $1,850 to your home address to purchase specialized software licenses and office supplies before your start date.

Best regards,
Dr. Alistair Finch
Department of Computer & Applied Sciences`,
    simulatedLink: "telegram.me/DrFinchResearch",
    choices: [
      {
        text: "Legitimate faculty offer: Reply directly with your class schedule to lock in the high-paying role.",
        isCorrect: false,
        reason: "Professors do not recruit students via external Gmail domains or off-platform Telegram chats."
      },
      {
        text: "Employment & fake-check scam: Report via campus IT or Career Services; do not contact.",
        isCorrect: true,
        reason: "Classic advance-fee job scam featuring an external lookalike domain, Telegram recruitment, and a fraudulent equipment check."
      },
      {
        text: "Harmless campus bulletin: Forward to classmates who might need an on-campus job.",
        isCorrect: false,
        reason: "Forwarding malicious scams exposes your peers to financial identity theft."
      },
      {
        text: "Standard university recruitment: Complete the interview on Telegram to evaluate the contract.",
        isCorrect: false,
        reason: "Official university employment never takes place on encrypted personal messaging apps like Telegram."
      }
    ],
    redFlags: [
      "Lookalike sender domain (@gmail-facultydesk.net instead of @campus.state.edu)",
      "Bypassing official campus hiring channels (Handshake / Student Employment Office)",
      "Recruitment shifted to personal messaging app (Telegram)",
      "Unrealistically high wage for an unsolicited student position ($35/hr)",
      "Advance-check scheme for equipment purchases (classic check-overpayment fraud)"
    ],
    trustSignals: [],
    explanation: "This is a rampant student-targeted employment scam. Scammers impersonate recognized faculty using lookalike domains, lure students onto unmonitored messaging apps, and send counterfeit checks. When the student deposits the check and wires funds to the 'software vendor', the original check bounces days later, leaving the student legally liable for the lost funds.",
    recommendation: "Always verify on-campus student employment through official portals such as Handshake or by contacting the department chair using the verified university telephone directory."
  },
  {
    id: 2,
    category: "Account Security & Credentials",
    type: "phishing",
    difficulty: "High",
    badge: "Urgent SSO Deactivation",
    senderName: "Campus Identity & Access Team",
    senderEmail: "helpdesk@campus-sso-verify.net",
    recipient: "student@campus.state.edu",
    date: "Today at 11:22 AM",
    subject: "FINAL NOTICE: University SSO Account Expiration within 2 Hours",
    messageBody: `ATTENTION CAMPUS USER:

Our directory synchronization server encountered an authentication database error affecting active student accounts. 

Your Single Sign-On (SSO) credentials, Canvas access, and campus Wi-Fi privileges are scheduled for immediate termination in:
[ 01 HR : 58 MIN : 34 SEC ]

To prevent permanent account deletion and forfeiture of active course enrollment, verify your university credentials immediately through our secure validation portal:

Simulated Destination: https://campus-sso-verify.net/auth/portal-update

Failure to authenticate will require an in-person clearance and a $50 reinstatement fee.

Campus Information Technology Services
Security Operations Center (SOC)`,
    simulatedLink: "https://campus-sso-verify.net/auth/portal-update",
    choices: [
      {
        text: "Follow the urgent link immediately to ensure Canvas and course submissions remain accessible.",
        isCorrect: false,
        reason: "Clicking the link and providing credentials gives attackers full access to your student account."
      },
      {
        text: "Credential phishing attack: Do not click; verify account status directly on the official portal.",
        isCorrect: true,
        reason: "Uses artificial panic, an external spoofed domain (.net), and threats of deactivation to harvest passwords."
      },
      {
        text: "Reply with your student ID number and password so the IT helpdesk can manually sync your profile.",
        isCorrect: false,
        reason: "Never transmit passwords over email. University IT will never ask for your password."
      },
      {
        text: "Forward the email to your instructors so they know why your Canvas access might be interrupted.",
        isCorrect: false,
        reason: "The threat is completely fabricated; contacting instructors distracts from reporting the threat to IT."
      }
    ],
    redFlags: [
      "Spoofed external domain (campus-sso-verify.net instead of .edu)",
      "High-pressure artificial countdown timer (2 hours)",
      "Severe penalty threat (permanent account deletion, course forfeiture, reinstatement fee)",
      "Direct request to authenticate credentials via an unsolicited email link"
    ],
    trustSignals: [],
    explanation: "This attack exploits student anxiety surrounding midterms and assignment deadlines. Attackers create realistic replicas of university login screens on deceptive domains (like .net or .org). Once you enter your username, password, and two-factor code, the attacker takes over your account to route financial aid or launch further attacks.",
    recommendation: "Never log into university systems through email links. Navigate independently to your campus portal via your saved browser bookmark or the official institutional home page."
  },
  {
    id: 3,
    category: "Financial & Scholarships",
    type: "phishing",
    difficulty: "Medium",
    badge: "Unclaimed Grant Notice",
    senderName: "Provost Merit Honors Council",
    senderEmail: "endowments@merit-scholarships-portal.org",
    recipient: "student@campus.state.edu",
    date: "Yesterday at 04:45 PM",
    subject: "Award Notification: Unclaimed $2,500 Chancellor's Discretionary Grant",
    messageBody: `Office of the Provost & Financial Aid Distribution

Dear Student,

We are pleased to inform you that you were selected by our scholarship review committee to receive an unclaimed Chancellor's Discretionary Merit Grant in the amount of $2,500.00 for the current academic term.

No essay or GPA verification is required. 

To disburse these funds directly into your student account via ACH direct deposit, federal regulations require payment of a one-time refundable administrative processing voucher of $45.00 via digital gift card or secure wire escrow within 24 hours.

Visit: https://merit-scholarships-portal.org/disburse/grant-2500

Congratulations on your academic distinction!

Office of Financial Assistance`,
    simulatedLink: "https://merit-scholarships-portal.org/disburse/grant-2500",
    choices: [
      {
        text: "Advance-fee scholarship scam: Genuine scholarships never charge a fee to release award funds.",
        isCorrect: true,
        reason: "Legitimate scholarships credit student accounts directly without demanding upfront payment vouchers or gift cards."
      },
      {
        text: "Legitimate grant: Pay the $45 processing fee quickly to claim the $2,500 benefit.",
        isCorrect: false,
        reason: "Paying the fee results in loss of your money; no grant funds will ever be delivered."
      },
      {
        text: "Campus tax withholding: Wire your bank account details for ACH compliance.",
        isCorrect: false,
        reason: "Wiring banking information directly to an unverified portal exposes your account to unauthorized withdrawals."
      },
      {
        text: "Incomplete application: Reply asking if they accept university meal points for the fee.",
        isCorrect: false,
        reason: "Engaging with scammers confirms your email is active and invites further targeted attacks."
      }
    ],
    redFlags: [
      "Advance-fee requirement ($45 upfront to receive $2,500)",
      "Unconventional payment methods requested (gift card / wire escrow)",
      "External non-university domain (merit-scholarships-portal.org)",
      "Suspiciously frictionless award ('No essay or GPA verification required')"
    ],
    trustSignals: [],
    explanation: "This is a classic advance-fee fraud tailored for college students burdened by tuition costs. Real academic grants and scholarships are applied directly to your university student ledger or disbursed through the verified Financial Aid Office—never through external websites requiring upfront payments.",
    recommendation: "Remember the golden rule of student finance: You never have to pay money to receive legitimate scholarship or financial aid funds."
  },
  {
    id: 4,
    category: "Physical & Mail Services",
    type: "phishing",
    difficulty: "Low",
    badge: "Package Delivery Exception",
    senderName: "Campus Central Receiving Hub",
    senderEmail: "parcels@campus-mail-alerts.info",
    recipient: "student@campus.state.edu",
    date: "Today at 08:05 AM",
    subject: "Package Notice: Delivery Exception for Parcel #NX-9941-US",
    messageBody: `Campus Mailroom & Parcel Center

Notice of Delivery Failure:
A priority parcel designated for student residence delivery could not be processed due to an unreadable suite/dorm number on the postal manifest.

Tracking Identifier: #NX-9941-US
Status: Retained at Central Sorting Facility
Outstanding Surcharge: $2.95 Redelivery Handling Fee

To confirm your dormitory address and authorize delivery re-dispatch, update your details and settle the handling fee within 12 hours:

Link: http://campus-mail-alerts.info/track/NX-9941

Parcels not cleared within 24 hours will be returned to origin or destroyed.`,
    simulatedLink: "http://campus-mail-alerts.info/track/NX-9941",
    choices: [
      {
        text: "Click the tracking link and pay the $2.95 fee to avoid package destruction.",
        isCorrect: false,
        reason: "The low dollar amount is a psychological lure to steal your full credit card number and CVV."
      },
      {
        text: "Smishing/phishing delivery lure designed to harvest debit or credit card details.",
        isCorrect: true,
        reason: "Uses vague package details, an external .info domain, and a low fee trap to steal banking credentials."
      },
      {
        text: "Reply with your dorm room key number so the courier can leave it inside your room.",
        isCorrect: false,
        reason: "Never share room access codes or keys with unverified correspondents."
      },
      {
        text: "Legitimate notification: Campus mailrooms routinely charge small redelivery fees.",
        isCorrect: false,
        reason: "Campus mail centers do not charge third-party credit card fees via web links for student mail."
      }
    ],
    redFlags: [
      "Unfamiliar generic domain (campus-mail-alerts.info)",
      "Unspecified parcel contents and missing merchant information",
      "Micro-transaction trap ($2.95 fee used to collect credit card number, CVV, and billing address)",
      "Artificial urgency (threat of package destruction within 24 hours)"
    ],
    trustSignals: [],
    explanation: "Package delivery scams are among the most frequent threats targeting students who shop online. The attacker doesn't care about the $2.95 fee; the goal is to capture your 16-digit card number, expiration date, security code, and billing zip code for unauthorized fraudulent purchases.",
    recommendation: "If you are expecting a package, check your tracking number on the merchant's official website or visit your residence hall mail desk in person with your student ID."
  },
  {
    id: 5,
    category: "Impersonation & Social Engineering",
    type: "phishing",
    difficulty: "Medium",
    badge: "Faculty Impersonation",
    senderName: "Prof. Arthur Vance",
    senderEmail: "prof.arthurvance.dept@gmail.com",
    recipient: "student@campus.state.edu",
    date: "Today at 01:15 PM",
    subject: "Quick favor: Are you on campus right now?",
    messageBody: `Hi,

Are you currently near the campus bookstore or anywhere close to a supermarket? 

I am in an emergency faculty senate meeting that is running way behind schedule, and my cell phone battery is dying. I need a quick favor for our visiting guest lecturers before our 3:30 PM seminar.

Could you pick up three $100 Apple or Steam gift cards for the presenters? Scratch the silver strip on the back and send me crisp photos of the PIN codes right away. 

I will pay you back in cash plus a $50 stipend as soon as the meeting adjourns this afternoon. Please treat this as urgent and confidential.

Best,
Prof. Arthur Vance
Department of Historical Studies`,
    simulatedLink: "None (Direct reply requested)",
    choices: [
      {
        text: "Comply immediately to help your professor and earn a positive recommendation.",
        isCorrect: false,
        reason: "You will lose $300 of your own money; the real professor knows nothing about this request."
      },
      {
        text: "Faculty gift-card impersonation scam: Report immediately to IT security.",
        isCorrect: true,
        reason: "Uses an external personal Gmail account, claims an emergency prevents calls, and asks for untraceable gift card codes."
      },
      {
        text: "Ask the professor if Google Play cards are acceptable instead of Apple cards.",
        isCorrect: false,
        reason: "Engaging in dialogue still leads to financial exploitation."
      },
      {
        text: "Forward the request to your department chair to approve the expense reimbursement first.",
        isCorrect: false,
        reason: "While cautious, the safest protocol is reporting the phishing email directly to campus security."
      }
    ],
    redFlags: [
      "Sender uses a personal commercial email (@gmail.com) instead of the official university address (@campus.state.edu)",
      "Fabricated barrier preventing direct verbal communication ('in a meeting, battery dying')",
      "Request for untraceable payment media (gift cards with scratched PINs)",
      "Pressure for secrecy ('confidential') and rapid turnaround ('before 3:30 PM')"
    ],
    trustSignals: [],
    explanation: "Faculty impersonation scams exploit student respect for authority. Scammers scrape faculty rosters and student directories from public department websites, create free Gmail accounts with the professor's name, and concoct urgent scenarios where gift cards are needed immediately.",
    recommendation: "No university administrator, faculty member, or supervisor will ever ask students to purchase gift cards on their behalf. Always verify unusual requests in person or through published campus phone numbers."
  },
  {
    id: 6,
    category: "Physical Security & Quishing",
    type: "phishing",
    difficulty: "High",
    badge: "QR Code Tampering (Quishing)",
    senderName: "Physical Poster in Campus Library Stairwell",
    senderEmail: "promo-desk@library-rewards.net (Decoded QR Payload)",
    recipient: "Public Campus Foot Traffic",
    date: "Spotted this morning",
    subject: "PHYSICAL POSTER: 'SCAN FOR FREE $15 COFFEE & SNACK VOUCHER — FIRST 50 STUDENTS'",
    messageBody: `[VISUAL CONTEXT: A printed promotional flyer taped near the University Library entrance]

HEADLINE: "Welcome Week Perks! Fuel Your Finals with Free Coffee."
IMAGE: University mascot holding an espresso mug with official university colors.
ACTION: "Scan the QR code below to connect your campus digital ID and unlock an instant $15 coffee balance at the campus bistro!"

PHYSICAL INSPECTION NOTE: 
Looking closely at the flyer, a glossy vinyl sticker containing a replacement QR code has been carefully placed over the original printed paper QR code.

When scanned with a camera preview:
Decoded URL: https://lib-cafe-rewards.campus-card-promo.xyz/auth/student-login`,
    simulatedLink: "https://lib-cafe-rewards.campus-card-promo.xyz/auth/student-login",
    choices: [
      {
        text: "Legitimate welcome week promotion: Scan the QR code and log in to claim the $15 voucher.",
        isCorrect: false,
        reason: "Scanning the tampered sticker redirects to a credential harvester designed to steal student passwords."
      },
      {
        text: "Physical Quishing (QR code phishing) attack using a fraudulent sticker overlay.",
        isCorrect: true,
        reason: "A replacement sticker over physical signage and an external .xyz domain indicates credential harvesting."
      },
      {
        text: "Standard library digital menu update: Share the link in student group chats.",
        isCorrect: false,
        reason: "Spreading the malicious QR destination endangers other students."
      },
      {
        text: "Benign technical glitch: The library simply reprinted the QR code for higher contrast.",
        isCorrect: false,
        reason: "Legitimate university departments reprint posters rather than pasting external .xyz stickers."
      }
    ],
    redFlags: [
      "Physical sticker pasted over original printed poster signage",
      "Decoded destination points to an unverified top-level domain (.xyz)",
      "Enticing free incentive with artificial scarcity ('first 50 students')",
      "Prompts for university single sign-on authentication outside campus infrastructure"
    ],
    trustSignals: [
      "Poster uses familiar campus mascot imagery (often copied from public website)"
    ],
    explanation: "'Quishing' (QR code phishing) is increasingly common in campus settings because QR codes conceal the true destination URL from human visual inspection. Attackers print adhesive labels and stick them over legitimate posters on library noticeboards, parking meters, or dining hall tables.",
    recommendation: "Always inspect physical QR codes for stickers or tampering. Use a QR scanner app that displays the full URL before opening, and never enter institutional passwords on pages reached via public QR stickers."
  },
  {
    id: 7,
    category: "Financial & Student Accounts",
    type: "phishing",
    difficulty: "Medium",
    badge: "Deceptive Billing Alert",
    senderName: "Bursar Student Accounts Notification",
    senderEmail: "billing@bursar-notification-support.org",
    recipient: "student@campus.state.edu",
    date: "Today at 02:40 PM",
    subject: "Receipt: Tuition Wire Transfer of $4,820.00 Processed Successfully",
    messageBody: `OFFICE OF THE BURSAR - PAYMENT CONFIRMATION

Reference Number: TXN-2026-990812
Date: Current Session
Amount Debited: $4,820.00 USD
Payment Method: International Automated Wire Clearing
Destination: Global Educational Holdings Escrow Ltd.

Status: COMPLETED

If you authorized this transaction, no further action is required. Your updated tuition balance will reflect within 48 business hours.

UNAUTHORIZED TRANSACTION WARNING:
If you did NOT authorize this payment, our Fraud Protection Unit requires an immediate dispute filing within 30 minutes to recall the wire transfer:

Simulated Dispute Desk: https://dispute-desk.bursar-notification-support.org/cancel?ref=990812

Failure to cancel within 30 minutes renders this transfer final and non-reversible.`,
    simulatedLink: "https://dispute-desk.bursar-notification-support.org/cancel?ref=990812",
    choices: [
      {
        text: "Click the dispute link immediately to prevent the unauthorized transfer of $4,820.",
        isCorrect: false,
        reason: "Clicking the dispute link walks you right into a fake portal designed to collect banking or credit credentials."
      },
      {
        text: "Panic-inducing phishing lure: Independently check your student account via the official portal.",
        isCorrect: true,
        reason: "Fake transaction alerts shock users into clicking malicious dispute links without verifying authenticity."
      },
      {
        text: "Call the customer support number in the email footer without checking the campus directory.",
        isCorrect: false,
        reason: "Phone numbers inside phishing emails connect directly to the scammers running the operation."
      },
      {
        text: "Email your bank account routing numbers to prove the wire was not yours.",
        isCorrect: false,
        reason: "Providing account numbers voluntarily facilitates direct financial fraud."
      }
    ],
    redFlags: [
      "Psychological shock tactic (high dollar amount unauthorized debit)",
      "Unrealistic 30-minute deadline to cancel an alleged wire transfer",
      "Sender domain is bursar-notification-support.org (not .edu)",
      "High urgency push to click an external dispute link"
    ],
    trustSignals: [],
    explanation: "This is a 'reverse psychology' payment scare. Scammers know that telling someone they lost $4,820 triggers intense panic. The victim rushes to click the 'Dispute' or 'Cancel' link, where a fraudulent form asks for debit card numbers, online banking usernames, or Social Security numbers to 'verify their identity'.",
    recommendation: "When you receive unexpected financial panic alerts, pause and breathe. Close the email, open a new browser tab, and log directly into your official university Bursar portal using your known bookmark to check your true balance."
  },
  {
    id: 8,
    category: "Campus Communications",
    type: "legitimate",
    difficulty: "Medium",
    badge: "Official Campus Notice",
    senderName: "Office of the Dean of Academic Services",
    senderEmail: "dean-academics@state.campus.edu",
    recipient: "all-students@state.campus.edu",
    date: "Yesterday at 10:00 AM",
    subject: "Fall Semester 2026: Extended Library Study Hours & Wellness Resources",
    messageBody: `Dear Campus Community,

As we prepare for the upcoming midterm examination period, we want to share important updates regarding academic support and campus facility hours.

1. 24/7 Quiet Study Access:
Starting next Monday, the William Vance Memorial Library will extend main floor operating hours to 24 hours daily. Campus security escort services are available at all times by dialing 555-0199 or visiting the security kiosk.

2. Academic Tutoring & Mental Health Resources:
Free peer tutoring schedules and confidential wellness appointments can be scheduled anytime through the standard Student Wellness tile in your official university portal.

To view full event schedules, log into your student dashboard at student.state.campus.edu using your standard campus credentials. We never require secondary passwords or fees for campus facilities.

Wishing you a productive and healthy midterm season.

Sincerely,
Dr. Eleanor Campbell
Dean of Academic Services
State University`,
    simulatedLink: "student.state.campus.edu (Verified Official Domain)",
    choices: [
      {
        text: "Phishing attack: The email mentions examinations and requires immediate reporting to IT.",
        isCorrect: false,
        reason: "Legitimate announcements discussing exams or services are normal university business."
      },
      {
        text: "Legitimate university announcement: Official sender domain, no coercive urgency, uses standard portal.",
        isCorrect: true,
        reason: "Originates from authentic @state.campus.edu domain, instructs users to use existing portal bookmarks, and requests no credentials."
      },
      {
        text: "Suspicious impersonation: Any message addressed to 'all-students' is automated malware.",
        isCorrect: false,
        reason: "Official university administrative broadcasts frequently use campus-wide distribution lists."
      },
      {
        text: "Spam message: Unsubscribe to prevent administrative updates from reaching your inbox.",
        isCorrect: false,
        reason: "Unsubscribing from legitimate institutional notices can cause you to miss critical safety and academic updates."
      }
    ],
    redFlags: [],
    trustSignals: [
      "Authentic institutional domain (@state.campus.edu)",
      "No artificial urgency, countdowns, or threats of punishment",
      "Directs students to navigate independently to their existing student portal",
      "Explicitly affirms: 'We never require secondary passwords or fees for campus facilities'",
      "Provides verified campus security telephone contact for physical safety"
    ],
    explanation: "Not every broadcast email is phishing! A key objective in digital safety is distinguishing legitimate communications from scams. This message has verified institutional headers, provides clear informational content, requires no sudden credential entry, and directs users to log in through their existing official bookmark.",
    recommendation: "Recognizing legitimate communications prevents security alert fatigue. When an email provides instructions without pressuring you or asking for sensitive credentials, it exhibits healthy trust signals."
  },
  {
    id: 9,
    category: "Identity Theft & Recruitment",
    type: "phishing",
    difficulty: "High",
    badge: "Suspicious Student Job",
    senderName: "Apex Logistics Student Careers",
    senderEmail: "hr-studentcareers@apexlogistic-careers.net",
    recipient: "student@campus.state.edu",
    date: "Today at 10:18 AM",
    subject: "Employment Offer: Virtual Administrative Assistant - Immediate Onboarding",
    messageBody: `Dear Candidate,

Congratulations! Based on your profile in the regional collegiate talent database, our talent acquisition committee has selected you for the position of Virtual Administrative Assistant at Apex Logistics.

Role Details:
- Compensation: $28.50 per hour
- Commitment: 8-12 hours per week, flexible schedule around your classes
- Duties: Digital filing, calendar scheduling, and data entry

To complete your pre-employment verification and ensure your first payroll run is activated before Monday, reply directly to this email with high-resolution photos of:
1. The front and back of your Government-Issued Photo ID (Driver's License or Passport)
2. Your official Social Security Card (or National Identity Card)
3. A voided personal check or direct deposit authorization form showing account and routing numbers

Welcome aboard,
Human Resources Onboarding Desk
Apex Logistics Services`,
    simulatedLink: "None (Direct reply with identity documents requested)",
    choices: [
      {
        text: "Send the photos of your ID and SSN right away to secure the $28.50/hr job before Monday.",
        isCorrect: false,
        reason: "Sending photos of your ID and SSN via unencrypted email hands scammers everything needed for identity theft."
      },
      {
        text: "Identity theft scam: Legitimate employers never collect SSNs and ID photos via plain email.",
        isCorrect: true,
        reason: "Unsolicited job offer requesting high-risk identity documents (SSN, passport, bank details) via unencrypted email."
      },
      {
        text: "Send only the Social Security card photo but omit the bank account details.",
        isCorrect: false,
        reason: "Your Social Security number alone can be used to open fraudulent credit cards and file false tax returns."
      },
      {
        text: "Legitimate remote HR practice: All virtual jobs require emailed ID photos for federal I-9 compliance.",
        isCorrect: false,
        reason: "Federal I-9 and HR onboarding is completed through encrypted, authenticated HR portals (like Workday) after formal interview."
      }
    ],
    redFlags: [
      "Job offered without any application, interview, or portfolio review",
      "Direct request for sensitive identity documents (SSN, Driver's License, voided check) via plain email",
      "Generic corporate domain (apexlogistic-careers.net) registered recently",
      "Arbitrary urgency deadline ('before Monday') to rush compliance"
    ],
    trustSignals: [],
    explanation: "Identity theft scams aimed at college students often disguise themselves as remote administrative jobs. By tricking you into emailing photos of your Social Security card, driver's license, and bank account, criminals obtain everything required to open fraudulent credit lines, take out loans, or file bogus tax returns in your name.",
    recommendation: "Never transmit photos of your Social Security card or passport over email. Legitimate employers conduct formal interviews and process tax documents through enterprise HR systems after you receive an official written offer."
  },
  {
    id: 10,
    category: "Coercion & Intimidation",
    type: "phishing",
    difficulty: "High",
    badge: "Manipulative Conduct Summons",
    senderName: "Office of Student Conduct & Academic Integrity",
    senderEmail: "disciplinary@campus-conduct-hearing.org",
    recipient: "student@campus.state.edu",
    date: "Today at 03:02 PM",
    subject: "MANDATORY SUMMONS: Academic Integrity Violation Case #INV-2026-88",
    messageBody: `OFFICE OF STUDENT CONDUCT AND ACADEMIC INTEGRITY

CASE FILE REFERENCE: #INV-2026-88
CHARGE: Unauthorized Collaboration & Unapproved AI Model Usage during Midterm Examination

You have been formally named as a respondent in an academic integrity violation complaint submitted by an examination proctor.

An emergency preliminary judicial hearing has been scheduled for TODAY at 4:30 PM via virtual tribunal.

To review the evidence packet, examine proctor witness statements, and register your plea, access the confidential disciplinary portal:

Simulated Link: https://campus-conduct-hearing.org/docket?id=88

MANDATORY ATTENDANCE WARNING:
Failure to log into the judicial portal before 4:15 PM will be entered into the university record as a default admission of guilt, resulting in an automatic course grade of 'F' and immediate suspension from State University.`,
    simulatedLink: "https://campus-conduct-hearing.org/docket?id=88",
    choices: [
      {
        text: "Manipulative coercion phishing: Uses fear of suspension and tight timelines to force credential entry.",
        isCorrect: true,
        reason: "Fabricates an extreme academic threat, short timeline (1 hour), and fake domain (.org) to panic students into submitting logins."
      },
      {
        text: "Official disciplinary summons: Log in immediately to review the evidence and defend yourself.",
        isCorrect: false,
        reason: "Logging into the fake portal delivers your credentials straight to the cyber attacker."
      },
      {
        text: "Reply with an apology email admitting to accidental AI usage so they cancel the hearing.",
        isCorrect: false,
        reason: "Admitting to a crime you didn't commit based on a fake email damages your academic standing."
      },
      {
        text: "Ignore all future university communications regarding academic standing.",
        isCorrect: false,
        reason: "Ignoring genuine campus notices can be dangerous; instead verify through official university conduct offices."
      }
    ],
    redFlags: [
      "Extreme emotional intimidation (threat of immediate suspension and automatic 'F')",
      "Severe artificial urgency (1 hour notice for a judicial hearing)",
      "Unfamiliar external domain (campus-conduct-hearing.org instead of university .edu)",
      "Violation of formal due process (universities provide written certified notice with several days to prepare)"
    ],
    trustSignals: [],
    explanation: "This attack weaponizes institutional fear. Threatening academic suspension and cheating allegations pushes students into acute panic, blinding them to red flags. Scammers rely on panic because fear short-circuits critical thinking.",
    recommendation: "Universities have strict due process policies. Disciplinary summons are never issued via third-party websites with one-hour ultimatums. If you receive an alarming conduct email, call the Dean of Students or your faculty advisor directly to verify."
  }
];

// Interactive Red Flag Lab Dataset (Bonus Investigative Workbench)
const RED_FLAG_LAB_DATA = {
  scenarioTitle: "Forensic Investigation: Multi-Factor Authentication Phish",
  scenarioSubtitle: "Inspect the suspicious campus message below. Click on suspicious elements directly inside the message or check them off in your forensic workbench.",
  senderName: "Campus IT Support Desk",
  senderEmail: "it-support@univ-cloud-portal.net",
  replyTo: "collector-relay@stealth-mail.ru",
  recipient: "student@campus.state.edu",
  subject: "URGENT: MFA Token Desynchronization - 45 Minutes to Lockout",
  date: "Today at 02:15 PM",
  inspectableTokens: [
    {
      id: "token-sender",
      label: "Sender Domain (@univ-cloud-portal.net)",
      type: "red_flag",
      selector: "[data-inspect='sender']",
      explanation: "Lookalike domain: The email claims to be campus IT but uses a third-party .net domain rather than the university's authentic .edu domain."
    },
    {
      id: "token-replyto",
      label: "Mismatched Reply-To Address (@stealth-mail.ru)",
      type: "red_flag",
      selector: "[data-inspect='replyto']",
      explanation: "Hidden reply-to trap: Replies do not return to the campus helpdesk but to an external mail relay in an unrelated jurisdiction."
    },
    {
      id: "token-urgency",
      label: "45-Minute Lockout Threat",
      type: "red_flag",
      selector: "[data-inspect='urgency']",
      explanation: "Coercive urgency: Threatening an immediate 45-minute lockout is designed to bypass rational skepticism."
    },
    {
      id: "token-salutation",
      label: "Generic Greeting ('Dear Student / User')",
      type: "red_flag",
      selector: "[data-inspect='salutation']",
      explanation: "Impersonal greeting: Broadcast attacks use generic salutations because attackers lack your registered student record."
    },
    {
      id: "token-link",
      label: "Simulated Re-sync Link (univ-cloud-portal.net/mfa)",
      type: "red_flag",
      selector: "[data-inspect='link']",
      explanation: "Malicious credential harvesting link: Points to an unverified external authentication proxy."
    },
    {
      id: "token-forfeiture",
      label: "Threat of Exam & Course Forfeiture",
      type: "red_flag",
      selector: "[data-inspect='forfeiture']",
      explanation: "Fear manipulation: Threatening academic forfeiture exploits student anxiety to force compliance."
    },
    {
      id: "token-seal",
      label: "Fake 'Verified by Cyber Shield' Seal",
      type: "red_flag",
      selector: "[data-inspect='seal']",
      explanation: "Fabricated authority: Fraudulent badges and security seals are pasted into emails to feign legitimacy."
    },
    {
      id: "token-phone",
      label: "Official Campus Security Kiosk Number (555-0199)",
      type: "trust_signal",
      selector: "[data-inspect='phone']",
      explanation: "Legitimate campus phone number included as a decoy to confuse recipients. Not an indicator of attack origin."
    }
  ]
};

// Category Metadata for Dashboard Analytics & Filtering
const CATEGORIES_META = {
  "Career & Employment": { icon: "💼", color: "#3B82F6" },
  "Account Security & Credentials": { icon: "🔐", color: "#EF4444" },
  "Financial & Scholarships": { icon: "💰", color: "#F59E0B" },
  "Physical & Mail Services": { icon: "📦", color: "#8B5CF6" },
  "Impersonation & Social Engineering": { icon: "🎭", color: "#EC4899" },
  "Physical Security & Quishing": { icon: "📱", color: "#10B981" },
  "Financial & Student Accounts": { icon: "💳", color: "#F97316" },
  "Campus Communications": { icon: "📢", color: "#06B6D4" },
  "Identity Theft & Recruitment": { icon: "🪪", color: "#E11D48" },
  "Coercion & Intimidation": { icon: "⚖️", color: "#6366F1" }
};
