## QM Quizmaker

A package that creates an interactive command-line quiz from a .txt file of questions and answers

- You install, then run the command “qmquiz” in terminal
- You are prompted to select a quiz.txt file (a template for this is included in the package)
- QMQ creates an inquirer file which contains your quiz!
- Advanced: you’re prompted to give your quiz a name, and then you can run “qmquiz play capitalcities” (or some other command like that) and it plays your capital cities quiz!
- Advanced: the template contains more than 1 possible type of question (multiple choice vs text entry)

### What I’d need to do:

- Create a template .txt file - the user will populate the template with their questions and answers
- Qmquiz.js file that is run when you run the command “qmquiz” (put this command in usr/bin)
- In that file:

1. Inquirer functionality to select template
2. Reads template, gathers quiz info
3. Writes new inquirer file
4. Prints a success message in terminal (“Created your quiz at capitalcities.js! Type qmquiz play capitalcities to play it!”)

### Things I need to research/learn:

Get more familiarity with Inquirer! My sandbox quiz is OK but how is it actually working? How would I add different types of question (this is advanced, to be fair)?
