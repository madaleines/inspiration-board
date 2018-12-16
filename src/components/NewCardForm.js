import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"];

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    const resetState = {
      text: '',
      emoji: ''
    };

    this.state = {...resetState};
    this.resetState = {...resetState}
  }

  onFieldChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {};
    updatedField[name] = value;
    this.setState(updatedField);
  };

  submitForm = (event) => {
    event.preventDefault();
    const newCard = {...this.state};
    this.props.addCardCallback(newCard);
    this.setState(this.resetState);
  };

  getEmojiList = () => {
  const options = EMOJI_LIST.map((text, index) => {
    const emojiUnicode = emoji.getUnicode(text);
    return <option key={ index } value={ text }>{ emojiUnicode }</option>
  });
  return options;
};

  render() {
    return (
      <section className="new-card-form">
        <h3 className="new-card-form__header">Create a New Inspiration</h3>
        <form onSubmit={ this.submitForm } className="new-card-form__form">
          <label htmlFor="text" className="new-card-form__form-label">Message: </label>
          <textarea name="text" value={this.state.text} onChange={ this.onFieldChange } className="new-card-form__form-textarea"/>
          <label htmlFor="emoji" className="new-card-form__form-label">Emoji: </label>
          <select name="emoji" value={this.state.emoji} onChange={ this.onFieldChange } className="new-card-form__form-select">
            { this.getEmojiList() }
          </select>
          <input type="submit" value="create card" className="new-card-form__form-button"/>
        </form>
      </section>
    )
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired
};

export default NewCardForm;
