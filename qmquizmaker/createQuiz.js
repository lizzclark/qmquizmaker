const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");

function createQuiz(fileName) {
  // read file and format data for inquirer
  fse
    .readFile(`./${fileName}`, "utf8")
    .then(fileContents => {
      // remove comment and split questions into array
      const fileTextArray = fileContents.split("##\n\n")[1].split("\n\n");
      // make each question into an inquirer prompt object
      const questionObjects = fileTextArray.reduce((acc, questionText) => {
        const lines = questionText.split("\n");
        const correctAnswer = lines[lines.length - 1].slice(-1);
        acc.push({
          correctAnswer,
          type: "list",
          name: lines[0],
          choices: lines.slice(1, lines.length - 1)
        });
        return acc;
      }, []);
      return questionObjects;
    })
    .then(questionsData => {
      // populate skeleton file with our inquirer question objects
      fs.readFile("./skeleton.txt", "utf8", (err, skeletonString) => {
        if (err) console.log(err);
        else {
          const populatedString = skeletonString.replace(
            "PLACEHOLDER1",
            JSON.stringify(questionsData)
          );
          // write full quiz code to file
          const quizName = fileName.slice(0, -4);
          fs.writeFile(`./${quizName}.js`, populatedString, err => {
            if (err) console.log(err);
            else
              console.log(
                `Succesfully created your quiz! Run ${quizName}.js to play`
              );
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = createQuiz;
