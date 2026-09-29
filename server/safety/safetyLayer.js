/**
 * Safety Layer for AI Health Information Assistant
 * Implements pre-generation checks, emergency red-flag triggers,
 * diagnostic/dosage gating, and post-generation output validation.
 */

// 1. Emergency Red-Flag Trigger Patterns
const EMERGENCY_PATTERNS = [
  {
    category: 'Cardiovascular / Heart Attack',
    regex: /\b(chest pain|crushing pain|pressure in chest|heart attack|chest tightness|pain radiating to (jaw|arm|shoulder)|left arm pain)\b/i,
    advice: 'Suspected acute cardiac event. Call emergency services (911 / 112) immediately.'
  },
  {
    category: 'Respiratory Distress',
    regex: /\b(can('?t| not)|barely|hard to|unable to|trouble|struggling to)\s+(breathe|catch (my|their)?\s*breath)\b|\b(difficulty breathing|shortness of breath|gasping for air|anaphylaxis|choking)\b|\bthroat\s+(is\s+)?(closing|swelling)\b/i,
    advice: 'Suspected severe airway compromise or allergic reaction. Seek immediate emergency care.'
  },
  {
    category: 'Neurological / Stroke (FAST)',
    regex: /\b(stroke|face drooping|facial droop|slurred speech|sudden weakness (in|on) one side|sudden numbness|loss of speech|sudden paralysis|worst headache of my life|thunderclap headache)\b/i,
    advice: 'Suspected acute neurological emergency or stroke. Immediate emergency dispatch is required.'
  },
  {
    category: 'Severe Bleeding & Trauma',
    regex: /\b(severe bleeding|uncontrolled bleeding|gushing blood|spurting blood|coughing up blood|vomiting blood|deep puncture wound|bone sticking out|compound fracture)\b/i,
    advice: 'Severe hemorrhage or critical trauma. Apply direct firm pressure and call emergency services.'
  },
  {
    category: 'Altered Mental Status / Loss of Consciousness',
    regex: /\b(unconscious|passed out|fainted and won't wake up|seizure|convulsions|unresponsive|acute delirium)\b/i,
    advice: 'Unresponsive or seizing individual. Maintain open airway, protect from injury, and call emergency services.'
  },
  {
    category: 'Crisis & Self-Harm',
    regex: /\b(kill myself|suicide|suicidal|end my life|slit my wrists|want to die|take all my pills|overdose intentionally)\b/i,
    advice: 'Immediate crisis support. Dial or text 988 (Suicide & Crisis Lifeline) or your national crisis helpline.'
  }
];

// 2. Diagnostic & Prescription Gating Patterns
const DIAGNOSTIC_PATTERNS = [
  /\b(diagnose me|what disease do i have|tell me what illness i have|do i have cancer|do i have a tumor|what is wrong with me|what do i have)\b/i,
  /\b(what medication should i take|prescribe me|can you write a prescription|dosage for|how many mg (of|should)|how many pills should i take)\b/i,
  /\b(give me a treatment plan for my|how do i cure my (cancer|diabetes|infection|tumor))\b/i
];

// 3. Post-Generation Output Sanity Patterns (Reject/Rewrite personal diagnoses)
const UNSAFE_OUTPUT_PATTERNS = [
  /\b(i diagnose you with|you have been diagnosed with|you are suffering from [a-z]+ (syndrome|disease|disorder))\b/i,
  /\b(take \d+\s*mg of|take \d+\s*(pills|tablets|capsules)|i prescribe|you should take [a-z]+ \d+mg)\b/i
];

export const MANDATORY_DISCLAIMER = "\n\n---\n*Disclaimer: This is general educational health information, not medical advice or diagnosis. Always consult a qualified healthcare professional for medical concerns or emergencies.*";

/**
 * Pre-generation check on user input
 * @param {string} query - The user question
 * @returns {object} Safety analysis result
 */
export function checkInputSafety(query = '') {
  const normalized = query.trim();

  // Check 1: Emergency red flags
  for (const pattern of EMERGENCY_PATTERNS) {
    if (pattern.regex.test(normalized)) {
      return {
        isSafe: false,
        status: 'EMERGENCY_TRIGGERED',
        category: pattern.category,
        recommendation: pattern.advice,
        skipGeneration: true,
        response: generateEmergencyResponse(pattern.category, pattern.advice),
        auditDetails: {
          flaggedCategory: pattern.category,
          actionTaken: 'Bypassed LLM generation; returned immediate emergency referral protocol.',
          severity: 'CRITICAL_HIGH'
        }
      };
    }
  }

  // Check 2: Direct diagnostic or dosage request blocker
  for (const regex of DIAGNOSTIC_PATTERNS) {
    if (regex.test(normalized)) {
      return {
        isSafe: true, // Safe to continue with educational redirection
        status: 'DIAGNOSTIC_REDIRECT_TRIGGERED',
        category: 'Diagnostic / Prescription Request Boundary',
        skipGeneration: false,
        requiresBoundaryGuidance: true,
        auditDetails: {
          flaggedCategory: 'Diagnostic / Dosage Limitation',
          actionTaken: 'Injected strict clinical boundary instructions into prompt to disallow personalized diagnosis.',
          severity: 'MODERATE_POLICY'
        }
      };
    }
  }

  // Normal safe query
  return {
    isSafe: true,
    status: 'PASSED',
    category: 'General Educational Inquiry',
    skipGeneration: false,
    requiresBoundaryGuidance: false,
    auditDetails: {
      flaggedCategory: 'None',
      actionTaken: 'Passed pre-generation safety checks with standard responsible AI constraints.',
      severity: 'NORMAL'
    }
  };
}

/**
 * Format emergency response for rapid clinical triage
 */
function generateEmergencyResponse(category, advice) {
  return `### ⚠️ URGENT MEDICAL ADVISORY

**Emergency Red Flag Detected:** ${category}

${advice}

**Please take immediate action:**
1. **Call Local Emergency Services immediately:**
   - **United States & Canada:** Dial **911**
   - **United Kingdom:** Dial **999**
   - **European Union / India:** Dial **112**
   - **Crisis & Suicide Lifeline (US & Canada):** Dial or text **988**
2. If you are experiencing chest pain, difficulty breathing, sudden weakness, or severe bleeding, do not attempt to drive yourself—call an ambulance or have someone transport you to the nearest emergency department immediately.
3. Stay in a calm, seated or semi-reclined position, loosen tight clothing around your neck and chest, and keep someone informed of your condition.

*This system is an educational AI demonstration and cannot evaluate, treat, or monitor acute medical emergencies.*`;
}

/**
 * Post-generation validation of output
 * @param {string} text - Generated LLM response
 * @returns {object} Validated/sanitized text and audit report
 */
export function validateOutputSafety(text = '') {
  let sanitizedText = text;
  let modificationsMade = false;
  const issuesFound = [];

  for (const pattern of UNSAFE_OUTPUT_PATTERNS) {
    if (pattern.test(sanitizedText)) {
      issuesFound.push(`Matched pattern: ${pattern.toString()}`);
      sanitizedText = sanitizedText.replace(pattern, (match) => {
        return `[Clinical note: consult a licensed physician for diagnosis and personal dosing specifications]`;
      });
      modificationsMade = true;
    }
  }

  // Ensure mandatory disclaimer is present
  if (!sanitizedText.includes("This is general") && !sanitizedText.includes("not medical advice")) {
    sanitizedText = sanitizedText.trim() + MANDATORY_DISCLAIMER;
  }

  return {
    text: sanitizedText,
    passed: !modificationsMade,
    issuesFound,
    auditDetails: {
      modificationsMade,
      disclaimerAppended: true,
      timestamp: new Date().toISOString()
    }
  };
}
