const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");

function createQuiz(fileName) {
  // read file and format data for inquirer
  fse
    .readFile(`./${fileName}`, "utf8")
    .then(fileContents => {
      const fileTextArray = fileContents.split("\n\n");
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
      // replace placeholder with data in skeleton file
      fs.readFile("./skeleton.txt", "utf8", (err, skeletonString) => {
        if (err) console.log(err);
        else {
          const populatedString = skeletonString.replace(
            "PLACEHOLDER",
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
