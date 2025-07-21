import React from 'react';
import DeckList from '../components/DeckList';

const DecksPage = () => {
  return (
    <div>
      <h2>Flashcard Decks</h2>
      <p>Here you will find all the available flashcard decks. Choose one to start learning!</p>
      <DeckList />
    </div>
  );
};

export default DecksPage;
