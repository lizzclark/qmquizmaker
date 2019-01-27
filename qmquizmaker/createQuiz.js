const fs = require('fs');
const { promisify } = require('util');
const child_process = require('child_process');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exec = promisify(child_process.exec);

function createQuiz(fileName) {
  const quizName = fileName.slice(0, -4);
  // read file and format data for inquirer
  readFile(`./${fileName}`, 'utf8')
    .then(fileContents => {
      // remove initial comment, ##title##, ##end##, and split questions into array
      const fileTextArray = fileContents
        .split('##\n\n')[1]
        .split('\n\n')
        .slice(0, -1);
      // make each question into an inquirer prompt object
      const questionObjects = fileTextArray.reduce((acc, questionText) => {
        const lines = questionText.split('\n');
        const correctAnswerLetter = lines[lines.length - 1].slice(-1);
        const correctAnswerText = lines.slice(1, -1).filter(line => {
          return line[0] === correctAnswerLetter;
        })[0];
        acc.push({
          correctAnswerText,
          type: 'list',
          name: lines[0],
          choices: lines.slice(1, lines.length - 1),
        });
        return acc;
      }, []);
      return questionObjects;
    })
    .then(questionsData => {
      // grab contents of the skeleton file
      return Promise.all([
        questionsData,
        readFile(`${__dirname}/skeleton.txt`, 'utf8'),
      ]);
    })
    .then(([questionsData, skeletonText]) =>
      // populate the skeleton with our inquirer question objects
      {
        const populatedString = skeletonText.replace(
          'PLACEHOLDER1',
          JSON.stringify(questionsData)
        );
        // write full quiz code to file
        return writeFile(`${process.cwd()}/${quizName}.js`, populatedString);
      }
    )
    .then(() => {
      exec(`npm i inquirer`);
    })
    .then(() => {
      console.log(`Succesfully created your quiz! Run ${quizName}.js to play`);
    })
    .catch(err => {
      console.log({ 'Oops, looks like there was an error...': err });
    });
}

module.exports = createQuiz;
