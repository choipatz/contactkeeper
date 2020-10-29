import React, { Fragment, useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const displayContacts = () => {
    if (filtered) {
      return filtered.map((filter) => (
        <CSSTransition key={filter._id} timeout={500} classNames='item'>
          <ContactItem contact={filter} />
        </CSSTransition>
      ));
    } else {
      return contacts.map((contact) => (
        <CSSTransition key={contact._id} timeout={500} classNames='item'>
          <ContactItem contact={contact} />
        </CSSTransition>
      ));
    }
  };

  return (
    <Fragment>
      {contacts != null && !loading ? (
        <TransitionGroup>{displayContacts()}</TransitionGroup>
      ) : <Spinner />}
    </Fragment>
  );
};

export default Contacts;
