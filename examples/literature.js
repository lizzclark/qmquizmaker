const inquirer = require("inquirer");

// array of question objects
const questions = [{"correctAnswer":"b","type":"list","name":"1) Who is the author of Things Fall Apart?","choices":["a) W. B. Yeats","b) Chinua Achebe","c) Arundhati Roy"]},{"correctAnswer":"b","type":"list","name":"2) Which of these novels was written by Emily Bronte?","choices":["a) The Tenant of Wildfell Hall","b) Wuthering Heights","c) Jane Eyre","d) Great Expectations"]},{"correctAnswer":"a","type":"list","name":"3) Which of these works was published earlier?","choices":["a) Pamela, by Samuel Richardson","b) Tristram Shandy, by Laurence Sterne"]}];

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
