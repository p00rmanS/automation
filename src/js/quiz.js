// Quiz tab: answer checking and scoring
const quizAnswers = {};

export function checkAnswer(questionId, correctAnswer, message) {
    const selected = document.querySelector('input[name="' + questionId + '"]:checked');
    const resultDiv = document.getElementById('result' + questionId.slice(1));

    if (!selected) {
        resultDiv.innerHTML = '<strong style="color: #ffcc00;">Please select an answer first!</strong>';
        resultDiv.className = 'result show';
        return;
    }

    const isCorrect = selected.value === correctAnswer;
    quizAnswers[questionId] = isCorrect;

    if (isCorrect) {
        resultDiv.innerHTML = message;
        resultDiv.className = 'result show correct';
    } else {
        resultDiv.innerHTML = '<strong>Incorrect. Try again!</strong><br>' + message;
        resultDiv.className = 'result show incorrect';
    }
}

export function showQuizScore() {
    const total = 27;
    let correct = 0;
    for (let i = 1; i <= total; i++) {
        if (quizAnswers['q' + i]) correct++;
    }
    document.getElementById('quizScoreNum').textContent = correct + ' / ' + total;

    let msg;
    if (correct === total) msg = "Perfect score! You've got the fundamentals locked in.";
    else if (correct >= total - 2) msg = "Solid work — review the questions you missed, then move on.";
    else msg = "Worth a re-read — check the Check Answer feedback on each question above.";
    document.getElementById('quizScoreMsg').textContent = msg;

    document.getElementById('quizScoreBanner').classList.add('show');
}
