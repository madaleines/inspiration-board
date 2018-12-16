import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  getCards = (input) => {
    return input.data.map(inputCard => inputCard.card)
  }

  componentDidMount() {
    const { boardsUrl, boardName, cards } = this.props
    const retrieveListUrl = boardsUrl + boardName + cards

    axios.get(retrieveListUrl)
    .then((response) => {
      const cards = this.getCards(response);
      this.setState({ cards });
    })
    .catch((error) => {
      this.setState({ error: error.message});
    });
  }

  addCard = (newCardData) => {
    const { boardsUrl, boardName, cards } = this.props
    const addCardUrl = boardsUrl + boardName + cards

    axios.post(addCardUrl, newCardData)
    .then((response) => {
      const cards = this.state.cards;
      cards.push(response.data.card);
      this.setState({
        cards,
        message: 'Added a new card successfully!'});
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    };

    deleteCard = (card) => {
      const { cardsUrl } = this.props
      const cardId = card.props.id
      const deleteCardUrl  = cardsUrl + cardId

      axios.delete(deleteCardUrl)
      .then((response) => {
        const cards = this.state.cards;
        const index = card.props.index
        cards.splice(index, 1)
        this.setState({
          cards,
          message: `Sucessfully deleted Card ${response.data.card.id}`
        })
      })
      .catch((error) => {
        this.setState({ error: error.message})
      });
    }

    renderCardComponents = () => {
      const cards = this.state.cards.map((card, index) => {
        return (
          <Card
            key={index}
            text={card.text}
            emoji={card.emoji}
            id={card.id}
            index={index}
            deleteCardCallback={ this.deleteCard }
            />
        )
      })
      return cards;
    }

    renderAddCardCallback = () => {
      return (
        <NewCardForm addCardCallback={this.addCard} />
      )
    }

    render() {
      const renderedCards = this.renderCardComponents()
      const renderedAddCardCallback = this.renderAddCardCallback()

      return (
        <div className="board">
          { renderedAddCardCallback }
          { renderedCards }
        </div>
      )
    }
  }

  Board.propTypes = {
    url: PropTypes.string.isRequired,
    boardName: PropTypes.string.isRequired
  };

  export default Board;
