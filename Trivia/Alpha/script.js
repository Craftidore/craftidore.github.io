// INFO: JS file needs to be deferred!

// IIFE to limit scope
((global) => {
    let category = document.querySelector("#category");
    let question = document.querySelector("#question");
    let answerOptions = document.querySelectorAll("#answers > .option");
    let errorMsg = document.querySelector("#error");
    let issueURL = "https://github.com/Craftidore/craftidore.github.io/issues";
    let categoryOptions = document.querySelector("#category-selection");
    let difficultyOptions = document.querySelector("#difficulty-selection");
    let questionNumberOptions = document.querySelector("#number-of-questions-selection");
    let playAgain = document.querySelector("#apply-settings");
    let currentCategory = "no-category";
    let currentDifficulty = "no-difficulty";
    let currentNumQs = 10;
    let scoreSpan = document.querySelector("#score");
    let score = 0;
    let nextQuestion = document.querySelector("#next-question");

    let resetAnswers = () => {
        answerOptions.forEach((option) => {
            option.classList.remove("correct");
            option.classList.remove("incorrect");
            option.classList.remove("selected");
        });
    }

    let updateWithQ = () => {
        resetAnswers();
        let q = trivia.question(); // I don't want to retype trivia.question();
        // trivia gets values from API so...
        // WARN: DO NOT USE .innerHTML without sanitization!
        category.innerText = q.category;
        question.innerText = q.question;
        let qAnswers = trivia.getRandomizedAnswers();
        for (let i = 0; i < answerOptions.length; i++) {
            answerOptions[i].innerText = qAnswers[i];
        }
        // undefined.bob
    }

    let revealAnswer = (answer) => {
        let possibleAnswer = answer.childNodes[0].nodeValue;
        let q = trivia.question(); // I don't want to retype trivia.question();
        for (option of answerOptions) {
            if (option.childNodes[0].nodeValue === q.correctAnswer) {
                option.classList.remove("incorrect");
                option.classList.add("correct");
                if (answer === option) {
                    score++;
                }
            }
        }
        scoreSpan.innerText = score + "/" + trivia.questionNumber();
    }

    let showError = (error) => {
        errorMsg.innerHTML = `An error has occured! Please submit a <a href="${issueURL}">bug report</a>`;
        errorMsg.style.display = "block";
        console.error(error);
    }

    let populateCategories = (categories) => {
        // Sanitizer.sanitize is not combatible with basically any browsers
        // So using a workaround to then use .innerText over .innerHTML
        console.dir(categories)
        let optionsString = "";
        for (let i = 0; i < categories.length; i++) {
            optionsString += "<option></option>";
        }
        optionsString += `<option value="no-category" selected>All</option>`;
        categoryOptions.innerHTML = optionsString;
        // now we can input the data
        for (let i = 0; i < categoryOptions.children.length-1; i++) {
            let opt = categoryOptions.children[i];
            let cat = categories[i];
            opt.value = cat.uid;
            opt.innerText = cat.display;
        }
    }

    let populateDifficulties = () => {
        // INFO: difficulties are a hardcoded array, not pulled from the API
        let diffString = "";
        for (let i = 0; i < trivia.difficulties.length; i++) {
            diffString += `<option value="${trivia.difficulties[i]}">${trivia.difficulties[i]}</option>`;
        }
        diffString += `<option value="no-difficulty" selected>None</option>`;
        difficultyOptions.innerHTML = diffString;
    }

    let populateQuestionNumber = () => {
        let numQsString = "";
        for (let i = 1; i <= 20; i++) {
            numQsString += 
            `<option value="${i}" ${i == 10 ? "selected" : ""}>${i} Question${
            i > 1 ? "s" : ""}</option>`;
        }
        questionNumberOptions.innerHTML = numQsString;
    }

    let getOpts = () => {
        return {
            "category": currentCategory !== "no-category" ? currentCategory : null,
            "difficulty": currentDifficulty !== "no-difficulty" ? currentDifficulty : null,
            "limit": currentNumQs,
            "region":"US",
        }
    }

    let init = () => {
        trivia.getTrivia(getOpts(), updateWithQ, showError);
        for (let i = 0; i < answerOptions.length; i++) {
            answerOptions[i].addEventListener("click", () => {
                answerOptions.forEach((option) => {
                    option.classList.add("incorrect");
                });
                answerOptions[i].classList.add("selected");
                revealAnswer(answerOptions[i]);
            });
        }
        nextQuestion.addEventListener("click", () => {
            trivia.nextQuestion();
            if (trivia.hasQuestions()) {
                updateWithQ();
            }
            else {
                alert("Game over! Click Play Again");
            }
        });
        trivia.getCategories(populateCategories);
        populateDifficulties();
        populateQuestionNumber();
        playAgain.addEventListener("click", () => {
            score = 0;
            scoreSpan.innerText = "";
            trivia.getTrivia(getOpts(), updateWithQ, showError);
        });
        categoryOptions.addEventListener("change", () => {
            currentCategory = categoryOptions.options[categoryOptions.selectedIndex].value;
        });
        difficultyOptions.addEventListener("change", () => {
            currentDifficulty = difficultyOptions.options[difficultyOptions.selectedIndex].value;
        });
        questionNumberOptions.addEventListener("change", () => {
            currentNumQs = questionNumberOptions.options[questionNumberOptions.selectedIndex].value;
        });
    }

    init();
})(window);
