const inquirer = require("inquirer");

// array of question objects
const questions = [
  {
    correctAnswer: "c",
    type: "list",
    name: "1) What is the capital of Germany?",
    choices: ["a. Hamburg", "b. Cologne", "c. Berlin"]
  },
  {
    correctAnswer: "b",
    type: "list",
    name: "2) How many colours feature on the German flag?",
    choices: ["a. 2", "b. 3", "c. 4", "d. 5"]
  }
];

inquirer.prompt(questions).then(answers => {
  const markingInfo = questions.reduce(
    (acc, question) => {
      const thisQuestion = question.name;
      acc[thisQuestion] = {
        yourAnswer: answers[thisQuestion],
        correctAnswer: question.correctAnswer
      };
      if (answers[thisQuestion][0] === question.correctAnswer) {
        acc.totalScore++;
        return acc;
      } else {
        return acc;
      }
    },
    { totalScore: 0 }
  );
  for (let key in markingInfo) {
    if (key !== "totalScore") {
      console.log(`Question: ${key}`);
      console.log(`Your answer: ${markingInfo[key].yourAnswer}`);
      console.log(`Correct answer: ${markingInfo[key].correctAnswer}`);
    }
  }
  const topScore = Object.keys(answers).length;
  console.log(`You scored ${markingInfo.totalScore} out of ${topScore}`);
});
