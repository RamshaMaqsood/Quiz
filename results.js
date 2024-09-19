const getElement = id => document.getElementById(id);

const quizData = JSON.parse(localStorage.getItem('quizData')) || [];
const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
const score = parseInt(localStorage.getItem('quizScore'), 10) || 0;

const showScore = () => {
    const scoreContainer = getElement('score-container');
    scoreContainer.innerHTML = `<h2>Your Score: ${score} out of ${quizData.length}</h2>`;
};

const showAnswerSheet = () => {
    const answerSheetContainer = getElement('answer-sheet-container');
    answerSheetContainer.classList.remove('hidden');
    answerSheetContainer.innerHTML = `
        <h3>Answer Sheet:</h3>
        ${quizData.map((question, index) => `
            <div class="question">
                <p>${question.question}</p>
                ${question.options.map(option => {
                    const isUserAnswer = userAnswers[index] === option;
                    const isCorrectAnswer = question.answer === option;
                    const optionClass = isUserAnswer
                        ? (isCorrectAnswer ? 'correct' : 'incorrect')
                        : (isCorrectAnswer ? 'right' : '');

                    return `
                        <label class="${optionClass}">
                            <input type="radio" disabled ${isUserAnswer ? 'checked' : ''}>
                            ${option}
                        </label>
                    `;
                }).join('')}
            </div>
        `).join('')}
    `;
};

getElement('show-answer-sheet-btn').addEventListener('click', showAnswerSheet);

showScore();
