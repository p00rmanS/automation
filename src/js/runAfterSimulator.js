// Interactive: Configure Run After (Power Automate tab)
const RUN_AFTER_MODES = {
    default: { label: 'only if successful (default)', allows: ['Succeeded'] },
    catchFail: { label: 'successful or failed', allows: ['Succeeded', 'Failed'] },
    catchSkip: { label: 'successful, failed, or skipped', allows: ['Succeeded', 'Failed', 'Skipped'] },
    always: { label: 'always, no matter what', allows: ['Succeeded', 'Failed', 'Skipped', 'Timed Out'] }
};

export function simulateRunAfter() {
    const outcome = document.getElementById('raOutcome').value;
    const mode = document.getElementById('raMode').value;
    const config = RUN_AFTER_MODES[mode];
    const willRun = config.allows.includes(outcome);

    const box = document.getElementById('runAfterOutput');
    box.style.borderColor = willRun ? '#00ff8844' : '#ff4d4d44';
    box.innerHTML =
        '<strong style="color:' + (willRun ? '#00ff88' : '#ff8080') + ';">' +
        (willRun ? 'This action RUNS.' : 'This action is SKIPPED.') +
        '</strong><br>' +
        'Previous action outcome: <code>' + outcome + '</code><br>' +
        'This action is configured to run after: <code>' + config.allows.join(', ') + '</code>';
}
