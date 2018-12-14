import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
  renderText = () => {
    if (this.props.text) {
      return(
        <p className="card__content-text">{ this.props.text }</p>
      )
    }
  }

  renderEmoji = () => {
    if (this.props.emoji) {
      return(
        <p className="card__content-emoji">{ emoji.getUnicode(this.props.emoji) }</p>
      )
    }
  }

  selectDelete = () => {
    console.log(this.props.id, this.props.index)
    this.props.deleteCardCallback(this.props.id, this.props.index)
  }

  render() {
    const renderedText = this.renderText()
    const renderedEmoji = this.renderEmoji()

    return (
      <section className="card">
        <div className="card__content">
          { renderedText }
          { renderedEmoji }
        </div>
        <button type="button" onClick={ this.selectDelete }>x</button>

      </section>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteCardCallback: PropTypes.func.isRequired
};

export default Card;
