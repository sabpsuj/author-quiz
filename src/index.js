import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: "Mark Twain",
        imageUrl: "images/authors/marktwain.jpg",
        imageSource: "Wikimedis Commons",
        books: [
            'The Adventures of Huckelberry Finn',
            'Life on the Mississippi',
            'Roughing in'
        ]
    },
    {
        name: "Joseph Conrad",
        imageUrl: "images/authors/conrad.png",
        imageSource: "Wikimedis Commons",
        books: [
            'Heart of Darkness'
        ]
    },
    {
        name: "J.K. Rowling",
        imageUrl: "images/authors/rowling.jpg",
        imageSource: "Wikimedis Commons",
        books: [
            'Harry Poter and the Sorcerers Stones'
        ]
    },
    {
        name: "Stephen King",
        imageUrl: "images/authors/stephenKing.jpg",
        imageSource: "Wikimedis Commons",
        books: [
            'The Shining',
            'IT'
        ]
    },
    {
        name: "Charles Dickens",
        imageUrl: "images/authors/dickens.jpg",
        imageSource: "Wikimedis Commons",
        books: [
            'David Copperfield'
        ]
    },
    {
        name: "William Shakespeare",
        imageUrl: "images/authors/shakespeare.jpg",
        imageSource: "Wikimedis Commons",
        books: [
            'Hamlet',
            'Macbeth',
            'Romeo and Juliet'
        ]
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function(p, c, i) {
        return p.concat(c.books)
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => 
            title === answer))
    }
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, 
    action) {
    switch(action.type) {
        case 'ANSWER_SELECTED' :
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign(
                {},
                state, {
                    highlight: isCorrect ? 'correct' : 'wrong'
                });
        case 'CONTINUE':
            return Object.assign(
                {}, 
                state, {
                    highlight: '',
                    turnData: getTurnData(state.authors)
                });
        case 'ADD_AUTHOR':
            return Object.assign(
                {},
                state, {
                    authors: state.authors.concat([action.author])
                }
            )
        default: return state;
    }
    return state;
};

let store = Redux.createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <Route exact path="/" component={AuthorQuiz}/>
            <Route exact path="/add" component={AddAuthorForm}/>
        </ReactRedux.Provider> 
    </BrowserRouter>,  
document.getElementById('root'));


serviceWorker.unregister();
