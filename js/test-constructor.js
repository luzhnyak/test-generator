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

  // const titleDiv = document.createElement("div");
  // titleDiv.className = "mb-3";

  // const titleLabel = document.createElement("label");
  // titleLabel.textContent = "Назва тесту: ";
  // titleLabel.className = "form-label";
  // const titleInput = document.createElement("input");
  // titleInput.type = "text";
  // titleInput.name = "test-title";
  // titleInput.className = "form-control";
  // titleInput.placeholder = "Введіть назву тесту";
  // titleInput.required = true;
  // titleLabel.appendChild(titleInput);
  // titleDiv.appendChild(titleLabel);

  // const descriptionDiv = document.createElement("div");
  // descriptionDiv.className = "mb-3";
  // const descriptionLabel = document.createElement("label");
  // descriptionLabel.textContent = "Опис тесту: ";
  // descriptionLabel.className = "form-label";
  // const descriptionInput = document.createElement("textarea");
  // descriptionInput.name = "test-description";
  // descriptionInput.className = "form-control";
  // descriptionInput.placeholder = "Введіть опис тесту";
  // descriptionInput.required = true;
  // descriptionLabel.appendChild(descriptionInput);
  // descriptionDiv.appendChild(descriptionLabel);

  // Контейнер для запитань

  // questionHTML = `<div class="input-group mb-3">
  //   <label for="question-1-text" class="form-label">Запитання 1</label>
  //   <input type="text" class="form-control" id="question-1-text" name="question-1-text" placeholder="Введіть текст запитання">
  //   </div>`;

  const questionsContainer = document.createElement("div");
  questionsContainer.id = "questions";

  const addQuestionButton = document.createElement("button");
  addQuestionButton.type = "button";
  addQuestionButton.textContent = "Додати запитання";
  addQuestionButton.className = "btn btn-primary me-3";
  addQuestionButton.addEventListener("click", addQuestion);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary";
  submitButton.textContent = "Зберегти тест";

  // form.appendChild(titleDiv);
  // form.appendChild(descriptionDiv);
  form.innerHTML = titleHTML + descriptionHTML;
  // form.appendChild(descriptionLabel);
  form.appendChild(questionsContainer);
  form.appendChild(addQuestionButton);
  form.appendChild(submitButton);

  app.appendChild(form);

  let questionIndex = 0;

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
    answerInput.className = "form-control";
    answerInput.name = `${questionId}-answer-${answerIndex}-text`;
    answerInput.id = `${questionId}-answer-${answerIndex}-text`;
    answerInput.placeholder = "Введіть текст відповіді";
    answerInput.required = true;

    const weightLabel = document.createElement("label");
    weightLabel.textContent = " Вага: ";
    weightLabel.className = "input-group-text";
    weightLabel.htmlFor = `${questionId}-answer-${answerIndex}-weight`;

    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "form-control shrink-0 ";
    weightInput.name = `${questionId}-answer-${answerIndex}-weight`;
    weightInput.id = `${questionId}-answer-${answerIndex}-weight`;
    weightInput.placeholder = "Введіть вагу";
    weightInput.min = 0;
    weightInput.defaultValue = 0;
    weightInput.required = true;
    weightInput.style.width = "50px";

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
