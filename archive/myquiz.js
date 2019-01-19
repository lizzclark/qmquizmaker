const inquirer = require("inquirer");

// array of question objects
const questions = [
  {
    correctAnswer: "b",
    type: "list",
    name: "1) What is the capital of Germany?",
    choices: ["a. Hamburg", "b. Berlin", "c. Cologne"]
  },
  {
    correctAnswer: "a",
    type: "list",
    name: "2) How many floors does the Empire State Building have?",
    choices: ["a. 102", "b. 202", "c. 302", "d. 402"]
  }
];

inquirer.prompt(questions).then(answers => {
  const topScore = Object.keys(answers).length;
  const totalScore = questions.reduce((acc, question) => {
    const thisQuestion = question.name;
    if (answers[thisQuestion][0] === question.correctAnswer) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  console.log("Total score", totalScore, "out of", topScore);
});
