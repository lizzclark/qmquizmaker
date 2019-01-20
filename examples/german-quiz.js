const inquirer = require("inquirer");

// array of question objects
const questions = [{"correctAnswerText":"c. Berlin","type":"list","name":"1) What is the capital of Germany?","choices":["a. Hamburg","b. Cologne","c. Berlin"]},{"correctAnswerText":"b. 3","type":"list","name":"2) How many colours feature on the German flag?","choices":["a. 2","b. 3","c. 4","d. 5"]}];

inquirer.prompt(questions).then(answers => {
  const markingInfo = questions.reduce(
    (acc, question) => {
      const thisQuestion = question.name;
      acc[thisQuestion] = {
        yourAnswer: answers[thisQuestion],
        correctAnswerText: question.correctAnswerText
      };
      if (answers[thisQuestion][0] === question.correctAnswerText[0]) {
        acc.totalScore++;
        return acc;
      } else {
        return acc;
      }
    },
    { totalScore: 0 }
  );
  // log your score
  const topScore = Object.keys(answers).length;
  console.log(`You scored ${markingInfo.totalScore} out of ${topScore}`);
  // ask user if they want to see a full breakdown
  inquirer
    .prompt({
      type: "confirm",
      name: "fullbreakdown",
      message: "Would you like to see a full breakdown?"
    })
    .then(answers => {
      // if user wants a breakdown, log questions and answers
      if (answers.fullbreakdown === true) {
        for (let key in markingInfo) {
          if (key !== "totalScore") {
            console.log(`Question: ${key}`);
            console.log(`Your answer: ${markingInfo[key].yourAnswer}`);
            console.log(
              `Correct answer: ${markingInfo[key].correctAnswerText}`
            );
          }
        }
      } else {
        // no breakdown wanted
        console.log("OK, have a nice day!");
      }
    });
});