const inquirer = require("inquirer");

// array of question objects
const questions = [{"correctAnswer":"a","type":"list","name":"1 - What is the capital of England?","choices":["a - London","b - Gibraltar","c - Nottingham"]},{"correctAnswer":"a","type":"list","name":"2 - What is the capital of Spain?","choices":["a - Madrid","b - Santander","c - Barcelona","d - Sevilla"]}];

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
  console.log(`You scored ${totalScore} out of ${topScore}`);
});
