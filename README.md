## QM Quizmaker

A package that creates an interactive command-line quiz from a .txt file of questions and answers

- You install, then run the command “qmquiz” in terminal
- You are prompted to select a .txt file containing your questions and answers (a template for this is included in the package)
- QMQ creates a .js file which contains your quiz!

### Todo
- Tidy up the project - a clear template to populate with your Qs and As, more fleshed-out README, delete archive
- Global command line availability: add "#!/usr/bin/env/ node" to index.js and put the command "qmquiz" in bin

### Future features
- More prompt types: the template contains more than 1 possible type of question (multiple choice vs text entry)
- Quiz aliases: you’re prompted to give your quiz a name, and then you can run “qmquiz play capitalcities” (or some other command like that) and it plays your capital cities quiz
