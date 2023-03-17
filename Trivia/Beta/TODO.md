# TODO list for converting Trivia from Alpha to Beta

- [ ] Analyze HTML
- `script.js` rewrite
    - [ ] const where better
    - [ ] Create rudimentary event/state handling
    - [ ] Separate initialization (adding onclicks) from app functionality/behavior
    - [ ] Stop creating elements via strings & use some form of constructor
        - [W3C docs on the subject](https://www.w3schools.com/js/js_htmldom_nodes.asp)
- `style.css` adjustments
    - [ ] Color fixes (contrast issues)
        - See [webaim](https://webaim.org/articles/contrast/)
    - [ ] Split into categories
    - [ ] Better variables
- `trivia.js` adjustments
    - [x] let to const in a couple of places
    - [ ] `URLSearchParams` to simplify triviaURLQuery()
    - [x] Using getters instead of functions for some things
        - See [adding a getter to existing function](https://stackoverflow.com/a/37808429)

