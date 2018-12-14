import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"];

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      emoji: ''
    };
  }

  onFieldChange = (event) => {
    let updatedField = {};
    updatedField[event.target.name] = event.target.value;
    this.setState(updatedField);
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.addCardCallback(this.state);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      text: '',
      emoji: ''
    });
  };

  displayEmojiList = () => {
  const options = EMOJI_LIST.map((keyword, index) => {
    const unicode = emoji.getUnicode(keyword);
    return <option key={ index } value={ keyword }>{ unicode }</option>
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
            { this.displayEmojiList() }
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
