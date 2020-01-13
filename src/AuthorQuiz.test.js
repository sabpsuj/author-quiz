import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme,{mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({adapter : new Adapter()});

const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'imgaes/authors/dickens.jpg',
      books:['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
  });
});

describe("When no answer has been selected", ()=> {
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=> {}}/>);
  });

  it("should have no background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
  });
});
