import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { faIdCardAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = (props) => {
  const { title, icon } = props;
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logoutUser, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContacts();
  };

  const loggedOut = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>{' '}
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const loggedIn = (
    <ul>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <FontAwesomeIcon icon={icon} /> {title}
      </h1>
      <Fragment>{isAuthenticated ? loggedIn : loggedOut}</Fragment>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: faIdCardAlt,
};

export default Navbar;
