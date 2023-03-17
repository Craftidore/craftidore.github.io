# TODO list for converting Trivia from Alpha to Beta

- [ ] Analyze HTML
- `script.js` rewrite
    - [x] const where better
    - [x] Create rudimentary event/state handling
    - [x] Separate initialization (adding onclicks) from app functionality/behavior
    - [x] Stop creating elements via strings & use some form of constructor
        - [W3C docs on the subject](https://www.w3schools.com/js/js_htmldom_nodes.asp)
- `style.css` adjustments
    - [x] Color fixes (contrast issues)
        - See [webaim](https://webaim.org/articles/contrast/)
        - [ ] Fixed, buuuuut... now it looks ugly.
    - [x] Split into categories
    - [ ] Better variables
    - SCSS conversion? (mixins would be handy)
        - [x] Add mixins
        - [/] Change colors' behavior
- `trivia.js` adjustments
    - [x] let to const in a couple of places
    - [x] `URLSearchParams` to simplify triviaURLQuery()
    - [x] Using getters instead of functions for some things
        - See [adding a getter to existing function](https://stackoverflow.com/a/37808429)

## Colors

- Background: #129490
- Main UI: #A1E887
- Buttons: #4B4E6C
- Text: #FFFFFF
- Settings Text: #000000

