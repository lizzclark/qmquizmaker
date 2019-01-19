const inquirer = require("inquirer");

// array of question objects
const questions = [object Object],[object Object];

inquirer.prompt(questions).then(answers => {
  // add up the score, and display it with a message
  const totalScore = Object.values(answers).reduce((acc, curr) => {
    return acc + +curr;
  }, 0);
  const topScore = Object.keys(answers).length;
 console.log("You scored", totalScore, "out of", topScore)
});