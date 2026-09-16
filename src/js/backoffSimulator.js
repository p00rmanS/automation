import { runAnimatedSteps } from './animatedSteps.js';

// Interactive: Exponential Backoff (Advanced Mastery tab). Deterministic on
// purpose — the simulated flaky request always recovers on its 3rd attempt —
// so the lesson is "how backoff timing grows," not a random pass/fail.
const RECOVERS_ON_ATTEMPT = 3;
let backoffTimeouts = [];

export function simulateBackoff() {
    const maxAttempts = parseInt(document.getElementById('backoffMaxAttempts').value);
    const baseDelay = parseInt(document.getElementById('backoffBaseDelay').value);

    const steps = [];
    let succeeded = false;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (attempt > 1) {
            const delay = baseDelay * Math.pow(2, attempt - 2);
            steps.push({ text: 'Waiting ' + delay + 's before retry #' + attempt + ' (exponential backoff)...', color: '#a0a0a0' });
        }
        if (attempt === RECOVERS_ON_ATTEMPT) {
            steps.push({ text: 'Attempt ' + attempt + ': request succeeded (200 OK).', color: '#00ff88' });
            succeeded = true;
            break;
        }
        steps.push({ text: 'Attempt ' + attempt + ': request failed (503 Service Unavailable).', color: '#ff8080' });
    }

    if (!succeeded) {
        steps.push({ text: 'Gave up after ' + maxAttempts + ' attempts — this is exactly when a "send alert on critical failure" step earns its keep.', color: '#ffcc00' });
    }

    runAnimatedSteps(backoffTimeouts, document.getElementById('backoffLog'), steps);
}
