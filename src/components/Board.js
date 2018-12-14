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

  componentDidMount() {
    const retrieveListUrl = `${this.props.url}${this.props.boardName}/cards`
    axios.get(retrieveListUrl)
    .then((response) => {
      const cards = response.data.map(inputCard => inputCard.card);
      this.setState({ cards });
    })
    .catch((error) => {
      this.setState({ error: error.message});
    });
  }

  addCard = (card) => {
    axios.post(`${this.props.url}${this.props.boardName}/cards`, card)
    .then((response) => {
      let cards = this.state.cards;
      cards.push(response.data.card);
      this.setState({cards,
        message: 'working'});
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    };

    deleteCard = (id, index) => {
      const deleteCardUrl  = `${this.props.cardUrl}${id}`
      const cards = this.state.cards
      console.log(deleteCardUrl)
      axios.delete(deleteCardUrl)
      .then((response) => {
        cards.splice(index, 1)
        this.setState({
          cards,
          message: `Sucessfully deleted Card ${response.data.card.id}`
        })
      })
      .catch((error) => {
        this.setState({ message: error.message})
      });
    }

    renderCardComponents = () => {
      const cards = this.state.cards.map((card, index) => {
        return(
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

    render() {
      const renderedCards = this.renderCardComponents()
      return (

        <div className="board">
          {<NewCardForm addCardCallback={this.addCard} />}
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
