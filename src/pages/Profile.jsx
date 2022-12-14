import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function Profile() {
  const loggedEmail = localStorage.getItem('user');

  const user = () => {
    if (loggedEmail) {
      return JSON.parse(loggedEmail).email;
    }
    return '';
  };

  return (
    <div>
      <p data-testid="profile-email">
        {user()}
      </p>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
