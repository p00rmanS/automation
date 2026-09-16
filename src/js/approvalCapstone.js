import { runAnimatedSteps } from './animatedSteps.js';

// Interactive: Third Capstone — Power Automate approval-gated request
let approvalTimeouts = [];
export function runApprovalCapstoneSimulation() {
    const decision = document.getElementById('approvalDecision').value;

    const steps = [
        { text: 'Trigger: new item added to the "Expense Requests" SharePoint list.', color: '#00d4ff' },
        { text: 'Approval sent to the requester\'s manager.', color: '#a0a0a0' }
    ];

    if (decision === 'approved') {
        steps.push({ text: 'Manager responds: Approved.', color: '#00ff88' });
        steps.push({ text: 'Configure run after (Succeeded): process the reimbursement.', color: '#00ff88' });
        steps.push({ text: 'Configure run after (Succeeded): post a confirmation to Teams.', color: '#00ff88' });
    } else {
        steps.push({ text: 'Manager responds: Rejected.', color: '#ff6b35' });
        steps.push({ text: 'Configure run after (Succeeded): email the requester with the rejection reason.', color: '#ff6b35' });
    }

    steps.push({ text: 'Configure run after (Failed): if that notification action fails, alert the automation owner instead.', color: '#ffcc00' });
    steps.push({ text: 'Log the final outcome back to the SharePoint list — runs on every path.', color: '#00d4ff' });
    steps.push({ text: 'Done — request fully processed.', color: '#00ff88' });

    runAnimatedSteps(approvalTimeouts, document.getElementById('approvalCapstoneLog'), steps);
}
