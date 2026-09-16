// Shared helper: animated simulators (array processing, capstones) all
// schedule their log lines with setTimeout. Without tracking and clearing
// pending timeouts, clicking "Run" again before a previous run finishes
// lets old, stale lines land in the middle of the new run's output. Each
// simulator keeps its own timeout-id array and clears it before scheduling
// a fresh batch.
export function runAnimatedSteps(pendingArray, logEl, steps) {
    pendingArray.forEach(id => clearTimeout(id));
    pendingArray.length = 0;
    logEl.innerHTML = '';
    steps.forEach((step, i) => {
        const id = setTimeout(() => {
            logEl.innerHTML += '<div style="color:' + step.color + ';">' + step.text + '</div>';
        }, i * 450);
        pendingArray.push(id);
    });
}
