// Interactive: Which Tool Fits You? (Advanced Mastery tab)
export function updateToolRecommendation() {
    const code = parseInt(document.getElementById('tqCode').value);
    const need = parseInt(document.getElementById('tqNeed').value);
    const budget = parseInt(document.getElementById('tqBudget').value);

    const scores = { n8n: 0, zapier: 0, make: 0, ghl: 0, power: 0 };

    scores.n8n += code * 2;
    scores.zapier += (2 - code);
    scores.make += (code === 1 ? 2 : 0) + (code === 0 ? 1 : 0);
    scores.power += (code === 1 ? 1 : 0);

    if (need === 0) scores.zapier += 3;
    if (need === 1) scores.ghl += 3;
    if (need === 2) scores.n8n += 3;
    if (need === 3) scores.make += 4;
    if (need === 4) scores.power += 4;

    if (budget === 0) { scores.zapier += 1; scores.make += 2; scores.power += 1; }
    if (budget === 1) scores.power += 1;
    if (budget === 2) scores.ghl += 2;

    const names = { n8n: 'n8n', zapier: 'Zapier', make: 'Make (formerly Integromat)', ghl: 'GoHighLevel (GHL)', power: 'Microsoft Power Automate' };
    const reasons = {
        n8n: 'You\'re comfortable with (or open to) technical setup and need custom logic or full control — n8n\'s node-based builder plus a free self-hosted option fits best.',
        zapier: 'You want the fastest path to connecting apps without touching code — Zapier\'s 6,000+ integrations and simple builder fit best.',
        make: 'You want more power and visual branching than Zapier offers, but still without writing code — Make\'s flow-based canvas and operations-based pricing fit best.',
        ghl: 'You need a full CRM plus marketing and sales automation in one place, not just app-to-app connections — GHL\'s all-in-one platform fits best.',
        power: 'You\'re already living inside Microsoft 365, Teams, or SharePoint — Power Automate is likely already included, and it reaches into those apps (and legacy desktop software via RPA) better than anything else here.'
    };

    let winner = 'zapier';
    let best = scores.zapier;
    for (const key of ['n8n', 'make', 'ghl', 'power']) {
        if (scores[key] > best) { winner = key; best = scores[key]; }
    }

    const info = '<strong><svg class="icon"><use href="#i-target"></use></svg> Recommended: ' + names[winner] + '</strong><br><br>' + reasons[winner] +
        '<br><br><span style="color:#a0a0a0; font-size:0.9em;">Scores — n8n: ' + scores.n8n + ' | Zapier: ' + scores.zapier + ' | Make: ' + scores.make + ' | GHL: ' + scores.ghl + ' | Power Automate: ' + scores.power + '</span>';

    document.getElementById('toolRecInfo').innerHTML = info;
}
