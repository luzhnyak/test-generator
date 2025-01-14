document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Створення основних елементів форми
  const form = document.createElement("form");
  form.id = "testForm";

  // Поля для назви та опису тесту
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Назва тесту: ";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "test-title";
  titleInput.placeholder = "Введіть назву тесту";
  titleInput.required = true;
  titleLabel.appendChild(titleInput);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Опис тесту: ";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.name = "test-description";
  descriptionInput.placeholder = "Введіть опис тесту";
  descriptionInput.required = true;
  descriptionLabel.appendChild(descriptionInput);

  const questionsContainer = document.createElement("div");
  questionsContainer.id = "questions";

  const addQuestionButton = document.createElement("button");
  addQuestionButton.type = "button";
  addQuestionButton.textContent = "Додати запитання";
  addQuestionButton.addEventListener("click", addQuestion);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Зберегти тест";

  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(questionsContainer);
  form.appendChild(addQuestionButton);
  form.appendChild(submitButton);
  app.appendChild(form);

  let questionIndex = 0;

  // Додає нове запитання до форми
  function addQuestion() {
    const questionId = `question_${questionIndex}`;
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-container";

    const questionLabel = document.createElement("label");
    questionLabel.textContent = "Запитання: ";
    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.name = `${questionId}-text`;
    questionInput.placeholder = "Введіть текст запитання";
    questionInput.required = true;
    questionLabel.appendChild(questionInput);

    const answersContainer = document.createElement("div");
    answersContainer.id = `${questionId}-answers`;
    answersContainer.className = "answers";

    const addAnswerButton = document.createElement("button");
    addAnswerButton.type = "button";
    addAnswerButton.textContent = "Додати відповідь";
    addAnswerButton.addEventListener("click", () => addAnswer(questionId));

    const removeQuestionButton = document.createElement("button");
    removeQuestionButton.type = "button";
    removeQuestionButton.textContent = "Видалити запитання";
    removeQuestionButton.addEventListener("click", () => questionDiv.remove());

    questionDiv.appendChild(questionLabel);
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
    answerDiv.className = "answer-container";

    const answerLabel = document.createElement("label");
    answerLabel.textContent = "Відповідь: ";
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.name = `${questionId}-answer-${answerIndex}-text`;
    answerInput.placeholder = "Введіть текст відповіді";
    answerInput.required = true;
    answerLabel.appendChild(answerInput);

    const weightLabel = document.createElement("label");
    weightLabel.textContent = " Вага: ";
    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.name = `${questionId}-answer-${answerIndex}-weight`;
    weightInput.placeholder = "Введіть вагу";
    weightInput.required = true;
    weightLabel.appendChild(weightInput);

    const removeAnswerButton = document.createElement("button");
    removeAnswerButton.type = "button";
    removeAnswerButton.textContent = "Видалити відповідь";
    removeAnswerButton.addEventListener("click", () => answerDiv.remove());

    answerDiv.appendChild(answerLabel);
    answerDiv.appendChild(weightLabel);
    answerDiv.appendChild(removeAnswerButton);

    answersContainer.appendChild(answerDiv);
  }

  // Обробляє відправку форми
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const test = { questions: [] };

    formData.forEach((value, key) => {
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
    });

    // Видаляємо порожні запитання
    test.questions = test.questions.filter(Boolean);

    // Виводимо результат
    console.log("JSON:", JSON.stringify(test, null, 2));
    alert("Тест збережено! Перевірте консоль для JSON.");
  });

  // Додає перше запитання за замовчуванням
  addQuestion();
});
