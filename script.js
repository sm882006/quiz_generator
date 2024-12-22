
document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const questionsContainer = document.getElementById("questionsContainer");
  const addQuestionButton = document.getElementById("addQuestion");
  const quizOutput = document.getElementById("quizOutput");

  // Add a new question block
  addQuestionButton.addEventListener("click", () => {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("questionBlock");
    questionBlock.innerHTML = `
      <label>Question:</label>
      <input type="text" name="question" placeholder="Enter question" required>
      <label>Options:</label>
      <input type="text" name="option1" placeholder="Option 1" required>
      <input type="text" name="option2" placeholder="Option 2" required>
      <input type="text" name="option3" placeholder="Option 3" required>
      <input type="text" name="option4" placeholder="Option 4" required>
      <label>Correct Answer:</label>
      <select name="correctAnswer" required>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </select>
      <button type="button" class="removeQuestion">Remove Question</button>
    `;
    questionsContainer.appendChild(questionBlock);

    // Add event listener to remove button
    questionBlock.querySelector(".removeQuestion").addEventListener("click", () => {
      questionsContainer.removeChild(questionBlock);
    });
  });

  // Generate quiz
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(quizForm);
    const questions = [];
    const questionBlocks = document.querySelectorAll(".questionBlock");

    questionBlocks.forEach((block) => {
      const question = block.querySelector('[name="question"]').value;
      const options = [
        block.querySelector('[name="option1"]').value,
        block.querySelector('[name="option2"]').value,
        block.querySelector('[name="option3"]').value,
        block.querySelector('[name="option4"]').value,
      ];
      const correctAnswer = block.querySelector('[name="correctAnswer"]').value;
      questions.push({ question, options, correctAnswer });
    });

    displayQuiz(questions);
  });

  // Display the quiz
  function displayQuiz(questions) {
    quizOutput.innerHTML = "";
    questions.forEach((q, index) => {
      const quizQuestion = document.createElement("div");
      quizQuestion.classList.add("quizQuestion");
      quizQuestion.innerHTML = `
        <h3>Q${index + 1}: ${q.question}</h3>
        ${q.options
          .map(
            (option, i) =>
              `<label>
                <input type="radio" name="q${index}" value="${i + 1}">
                ${option}
              </label>`
          )
          .join("<br>")}
      `;
      quizOutput.appendChild(quizQuestion);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.addEventListener("click", () => evaluateQuiz(questions));
    quizOutput.appendChild(submitButton);
  }

  // Evaluate the quiz
  function evaluateQuiz(questions) {
    let score = 0;
    questions.forEach((q, index) => {
      const userAnswer = document.querySelector(
        `input[name="q${index}"]:checked`
      )?.value;
      if (userAnswer === q.correctAnswer) {
        score++;
      }
    });
    alert(`You scored ${score}/${questions.length}`);
  }
});
