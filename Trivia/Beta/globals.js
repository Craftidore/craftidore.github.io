// INFO: Don't defer, just trigger after state.js

;((global) => {
    // Yes, this would make more sense as an enum... No, I won't make it one.
    global.e = {
        init: "init",
        error: "error",
        hideMessage: "hideMessage",
        questionsLoaded: "questionsLoaded",
        questionUnanswered: "questionUnanswered",
        nextQuestion: "nextQuestion",
        askQuestion: "askQuestion",
        questionAnswered: "questionAnswered",
        updateScore: "updateScore",
        checkGameOver: "checkGameOver",
        gameOver: "gameOver",
        newGame: "newGame",
        optsChange: "optsChange",
    };

    state.registerState("currentCategory");
    state.registerState("currentDifficulty");
    state.registerState("currentNumQs");
    state.registerState("question");
    state.registerState("category");
    state.registerState("answers");
    state.registerState("answer");
    state.registerState("correctAnswer");
    state.registerState("questionsAsked");
    state.registerState("score");
    state.registerState("guessable");
    state.registerState("gameGoing");
})(window);

