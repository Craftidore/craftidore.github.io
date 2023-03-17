// INFO: Don't defer, just trigger after state.js

;((global) => {
    global.e = {
        init: "init",
        error: "error",
        questionsLoaded: "questionsLoaded",
        nextQuestion: "nextQuestion",
        askQuestion: "askQuestion",
        updateScore: "updateScore",
        questionAnswered: "questionAnswered",
        gameOver: "gameOver",
        newGame: "newGame",
        optsChange: "optsChange",
    };
    state.registerState("currentCategory", null);
    state.registerState("currentDifficulty", null);
    state.registerState("currentNumQs", null);
    state.registerState("question", null);
    state.registerState("category", null);
    state.registerState("answers", null);
    state.registerState("answer", null);
    state.registerState("correctAnswer", null);
    state.registerState("questionsAsked", null);
    state.registerState("score", null);
    state.registerState("guessable", null);
    state.registerState("currentCategory", null);
    state.registerState("currentDifficulty", null);
    state.registerState("currentNumQs", null);
})(window);

