// IIFE module

((global) => {
    let M = {};

    const triviaURL = "https://the-trivia-api.com/api/questions";
    const triviaCategoriesURL = "https://the-trivia-api.com/api/categories";
    let questions = [];
    let currentQ = 0;

    M.getCategories = (callback) => {
        fetch(triviaCategoriesURL)
            .then((response) => response.json())
            .then((data) => {
                let categories = [];
                // console.dir(data);
                let keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    // console.dir(key)
                    // console.dir(data[key])
                    categories.push({
                        "display":key,
                        "uid":data[key][0],
                    });
                }
                callback(categories);
            })
            .catch((error) => {
                console.warn("Can't fetch categories!");
                console.error(error);
            });
    }

    M.difficulties = ["null", "hard", "medium", "easy"];

    M.triviaURLQuery = (opts) => {
        let searchParams = new URLSearchParams();
        let validate = (value) => value !== null && value !== undefined;

        for (let key of Object.keys(opts)) {
            if (validate(opts[key])) {
                searchParams.append(key, opts[key]);
            }
        }

        return triviaURL + "?" + searchParams.toString();
    }

    M.getTrivia = (opts, callback, errorCallback=console.error) => {
        (fetch(M.triviaURLQuery(opts)))
            .then((response) => response.json())
            .then((data) => {
                questions = data;
                currentQ = 0;
                callback(data);
            })
            .catch((error) => {
                console.warn("Error in trivia.getTrivia or callback");
                errorCallback(error);
            });
    }

    Object.defineProperty(M, "hasQuestions",{ 
        get: () => { return currentQ < questions.length; }
    });

    Object.defineProperty(M, "questionNumber", { 
        get: () => currentQ+1
    });

    M.nextQuestion = () => {
        currentQ++;
    }

    Object.defineProperty(M, "question", { 
        get: () => questions[currentQ]
    });

    let shuffle = (questions) => {
        // Shuffling code from https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
        for(let i = questions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = questions[i]
            questions[i] = questions[j]
            questions[j] = temp
        }
    }

    M.getRandomizedAnswers = () => {
        let qs = [...M.question.incorrectAnswers];
        qs.push(M.question.correctAnswer);
        shuffle(qs);
        return qs;
    }

    global.trivia = M;
})(window)
