import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Board from '../Board.js';

describe('Board', () => {
  test('that it renders Board with shallow rendering', () => {
    const wrapper = shallow(<Board url="url"
    boardName="boardName"/>);

    expect(wrapper).toMatchSnapshot();

    // wrapper.unmount();
  });

});
