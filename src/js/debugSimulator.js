// Interactive: Diagnose the Failure (Advanced Mastery tab). Each scenario
// deliberately calls back to a concept taught elsewhere in the course, so
// the "actual fix" is never a fresh fact — it's applying what already came
// before to a symptom that doesn't obviously point at it.
const SCENARIOS = {
    silentField: {
        cause: 'The failure is usually scoped to one field mapping, not the whole node — a value came back empty or shaped differently than expected, and nothing downstream could use it.',
        fix: 'Click Execute Step on that exact node and read its real JSON output, rather than guessing from the final result. A typo in a referenced field name from an earlier step is the most common cause — the n8n Execute Step lesson exists exactly for this.'
    },
    silentAction: {
        cause: 'The action step almost certainly got back a 401/403 (bad or expired credential) or a 404 (wrong channel/recipient ID) — and that failure never bubbled up to make the overall run look "failed."',
        fix: 'Open that specific action\'s own output and read its actual status code, not just whether the workflow finished — straight from the Web Basics status code lesson.'
    },
    driftedProd: {
        cause: 'Almost always an expired OAuth token, or test data — like n8n\'s Pinned Data — that got left in a live field and never swapped back to the real trigger.',
        fix: 'Re-authenticate the credential first. Then check every field for a value that looks like it was hardcoded during testing.'
    },
    intermittent: {
        cause: 'A failure that\'s rare, identical, and pattern-free is a resilience gap, not a logic bug — almost always a 429 rate limit or a brief timeout from the other service.',
        fix: 'Add a retry policy with exponential backoff on that specific step — exactly like the simulator above. Don\'t rewrite the workflow\'s logic to "fix" something that was never actually broken.'
    }
};

export function diagnoseFailure() {
    const key = document.getElementById('debugScenario').value;
    const s = SCENARIOS[key];
    document.getElementById('debugOutput').innerHTML =
        '<strong style="color:#ffcc00;">Likely cause:</strong> ' + s.cause +
        '<br><br><strong style="color:#00ff88;">What to actually do:</strong> ' + s.fix;
}
