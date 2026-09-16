// Single entry point: pulls in the stylesheet, wires up every interactive
// module, and exposes the functions referenced by onclick="..." attributes
// in index.html onto window (ES modules are scoped by default, so inline
// event handlers in the HTML can't see them otherwise).
import './styles.css';

import { updateProgress, showSection } from './js/navigation.js';
import { updateWorkflowBuilder } from './js/workflowBuilder.js';
import { updateToolRecommendation } from './js/toolRecommender.js';
import { updateNodeInspectorResource, executeNodeInspector } from './js/nodeInspector.js';
import { simulatePollingVsWebhook, revealStatusCode, simulateArrayProcessing, loadNextPage, simulateIdempotency } from './js/webBasicsDemos.js';
import { checkAnswer, showQuizScore } from './js/quiz.js';
import { filterGlossary } from './js/glossary.js';
import { testCondition } from './js/conditionBuilder.js';
import { runCapstoneSimulation } from './js/capstone.js';
import { runReputationSimulation } from './js/reputationLoop.js';
import { runApprovalCapstoneSimulation } from './js/approvalCapstone.js';
import { simulateRunAfter } from './js/runAfterSimulator.js';
import { simulateBackoff } from './js/backoffSimulator.js';
import { diagnoseFailure } from './js/debugSimulator.js';
import { scrollToTop } from './js/backToTop.js';
import { toggleTheme } from './js/theme.js';
import './js/faq.js';

window.toggleTheme = toggleTheme;
window.showSection = showSection;
window.simulateRunAfter = simulateRunAfter;
window.simulateBackoff = simulateBackoff;
window.diagnoseFailure = diagnoseFailure;
window.updateWorkflowBuilder = updateWorkflowBuilder;
window.updateToolRecommendation = updateToolRecommendation;
window.updateNodeInspectorResource = updateNodeInspectorResource;
window.executeNodeInspector = executeNodeInspector;
window.simulatePollingVsWebhook = simulatePollingVsWebhook;
window.revealStatusCode = revealStatusCode;
window.simulateArrayProcessing = simulateArrayProcessing;
window.loadNextPage = loadNextPage;
window.simulateIdempotency = simulateIdempotency;
window.checkAnswer = checkAnswer;
window.showQuizScore = showQuizScore;
window.filterGlossary = filterGlossary;
window.testCondition = testCondition;
window.runCapstoneSimulation = runCapstoneSimulation;
window.runReputationSimulation = runReputationSimulation;
window.runApprovalCapstoneSimulation = runApprovalCapstoneSimulation;
window.scrollToTop = scrollToTop;

window.addEventListener('load', () => {
    updateProgress();
    updateWorkflowBuilder();
    updateToolRecommendation();
    updateNodeInspectorResource();
    revealStatusCode();
    simulateRunAfter();
    simulateBackoff();
    diagnoseFailure();
});
