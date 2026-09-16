// Interactive: Build a Condition (Filters, Conditions & Branching lesson)
const SAMPLE_LEAD = { budget: 8000, country: 'US', urgent: false };

export function testCondition() {
    const field = document.getElementById('condField').value;
    const operator = document.getElementById('condOperator').value;
    const rawValue = document.getElementById('condValue').value;
    const actual = SAMPLE_LEAD[field];

    let compareValue = rawValue;
    if (typeof actual === 'number') compareValue = parseFloat(rawValue);
    if (typeof actual === 'boolean') compareValue = rawValue.toLowerCase() === 'true';

    let result;
    switch (operator) {
        case 'equals': result = actual === compareValue; break;
        case 'notEquals': result = actual !== compareValue; break;
        case 'greaterThan': result = actual > compareValue; break;
        case 'lessThan': result = actual < compareValue; break;
        case 'contains': result = String(actual).toLowerCase().indexOf(String(rawValue).toLowerCase()) !== -1; break;
        default: result = false;
    }

    const box = document.getElementById('conditionOutput');
    box.style.borderColor = result ? '#00ff8844' : '#ff6b3544';
    box.innerHTML = '<strong style="color:' + (result ? '#00ff88' : '#ff6b35') + ';">' + (result ? 'TRUE — this lead continues down this path' : 'FALSE — this lead takes the other path (or stops here)') + '</strong><br>' +
        'Checked: <code>' + field + '</code> (' + JSON.stringify(actual) + ') ' + operator + ' ' + JSON.stringify(rawValue);
}
