document.addEventListener("DOMContentLoaded", () => {
  // JSON тесту
  // const testJSON = {
  //   title: "Мій тест",
  //   description: "Це приклад тесту.",
  //   questions: [
  //     {
  //       text: "Що таке JavaScript?",
  //       answers: [
  //         { text: "Мова програмування", weight: 10 },
  //         { text: "Фреймворк", weight: 0 },
  //         { text: "База даних", weight: 0 },
  //       ],
  //     },
  //     {
  //       text: "Для чого використовується HTML?",
  //       answers: [
  //         { text: "Для стилізації сторінки", weight: 0 },
  //         { text: "Для структурування сторінки", weight: 10 },
  //         { text: "Для обробки запитів", weight: 0 },
  //       ],
  //     },
  //   ],
  //   results: [
  //     {
  //       maxScore: 9,
  //       minScore: 0,
  //       text: "Ні, Ви не Близнюки! Може, у Вас біологічний годинник зламався?\n",
  //     },
  //     {
  //       maxScore: 19,
  //       minScore: 10,
  //       text: "Може, Ви і Близнюки, але не дуже близнюкові!\n",
  //     },
  //     {
  //       maxScore: 21,
  //       minScore: 20,
  //       text: "Ви - справжні Близнюки!",
  //     },
  //   ],
  // };

  const testId = 1;

  fetch(`http://localhost:4000/api/tests/${testId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      const testJSON = data.post;

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
        questionDiv.className = "border bg-light rounded p-3 mb-3";

        const questionText = document.createElement("p");
        questionText.textContent = `${questionIndex + 1}. ${question.text}`;
        questionText.className = "mb-2 fs-5";
        questionDiv.appendChild(questionText);

        question.answers.forEach((answer, answerIndex) => {
          const answerDiv = document.createElement("div");
          answerDiv.className = "form-check";

          const answerInput = document.createElement("input");
          answerInput.type = "radio";
          answerInput.name = `question-${questionIndex}`;
          answerInput.id = `question-${questionIndex}-answer-${answerIndex}`;
          answerInput.value = answer.weight;
          answerInput.required = true;
          answerInput.className = "form-check-input";

          const answerLabel = document.createElement("label");
          answerLabel.textContent = answer.text;
          answerLabel.htmlFor = `question-${questionIndex}-answer-${answerIndex}`;
          answerLabel.className = "form-check-label";

          answerDiv.appendChild(answerInput);
          answerDiv.appendChild(answerLabel);

          questionDiv.appendChild(answerDiv);
        });

        form.appendChild(questionDiv);
      });

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.id = "submit-button";
      submitButton.textContent = "Завершити тест";
      submitButton.className = "btn btn-primary";

      form.appendChild(submitButton);

      // Обробка результатів тесту
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        let totalScore = 0;

        formData.forEach((value) => {
          totalScore += parseInt(value, 10);
        });

        const resultDivOld = document.getElementById("result-div");
        if (resultDivOld) resultDivOld.remove();

        const resultDiv = document.createElement("div");
        resultDiv.className =
          "border border-success bg-light rounded p-3 mb-3 mt-3";
        resultDiv.id = "result-div";

        const resultScore = document.createElement("p");
        resultScore.className = "fs-5 mb-2";
        resultScore.textContent = `Ви набрали: ${totalScore} балів.`;

        const resultText = document.createElement("p");
        resultText.className = "fs-5 mb-2";

        let resultTextContent = "";
        testJSON.results.forEach((result) => {
          if (totalScore >= result.minScore && totalScore <= result.maxScore) {
            resultTextContent = result.text;
          }
        });

        resultText.textContent = resultTextContent;

        resultDiv.appendChild(resultScore);
        resultDiv.appendChild(resultText);

        const submitButton = document.getElementById("submit-button");
        submitButton.insertAdjacentElement("beforebegin", resultDiv);

        // form.appendChild(resultDiv);
        // form.remove();
      });

      // Додавання всіх елементів до сторінки
      app.appendChild(title);
      app.appendChild(description);
      app.appendChild(form);
    })
    .catch((error) => console.error("Error:", error));
});
