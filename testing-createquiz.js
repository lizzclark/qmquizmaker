const fs = require("fs");
const fse = require("fs-extra");
const child_process = require("child_process");

function createQuiz(fileName) {
  // read file and format data for inquirer
  fse
    .readFile(`./${fileName}`, "utf8")
    .then(fileContents => {
      // remove initial comment, ##title##, ##end##, and split questions into array
      const fileTextArray = fileContents
        .split("##\n\n")[1]
        .split("\n\n")
        .slice(0, -1);
      // make each question into an inquirer prompt object
      const questionObjects = fileTextArray.reduce((acc, questionText) => {
        const lines = questionText.split("\n");
        const correctAnswer = lines[lines.length - 1].slice(-1);
        const correctAnswerText = lines.slice(1, -1).filter(line => {
          return line[0] === correctAnswer;
        })[0];
        acc.push({
          correctAnswerText,
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
      fs.readFile(
        `${__dirname}/testing-skeleton.txt`,
        "utf8",
        (err, skeletonString) => {
          if (err) console.log(err);
          else {
            const populatedString = skeletonString.replace(
              "PLACEHOLDER1",
              JSON.stringify(questionsData)
            );
            // write full quiz code to file
            const quizName = fileName.slice(0, -4);
            fs.writeFile(
              `${process.cwd()}/${quizName}.js`,
              populatedString,
              err => {
                if (err) console.log(err);
                // use child process to install inquirer in working directory
                else
                  child_process.exec(`npm i inquirer`, null, err => {
                    if (err) console.log(err);
                    else {
                      console.log(
                        `Succesfully created your quiz! Run ${quizName}.js to play`
                      );
                    }
                  });
              }
            );
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = createQuiz;
