const inquirer = require("inquirer");

// array of question objects
const questions = [{"correctAnswer":"c","type":"list","name":"1) What is the capital of Germany?","choices":["a. Hamburg","b. Cologne","c. Berlin"]},{"correctAnswer":"b","type":"list","name":"2) How many colours feature on the German flag?","choices":["a. 2","b. 3","c. 4","d. 5"]}];

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
