document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Створення основних елементів форми
  const form = document.createElement("form");
  form.id = "testForm";

  // Поля для назви та опису тесту

  titleHTML = `<div class="mb-3">
    <label for="test-title" class="form-label">Назва тесту</label>
    <input type="text" class="form-control" id="test-title" name="test-title" placeholder="Введіть назву тесту">    
  </div>`;

  descriptionHTML = `<div class="mb-3">
    <label for="test-description" class="form-label">Опис тесту</label>
    <textarea  type="text" class="form-control" id="test-description" name="test-description" placeholder="Введіть опис тесту"></textarea>    
  </div>`;

  const questionsContainer = document.createElement("div");
  questionsContainer.id = "questions";

  const addQuestionButton = document.createElement("button");
  addQuestionButton.type = "button";
  addQuestionButton.textContent = "Додати запитання";
  addQuestionButton.className = "btn btn-primary me-3";
  addQuestionButton.addEventListener("click", addQuestion);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-success";
  submitButton.textContent = "Зберегти тест";

  form.innerHTML = titleHTML + descriptionHTML;

  const resultsContainer = document.createElement("div");
  resultsContainer.id = "results-container";

  const addResultButton = document.createElement("button");
  addResultButton.textContent = "Додати результат";
  addResultButton.className = "btn btn-primary me-3";
  addResultButton.addEventListener("click", addResult);

  form.appendChild(questionsContainer);
  form.appendChild(resultsContainer);
  form.appendChild(addQuestionButton);
  form.appendChild(addResultButton);
  form.appendChild(submitButton);
  form.addEventListener("submit", handleSubmit);

  app.appendChild(form);

  let questionIndex = 0;
  let resultIndex = 0;

  // Додає перше запитання за замовчуванням
  addQuestion();

  // Додає перший результат
  addResult();

  // Додає нове запитання до форми
  function addQuestion() {
    const questionId = `question_${questionIndex}`;
    const questionDiv = document.createElement("div");
    questionDiv.className = "border p-3 mb-3 bg-light rounded";

    const questionLabel = document.createElement("label");
    questionLabel.textContent = "Запитання: ";
    questionLabel.className = "form-label";
    questionLabel.htmlFor = `${questionId}-text`;

    const questionInput = document.createElement("textarea");
    questionInput.type = "text";
    questionInput.className = "form-control mb-3";
    questionInput.name = `${questionId}-text`;
    questionInput.id = `${questionId}-text`;
    questionInput.placeholder = "Введіть текст запитання";
    questionInput.required = true;

    const answersContainer = document.createElement("div");
    answersContainer.id = `${questionId}-answers`;
    answersContainer.className = "";

    const addAnswerButton = document.createElement("button");
    addAnswerButton.type = "button";
    addAnswerButton.textContent = "Додати відповідь";
    addAnswerButton.className = "btn btn-primary me-3";
    addAnswerButton.addEventListener("click", () => addAnswer(questionId));

    const removeQuestionButton = document.createElement("button");
    removeQuestionButton.type = "button";
    removeQuestionButton.textContent = "Видалити запитання";
    removeQuestionButton.className = "btn btn-danger";
    removeQuestionButton.addEventListener("click", () => questionDiv.remove());

    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionInput);
    questionDiv.appendChild(answersContainer);
    questionDiv.appendChild(addAnswerButton);
    questionDiv.appendChild(removeQuestionButton);

    questionsContainer.appendChild(questionDiv);

    addAnswer(questionId);

    questionIndex++;
  }

  // Додає варіант відповіді до запитання
  function addAnswer(questionId) {
    const answersContainer = document.getElementById(`${questionId}-answers`);
    const answerIndex = answersContainer.children.length;

    const answerDiv = document.createElement("div");
    answerDiv.className = "input-group mb-3";

    const answerLabel = document.createElement("label");
    answerLabel.textContent = "Відповідь: ";
    answerLabel.className = "input-group-text";
    answerLabel.htmlFor = `${questionId}-answer-${answerIndex}-text`;

    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.className = "form-control flex-grow-1";
    answerInput.name = `${questionId}-answer-${answerIndex}-text`;
    answerInput.id = `${questionId}-answer-${answerIndex}-text`;
    answerInput.placeholder = "Введіть текст відповіді";
    answerInput.required = true;

    const weightLabel = document.createElement("label");
    weightLabel.textContent = "Вага: ";
    weightLabel.className = "input-group-text";
    weightLabel.htmlFor = `${questionId}-answer-${answerIndex}-weight`;

    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "form-control flex-grow-0";
    weightInput.name = `${questionId}-answer-${answerIndex}-weight`;
    weightInput.id = `${questionId}-answer-${answerIndex}-weight`;
    weightInput.placeholder = "Введіть вагу";
    weightInput.min = 0;
    weightInput.defaultValue = 0;
    weightInput.required = true;
    weightInput.style.width = "80px";

    const removeAnswerButton = document.createElement("button");
    removeAnswerButton.type = "button";
    // removeAnswerButton.textContent = "Видалити відповідь";
    removeAnswerButton.innerHTML = `<i class="bi bi-trash"></i>`;
    removeAnswerButton.className = "btn btn-danger";
    removeAnswerButton.addEventListener("click", () => answerDiv.remove());

    answerDiv.appendChild(answerLabel);
    answerDiv.appendChild(answerInput);
    answerDiv.appendChild(weightLabel);
    answerDiv.appendChild(weightInput);
    answerDiv.appendChild(removeAnswerButton);

    answersContainer.appendChild(answerDiv);
  }

  function addResult() {
    const resultId = `result_${resultIndex}`;

    const resultDiv = document.createElement("div");
    resultDiv.className = "border p-3 mb-3 bg-light rounded";

    const scoreDiv = document.createElement("div");
    scoreDiv.className = "input-group mb-3";

    const scoreLabel = document.createElement("p");
    scoreLabel.className = "form-label";
    scoreLabel.textContent = "Кількість балів: ";

    const minScoreLabel = document.createElement("label");
    minScoreLabel.textContent = "Від: ";
    minScoreLabel.className = "input-group-text";
    minScoreLabel.htmlFor = `${resultId}-score_min`;

    const minScoreInput = document.createElement("input");
    minScoreInput.type = "number";
    minScoreInput.placeholder = "Мінімальна кількість балів";
    minScoreInput.className = "form-control";
    minScoreInput.name = `${resultId}-score_min`;
    minScoreInput.id = `${resultId}-score_min`;

    const maxScoreLabel = document.createElement("label");
    maxScoreLabel.textContent = "До: ";
    maxScoreLabel.className = "input-group-text";
    maxScoreLabel.htmlFor = `${resultId}-score_max`;

    const maxScoreInput = document.createElement("input");
    maxScoreInput.type = "number";
    maxScoreInput.placeholder = "Максимальна кількість балів";
    maxScoreInput.className = "form-control";
    maxScoreInput.name = `${resultId}-score_max`;
    maxScoreInput.id = `${resultId}-score_max`;

    const resultTextLabel = document.createElement("label");
    resultTextLabel.textContent = "Опис результату: ";
    resultTextLabel.className = "form-label";
    resultTextLabel.htmlFor = `${resultId}-text`;

    const resultTextInput = document.createElement("textarea");
    resultTextInput.placeholder = "Опис результату";
    resultTextInput.className = "form-control mb-3";
    resultTextInput.name = `${resultId}-text`;
    resultTextInput.id = `${resultId}-text`;

    const removeResultButton = document.createElement("button");
    removeResultButton.textContent = "Видалити результат";
    removeResultButton.className = "btn btn-danger";
    removeResultButton.addEventListener("click", () => {
      resultDiv.remove();
    });

    scoreDiv.appendChild(minScoreLabel);
    scoreDiv.appendChild(minScoreInput);
    scoreDiv.appendChild(maxScoreLabel);
    scoreDiv.appendChild(maxScoreInput);

    resultDiv.appendChild(scoreLabel);
    resultDiv.appendChild(scoreDiv);
    resultDiv.appendChild(resultTextLabel);
    resultDiv.appendChild(resultTextInput);
    resultDiv.appendChild(removeResultButton);
    resultsContainer.appendChild(resultDiv);

    resultIndex++;
  }

  // Обробляє відправку форми

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const test = { questions: [], results: [] };

    formData.forEach((value, key) => {
      if (key === "test-title") {
        test.title = value;
      } else if (key === "test-description") {
        test.description = value;
      }

      const [question, part, index, field] = key.split("-");

      // Визначаємо індекс запитання
      if (question.startsWith("question")) {
        const questionIndex = parseInt(question.replace("question_", ""), 10);

        // Ініціалізуємо запитання, якщо воно ще не існує
        if (!test.questions[questionIndex]) {
          test.questions[questionIndex] = { text: "", answers: [] };
        }

        // Якщо це текст запитання
        if (part === "text") {
          test.questions[questionIndex].text = value;
        }

        // Якщо це відповідь
        if (part === "answer") {
          const answerIndex = parseInt(index, 10);

          // Ініціалізуємо відповідь, якщо її ще немає
          if (!test.questions[questionIndex].answers[answerIndex]) {
            test.questions[questionIndex].answers[answerIndex] = {
              text: "",
              weight: 0,
            };
          }

          // Додаємо текст або вагу відповіді
          if (field === "text") {
            test.questions[questionIndex].answers[answerIndex].text = value;
          } else if (field === "weight") {
            test.questions[questionIndex].answers[answerIndex].weight =
              parseInt(value, 10);
          }
        }
      }

      // Визначаємо індекс результату
      if (question.startsWith("result")) {
        const resultIndex = parseInt(question.replace("result_", ""), 10);

        // Ініціалізуємо результат, якщо він ще не існує
        if (!test.results[resultIndex]) {
          test.results[resultIndex] = { text: "", minScore: 0, maxScore: 0 };
        }

        // Якщо це текст результату
        if (part === "text") {
          test.results[resultIndex].text = value;
        }

        // Якщо це бали
        if (part === "score_min") {
          test.results[resultIndex].minScore = parseInt(value, 10);
        }
        if (part === "score_max") {
          test.results[resultIndex].maxScore = parseInt(value, 10);
        }
      }
    });

    // Видаляємо порожні результати
    test.results = test.results.filter(Boolean);

    // Виводимо результат
    console.log("JSON:", JSON.stringify(test, null, 2));

    fetch("/api/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(test),
    })
      .then((response) => response.json())
      .then((data) => console.log("Server response:", data))
      .catch((error) => console.error("Error:", error));
    alert("Тест збережено! Перевірте консоль для JSON.");
  }
});
