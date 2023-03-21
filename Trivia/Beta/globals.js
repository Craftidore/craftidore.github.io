// INFO: Don't defer, just trigger after state.js

;((global) => {
    // Yes, this would make more sense as an enum... No, I won't make it one.
    global.e = {
        init: "init",
        error: "error",
        hideMessage: "hideMessage",
        questionsLoaded: "questionsLoaded",
        nextQuestion: "nextQuestion",
        askQuestion: "askQuestion",
        updateScore: "updateScore",
        questionAnswered: "questionAnswered",
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
})(window);

