// INFO: JS file needs to be deferred!

;((global) => {
    let M = {};
    const categoryEl = document.querySelector("#category");
    const questionEl = document.querySelector("#question");
    const answerOptionsEls = document.querySelectorAll("#answers > .option");
    const errorMsgEl = document.querySelector("#error");
    const messageEl = document.querySelector("#message");
    const categoryOptionsEl = document.querySelector("#category-selection");
    const difficultyOptionsEl = document.querySelector("#difficulty-selection");
    const questionNumberOptionsEl = document.querySelector("#number-of-questions-selection");
    const playAgainEl = document.querySelector("#apply-settings");
    const scoreEl = document.querySelector("#score");
    const nextQuestionEl = document.querySelector("#next-question");
    const issueURL = "https://github.com/Craftidore/craftidore.github.io/issues";
    const defaultCategory = "no-category";
    state["currentCategory"] = defaultCategory;
    const defaultDifficulty = "no-difficulty";
    state["currentDifficulty"] = defaultDifficulty;
    const defaultNumQs = 10;
    state["currentNumQs"] = defaultNumQs;

    /* Setting up the Document: */

    M.initOpts = () => {
        for (opt of [categoryOptionsEl, difficultyOptionsEl, questionNumberOptionsEl]) {
            opt.addEventListener("change", () => {
                events.broadcastEvent(e.optsChange);
            })
        }
    }

    M.populateCategories = (categories) => {
        for (let category of categories) {
            const optionEl = document.createElement("option");
            optionEl.setAttribute("value", category.uid);
            optionEl.innerText = category.display;
            categoryOptionsEl.appendChild(optionEl);
        }
        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", defaultCategory);
        defaultOption.innerText = defaultCategory;
        defaultOption.setAttribute("selected", ""); //  to make it the default option;
        categoryOptionsEl.appendChild(defaultOption);
    }

    M.populateDifficulties = (difficulties) => {
        // INFO: difficulties are a hardcoded array, not pulled from the API
        for (let difficulty of difficulties) {
            const optionEl = document.createElement("option");
            optionEl.setAttribute("value", difficulty);
            optionEl.innerText = difficulty;
            difficultyOptionsEl.appendChild(optionEl);
        }
        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", defaultDifficulty);
        defaultOption.innerText = defaultDifficulty;
        defaultOption.setAttribute("selected", ""); //  to make it the default option;
        difficultyOptionsEl.appendChild(defaultOption);
    }

    M.populateQuestionNumber = () => {
        for (let i = 1; i <= 20; i++) {
            const optionEl = document.createElement("option");
            optionEl.setAttribute("value", i.toString());
            optionEl.innerText = i.toString();
            if (i == defaultNumQs) {
                optionEl.setAttribute("selected", "");
            }
            questionNumberOptionsEl.appendChild(optionEl);
        }
    }

    M.registerAnswerEls = () => {
        for (let answer of answerOptionsEls) {
            answer.addEventListener("click", (event) => {
                if (state["guessable"]) {
                    state["answer"]  = event.target.value;
                    events.broadcastEvent(e.questionAnswered);
                }
            });
        }
    }

    M.registerNextQuestion = () => {
        nextQuestionEl.addEventListener("click", (event) => {
            if (state["guessable"]) {
                alert("You haven't answered the current question!");
            }
            else {
                console.log("next question");
                events.broadcastEvent(e.nextQuestion);
            }
        });
    }

    M.registerPlayAgain = () => {
        playAgainEl.addEventListener("click", (event) => {
            events.broadcastEvent(e.newGame);
        });
    }

    /* Reactionary Functions */

    M.showError = () => {
        let error = state["error"]
        errorMsgEl.innerHTML = `An error has occured! Please submit a <a href="${issueURL}">bug report</a>`;
        errorMsgEl.style.display = "block";
        console.error(error);
    }

    M.updateWithQ = () => {
        M.resetAnswers();
        let question = state["question"];
        let category = state["category"];
        let answers = state["answers"];
        // trivia gets values from API so...
        // WARN: DO NOT USE .innerHTML without sanitization!
        categoryEl.innerText = category;
        questionEl.innerText = question;
        for (let i = 0; i < answers.length; i++) {
            answerOptionsEls[i].innerText = answers[i];
            answerOptionsEls[i].value = answers[i];
        }
    }

    M.revealAnswer = () => {
        let correctAnswer = state["correctAnswer"];
        let selectedAnswer = state["answer"];
        for (let answerEl of answerOptionsEls) {
            if (answerEl.value === correctAnswer) {
                answerEl.classList.add("correct");
            }
            else {
                answerEl.classList.add("incorrect");
            }
            if (answerEl.value === selectedAnswer) {
                answerEl.classList.add("selected");
            }
        }
    }

    M.resetAnswers = () => {
        answerOptionsEls.forEach((optionEl) => {
            optionEl.classList.remove("correct");
            optionEl.classList.remove("incorrect");
            optionEl.classList.remove("selected");
        });
    }

    M.updateScore = () => {
        scoreEl.innerText = `${state["score"]} / ${state["questionsAsked"]}`;
    }

    M.optsChange = () => {
        state["currentCategory"] = 
            categoryOptionsEl.options[categoryOptionsEl.selectedIndex].value;
        state["currentDifficulty"] =
            difficultyOptionsEl.options[difficultyOptionsEl.selectedIndex].value;
        state["currentNumQs"] =
            questionNumberOptionsEl.options[questionNumberOptionsEl.selectedIndex].value;
    }

    M.showEndGame = () => {
        messageEl.innerText = `No more questions! Click the Play Again button to play again!`;
        messageEl.classList.add("show");
    }

    M.hideEndGame = () => {
        messageEl.classList.remove("show");
    }

    global.triviaUI = M;
})(window);

