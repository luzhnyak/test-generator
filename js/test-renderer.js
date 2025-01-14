document.addEventListener("DOMContentLoaded", () => {
  // JSON тесту
  const testJSON = {
    title: "Мій тест",
    description: "Це приклад тесту.",
    questions: [
      {
        text: "Що таке JavaScript?",
        answers: [
          { text: "Мова програмування", weight: 10 },
          { text: "Фреймворк", weight: 0 },
          { text: "База даних", weight: 0 },
        ],
      },
      {
        text: "Для чого використовується HTML?",
        answers: [
          { text: "Для стилізації сторінки", weight: 0 },
          { text: "Для структурування сторінки", weight: 10 },
          { text: "Для обробки запитів", weight: 0 },
        ],
      },
    ],
  };

  const app = document.getElementById("app");

  // Створення елементів заголовку та опису
  const title = document.createElement("h1");
  title.textContent = testJSON.title;
  const description = document.createElement("p");
  description.textContent = testJSON.description;

  const form = document.createElement("form");
  form.id = "testForm";

  // Генерація запитань та відповідей
  testJSON.questions.forEach((question, questionIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${questionIndex + 1}. ${question.text}`;
    questionDiv.appendChild(questionText);

    question.answers.forEach((answer, answerIndex) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = "answer";

      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.name = `question-${questionIndex}`;
      answerInput.value = answer.weight;
      answerInput.required = true;

      const answerLabel = document.createElement("label");
      answerLabel.textContent = answer.text;

      answerDiv.appendChild(answerInput);
      answerDiv.appendChild(answerLabel);

      questionDiv.appendChild(answerDiv);
    });

    form.appendChild(questionDiv);
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Завершити тест";

  form.appendChild(submitButton);

  // Обробка результатів тесту
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    let totalScore = 0;

    formData.forEach((value) => {
      totalScore += parseInt(value, 10);
    });

    const result = document.createElement("div");
    result.className = "result";
    result.textContent = `Ваш результат: ${totalScore} балів`;
    app.appendChild(result);
    form.remove();
  });

  // Додавання всіх елементів до сторінки
  app.appendChild(title);
  app.appendChild(description);
  app.appendChild(form);
});
