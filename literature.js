const inquirer = require("inquirer");

// array of question objects
const questions = [
  {
    correctAnswer: "b",
    correctAnswerText: "b) Chinua Achebe",
    type: "list",
    name: "1) Who is the author of Things Fall Apart?",
    choices: ["a) W. B. Yeats", "b) Chinua Achebe", "c) Arundhati Roy"]
  },
  {
    correctAnswer: "b",
    correctAnswerText: "b) Wuthering Heights",
    type: "list",
    name: "2) Which of these novels was written by Emily Bronte?",
    choices: [
      "a) The Tenant of Wildfell Hall",
      "b) Wuthering Heights",
      "c) Jane Eyre",
      "d) Great Expectations"
    ]
  },
  {
    correctAnswer: "a",
    correctAnswerText: "a) Pamela, by Samuel Richardson",
    type: "list",
    name: "3) Which of these works was published earlier?",
    choices: [
      "a) Pamela, by Samuel Richardson",
      "b) Tristram Shandy, by Laurence Sterne"
    ]
  }
];

inquirer.prompt(questions).then(answers => {
  const markingInfo = questions.reduce(
    (acc, question) => {
      const thisQuestion = question.name;
      acc[thisQuestion] = {
        yourAnswer: answers[thisQuestion],
        correctAnswerText: question.correctAnswerText
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
      console.log(`Correct answer: ${markingInfo[key].correctAnswerText}`);
    }
  }
  const topScore = Object.keys(answers).length;
  console.log(`You scored ${markingInfo.totalScore} out of ${topScore}`);
});
