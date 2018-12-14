import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  renderCardComponents = () => {
    const cards = CARD_DATA.cards.map((card, index) => {
      return(
        <Card
          key={index}
          text={card.text}
          emoji={card.emoji}
          />
      )
    })
    return cards;
  }

  render() {
    const renderedCards = this.renderCardComponents()
    return (
      <div>
        { renderedCards }
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
