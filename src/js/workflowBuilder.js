// Interactive: Build Your Own Workflow (Fundamentals tab)
export function updateWorkflowBuilder() {
    const trigger = document.getElementById('wbTrigger').value;
    const condition = document.getElementById('wbCondition').value;
    const action = document.getElementById('wbAction').value;

    let stepNum = 1;
    let html = '';
    html += '<div class="workflow-step"><div class="step-number">' + (stepNum++) + '</div><strong>TRIGGER:</strong>&nbsp;' + trigger + '</div>';
    if (condition) {
        html += '<div class="workflow-step"><div class="step-number">' + (stepNum++) + '</div><strong>CONDITION:</strong>&nbsp;' + condition + '</div>';
    }
    html += '<div class="workflow-step"><div class="step-number">' + (stepNum++) + '</div><strong>ACTION:</strong>&nbsp;' + action + '</div>';

    document.getElementById('wbChain').innerHTML = html;

    const stepCount = condition ? 3 : 2;
    let info = '<strong><svg class="icon"><use href="#i-bar-chart"></use></svg> Workflow Summary:</strong><br>';
    info += 'Total steps: <strong>' + stepCount + '</strong><br>';
    info += condition
        ? 'This automation only runs when the condition is true — saving you from unnecessary actions (and, on paid tools, unnecessary cost).'
        : 'This automation runs every single time the trigger fires — simple and unconditional.';

    document.getElementById('wbInfo').innerHTML = info;
}
