import { runAnimatedSteps } from './animatedSteps.js';

// Interactive: Capstone — run the full lead pipeline
let capstoneTimeouts = [];
export function runCapstoneSimulation() {
    const budget = parseFloat(document.getElementById('capstoneBudget').value) || 0;
    const isHot = budget > 5000;

    const steps = [
        { text: 'Webhook received: new form submission.', color: '#00d4ff' },
        { text: 'Duplicate check: email not seen today — continuing.', color: '#a0a0a0' },
        { text: 'Transform: split name, lowercased email.', color: '#a0a0a0' },
        { text: 'Condition: budget $' + budget.toLocaleString() + ' > $5,000? ' + (isHot ? 'YES' : 'NO') + '.', color: '#ffcc00' }
    ];

    if (isHot) {
        steps.push({ text: 'Hot path: posting to Slack #sales...', color: '#00ff88' });
        steps.push({ text: 'Hot path: sending priority email...', color: '#00ff88' });
    } else {
        steps.push({ text: 'Standard path: adding to nurture list...', color: '#ff6b35' });
    }

    steps.push({ text: 'Logging lead to spreadsheet (runs on every path).', color: '#00d4ff' });
    steps.push({ text: 'Done — lead fully processed.', color: '#00ff88' });

    runAnimatedSteps(capstoneTimeouts, document.getElementById('capstoneLog'), steps);
}
