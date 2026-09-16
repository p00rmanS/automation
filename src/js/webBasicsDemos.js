import { runAnimatedSteps } from './animatedSteps.js';

// Interactive: Polling vs Webhook simulator (Web Basics tab)
export function simulatePollingVsWebhook() {
    const orderArrivesAtMinute = 4 + Math.random() * 3;
    const pollIntervalMinutes = 2;
    const checksMade = Math.ceil(10 / pollIntervalMinutes);
    const foundAtCheck = Math.ceil(orderArrivesAtMinute / pollIntervalMinutes);
    const pollDelaySeconds = Math.round((foundAtCheck * pollIntervalMinutes - orderArrivesAtMinute) * 60);

    const info =
        '<strong>Polling (checks every ' + pollIntervalMinutes + ' minutes):</strong><br>' +
        'Made ' + checksMade + ' checks over 10 minutes. The order actually arrived at minute ' + orderArrivesAtMinute.toFixed(1) + ', but polling didn\'t notice until its next scheduled check — about ' + pollDelaySeconds + ' seconds late.' +
        '<br><br><strong>Webhook:</strong><br>' +
        'Made 0 checks. The moment the order arrived, it was pushed to your automation in under a second.';

    document.getElementById('pollWebhookOutput').innerHTML = info;
}

// Interactive: Guess the status code
const STATUS_CODES = {
    ok: { code: '200 OK', color: '#00ff88', text: 'The request succeeded and the data came back exactly as expected. This is the result you want on almost every step.' },
    unauth: { code: '401 Unauthorized', color: '#ffcc00', text: 'The server doesn\'t recognize your credential. Nine times out of ten this means a wrong, expired, or missing API key — check the Credential field first.' },
    notfound: { code: '404 Not Found', color: '#ffcc00', text: 'You asked for something that doesn\'t exist at that exact address — a typo in a sheet name, channel name, or ID is the usual culprit.' },
    ratelimit: { code: '429 Too Many Requests', color: '#ff6b35', text: 'You\'re calling the API faster than it allows. Add a short delay between calls, or batch requests together, rather than retrying immediately.' },
    servererror: { code: '500 Internal Server Error', color: '#ff4d4d', text: 'Something broke on THEIR end, not yours. There\'s usually nothing to fix in your workflow — wait a bit and retry, or check the app\'s status page.' }
};

export function revealStatusCode() {
    const scenario = document.getElementById('scScenario').value;
    const result = STATUS_CODES[scenario];
    document.getElementById('statusCodeOutput').innerHTML =
        '<strong style="color:' + result.color + ';">' + result.code + '</strong><br>' + result.text;
}

// Interactive: Array processing simulator
let arrayProcessTimeouts = [];
export function simulateArrayProcessing() {
    const steps = [
        { text: 'Item 1 of 3 entering the node...', color: '#a0a0a0' },
        { text: 'Item 1 of 3 done.', color: '#00ff88' },
        { text: 'Item 2 of 3 entering the node...', color: '#a0a0a0' },
        { text: 'Item 2 of 3 done.', color: '#00ff88' },
        { text: 'Item 3 of 3 entering the node...', color: '#a0a0a0' },
        { text: 'Item 3 of 3 done.', color: '#00ff88' },
        { text: 'All 3 items processed — the workflow moves to the next node.', color: '#00ff88' }
    ];
    runAnimatedSteps(arrayProcessTimeouts, document.getElementById('arrayProcessLog'), steps);
}

// Interactive: Pagination — load next page
const PAGES = [
    { records: 20, cursor: 'tok_A', last: false },
    { records: 20, cursor: 'tok_B', last: false },
    { records: 10, cursor: null, last: true }
];
let pageIndex = 0;
let totalLoaded = 0;

export function loadNextPage() {
    const box = document.getElementById('paginationOutput');
    if (pageIndex >= PAGES.length) {
        box.innerHTML = '<strong style="color:#ffcc00;">No more pages to load.</strong> Click again after resetting to replay.';
        return;
    }
    const page = PAGES[pageIndex];
    totalLoaded += page.records;
    let text = '<strong>Page ' + (pageIndex + 1) + ' loaded:</strong> ' + page.records + ' records (total so far: ' + totalLoaded + ')<br>';
    text += page.last
        ? '<span style="color:#00ff88;">No cursor returned — that was the last page.</span>'
        : 'Cursor returned: <code>' + page.cursor + '</code> — use it to ask for the next page.';
    box.innerHTML = text;
    pageIndex++;
    if (pageIndex >= PAGES.length) {
        pageIndex = 0;
        totalLoaded = 0;
    }
}

// Interactive: Idempotency — same webhook fires twice
const seenOrderIds = new Set();
export function simulateIdempotency() {
    const log = document.getElementById('idempotencyLog');
    const orderId = 'A101';
    const alreadySeen = seenOrderIds.has(orderId);
    let line;
    if (!alreadySeen) {
        seenOrderIds.add(orderId);
        line = '<div style="color:#00ff88;">Webhook received: Order #' + orderId + ' — new order, sending confirmation email.</div>';
    } else {
        line = '<div style="color:#ff8080;">Webhook received: Order #' + orderId + ' AGAIN — already processed, skipping to avoid a duplicate email.</div>';
    }
    log.innerHTML += line;
}
