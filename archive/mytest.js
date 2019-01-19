const writeQuizCode = require("./writeQuizCode");
const fs = require("fs");

const myData = writeQuizCode([
  {
    type: "list",
    name: "1) What is the capital of Germany?",
    choices: ["a. Hamburg", "b. Berlin", "c. Cologne"],
    filter: function(val) {
      return val[0] === "b" ? 1 : 0;
    }
  },
  {
    type: "list",
    name: "2) How many floors does the Empire State Building have?",
    choices: ["a. 102", "b. 202", "c. 302", "d. 402"],
    filter: function(val) {
      return val[0] === "a" ? 1 : 0;
    }
  }
]);
console.log(myData);
fs.writeFile("./myData.js", myData, err => {
  if (err) console.log("oops");
});
