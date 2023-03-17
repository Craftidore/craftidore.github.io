
;((global) => {
    let M = {};

    M.initScore = () => {
        state["score"] = 0;
        state["questionsAsked"] = 0;
    }

    let getOpts = () => {
        return {
            "category": state["currentCategory"] !== "no-category" ? state["currentCategory"] : null,
            "difficulty": state["currentDifficulty"] !== "no-difficulty" ? state["currentDifficulty"] : null,
            "limit": state["currentNumQs"],
            "region":"US",
        }
    }

    M.newTrivia = () => {
        state["guessable"] = false; // trivia hasn't loaded
        trivia.getTrivia(getOpts(), 
            (data) => { 
                console.log("trivia acquired");
                events.broadcastEvent(e.questionsLoaded); 
                events.broadcastEvent(e.askQuestion);
            }, (error) => {
                state["error"] = error;
                events.broadcastEvent(e.error);
        });
        state["score"] = 0;
        state["questionsAsked"] = 0;
    }

    M.incScore = () => {
        let newScore = state["score"] + 1;
        state["score"] = newScore;
    }

    M.getNewQuestion = () => {
        trivia.nextQuestion();
        if (trivia.hasQuestions) {
            M.registerQuestion();
            events.broadcastEvent(e.askQuestion);
        }
        else {
            events.broadcastEvent(e.gameOver);
        }
    }

    M.registerQuestion = () => {
        state["question"] = trivia.question.question;
        state["category"] = trivia.question.category;
        state["answers"] = trivia.getRandomizedAnswers();
        state["correctAnswer"] = trivia.question.correctAnswer;
    }

    M.askQuestion = () => {
        state["guessable"] = true;
    }

    M.answerQuestion = () => {
        if (state["guessable"]) {
            if (state["answer"] === state["correctAnswer"]) {
                M.incScore();
            }
            state["guessable"] = false;
            state["questionsAsked"] = state["questionsAsked"] + 1;
            events.broadcastEvent(e.updateScore);
        }
    }

    global.triviaGame = M;
})(window);

