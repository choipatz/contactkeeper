import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    clearCurrent,
    updateContact,
    getContacts,
  } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'PERSONAL',
  });

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'PERSONAL',
      });
    }
  }, [contactContext]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearCurrent();
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'PERSONAL',
    });
  };

  const onClear = (e) => {
    e.preventDefault();
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'PERSONAL',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        value={name}
        name='name'
        onChange={onChange}
      ></input>
      <input
        type='email'
        placeholder='Email'
        value={email}
        name='email'
        onChange={onChange}
      ></input>
      <input
        type='text'
        placeholder='Phone'
        value={phone}
        name='phone'
        onChange={onChange}
      ></input>
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        checked={type === 'PERSONAL'}
        value='PERSONAL'
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        checked={type === 'PROFESSIONAL'}
        value='PROFESSIONAL'
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <button
          type='button'
          onClick={onClear}
          className='btn btn-light btn-block'
        >
          CLEAR
        </button>
      )}
    </form>
  );
};

export default ContactForm;
