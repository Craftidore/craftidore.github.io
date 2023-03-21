// INFO: Defer & call last

;(() => {
    events.registerEvent(e.init, () => { trivia.getCategories(triviaUI.populateCategories) });
    events.registerEvent(e.init, () => { triviaUI.populateDifficulties(trivia.difficulties) });
    events.registerEvent(e.init, triviaUI.populateQuestionNumber);
    events.registerEvent(e.init, triviaUI.registerAnswerEls);
    events.registerEvent(e.init, triviaUI.registerNextQuestion);
    events.registerEvent(e.init, triviaUI.registerPlayAgain);
    events.registerEvent(e.init, triviaUI.initOpts);
    events.registerEvent(e.init, triviaGame.newTrivia)
    events.registerEvent(e.init, triviaGame.initScore);
    events.registerEvent(e.error, triviaUI.showError);
    events.registerEvent(e.questionsLoaded, triviaGame.registerQuestion);
    events.registerEvent(e.questionsLoaded, triviaUI.updateScore);
    events.registerEvent(e.nextQuestion, triviaGame.getNewQuestion);
    events.onPost(e.nextQuestion, e.askQuestion);
    events.registerEvent(e.askQuestion, triviaUI.updateWithQ);
    events.registerEvent(e.askQuestion, triviaGame.askQuestion);
    events.registerEvent(e.questionAnswered, triviaGame.answerQuestion);
    events.registerEvent(e.questionAnswered, triviaUI.revealAnswer);
    state.setOnChange("questionsAsked", e.updateScore); // updates score every time the number of questions asked has been changed
    events.registerEvent(e.updateScore, triviaUI.updateScore);
    events.registerEvent(e.questionAnswered, triviaGame.checkEndGame);
    events.registerEvent(e.gameOver, triviaUI.showEndGame);
    events.registerEvent(e.hideMessage, triviaUI.hideEndGame);
    events.registerEvent(e.optsChange, triviaUI.optsChange);
    events.registerEvent(e.newGame, triviaGame.newTrivia);
    events.registerEvent(e.newGame, triviaGame.initScore);
    events.registerEvent(e.newGame, triviaUI.updateScore);
    events.onPost(e.newGame, e.hideMessage);

    events.broadcastEvent(e.init);
})();
