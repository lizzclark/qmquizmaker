const inquirer = require("inquirer");
const fs = require("fs");
const createQuiz = require("./createQuiz.js");

// prompt user to select .txt file to quiz-ify
fs.readdir("./", "utf8", (err, fileNames) => {
  if (err) console.log("Oops, no quiz templates in here!");
  else {
    const quizFiles = fileNames.filter(fileName => {
      return fileName.slice(-4) === ".txt";
    });
    const questions = [
      {
        name: "quiz-file-choice",
        type: "list",
        message: "Select file to run QMQuizmaker",
        choices: quizFiles
      }
    ];
    inquirer.prompt(questions).then(answers => {
      // console log success, and call createQuiz function
      console.log(
        `Creating this quiz: \n${answers["quiz-file-choice"].slice(0, -4)}`
      );
      createQuiz(answers["quiz-file-choice"]);
    });
  }
});
