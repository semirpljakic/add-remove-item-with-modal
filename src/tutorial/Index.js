import React, { useState, useReducer } from 'react';
import Modal from './Modal';
import { data } from '../data';

const reducer = (state, action) => {
  console.log(state);
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'item added',
    };
  }
  if (action.type === 'NO_VALUE') {
    return { ...state, isModalOpen: true, modalContent: 'please enter value' };
  }
  if (action.type === 'CLOSE_MODAL') {
    return { ...state, isModalOpen: false };
  }
  if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter(
      person => person.id != action.payload
    );
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'item removed',
    };
  }

  return state;
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

const Index = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = e => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      setName('');
    } else {
      dispatch({ type: 'NO_VALUE' });
    }
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };
  return (
    <>
      <h4>add/Remove item with modal</h4>

      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}

      <form className='form' onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      {state.people.map(person => {
        const { id, name } = person;
        return (
          <div className='item' key={id}>
            <h4>{name}</h4>
            <button
              onMouseDown={() => dispatch({ type: 'REMOVE_ITEM', payload: id })}
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
