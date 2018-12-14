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

  render() {
    const renderedText = this.renderText()
    const renderedEmoji = this.renderEmoji()

    return (
      <section className="card">
        <div className="card__content">
          { renderedText }
          { renderedEmoji }
        </div>
      </section>
    )
  }
}

Card.propTypes = {

};

export default Card;
