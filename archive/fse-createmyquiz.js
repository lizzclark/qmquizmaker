const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");

// read file and format data for inquirer
fse
  .readFile("./myquiz.txt", "utf8")
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
    //
    console.log(questionsData);
    fs.readFile("./skeleton.txt", "utf8", (err, skeletonString) => {
      if (err) console.log(err);
      else {
        console.log(skeletonString);
        const populatedString = skeletonString.replace(
          "PLACEHOLDER",
          JSON.stringify(questionsData)
        );
        console.log(populatedString);
        fs.writeFile("./myquiz-populated.js", populatedString, err => {
          if (err) console.log(err);
          else console.log("wrote to file!");
        });
      }
    });
  })
  .catch(err => {
    console.log(err);
  });

// write a file that contains the js code

//   const myQuizCode1 = `const inquirer = require("inquirer");

// // array of question objects
// const questions = `;

//   const myQuizCode2 = `;

// inquirer.prompt(questions).then(answers => {
//   const topScore = Object.keys(answers).length;
//   const totalScore = questions.reduce((acc, question) => {
//     const thisQuestion = question.name;
//     if (answers[thisQuestion][0] === question.correctAnswer) {
//       return acc + 1;
//     } else {
//       return acc;
//     }
//   }, 0);
//   console.log("Total score", totalScore, "out of", topScore);
// });
// `;

//   fs.writeFile("./myquiz-string.js", myQuizCode1, err => {
//     if (err) console.log(err);
//     else {
//       console.log(JSON.stringify(questionObjects));
//       fs.appendFile(
//         "./myquiz-string.js",
//         JSON.stringify(questionObjects),
//         err => {
//           if (err) console.log(err);
//           else {
//             fs.appendFile("./myquiz-string.js", myQuizCode2, err => {
//               if (err) console.log(err);
//               else {
//                 console.log("success!");
//               }
//             });
//           }
//         }
//       );
//     }
//   });
// });
