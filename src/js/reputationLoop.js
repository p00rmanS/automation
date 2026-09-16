import { runAnimatedSteps } from './animatedSteps.js';

// Interactive: Second Capstone — GHL reputation loop
let reputationTimeouts = [];
export function runReputationSimulation() {
    const choice = document.getElementById('reputationChoice').value;

    const steps = [
        { text: 'Trigger: Calendar appointment marked completed.', color: '#00d4ff' },
        { text: 'Waiting 1 hour before reaching out...', color: '#a0a0a0' },
        { text: 'SMS sent with two Trigger Links: "Happy" / "Not Happy".', color: '#00d4ff' }
    ];

    if (choice === 'happy') {
        steps.push({ text: 'Contact tapped "Happy".', color: '#00ff88' });
        steps.push({ text: 'Reputation Management: routed to leave a public Google review.', color: '#00ff88' });
        steps.push({ text: 'Review left — Workflow Goal met, contact exits the sequence.', color: '#00ff88' });
    } else if (choice === 'unhappy') {
        steps.push({ text: 'Contact tapped "Not Happy".', color: '#ff6b35' });
        steps.push({ text: 'Business owner notified privately — no public review requested.', color: '#ff6b35' });
        steps.push({ text: 'Owner logs a follow-up call — Workflow Goal met, contact exits the sequence.', color: '#ff6b35' });
    } else {
        steps.push({ text: 'No link clicked yet.', color: '#a0a0a0' });
        steps.push({ text: 'Workflow Goal not yet met — one reminder SMS will follow in 24 hours.', color: '#ffcc00' });
    }

    runAnimatedSteps(reputationTimeouts, document.getElementById('reputationLog'), steps);
}
