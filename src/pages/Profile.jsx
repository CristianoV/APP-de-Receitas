import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const loggedEmail = localStorage.getItem('user');
  const loggerUser = JSON.parse(loggedEmail).email;

  return (
    <div>
      <p data-testid="profile-email">
        {loggerUser}
      </p>
      <Link to="/Done Recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/Favorite Recipes">
        <button
          ata-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/Login">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ localStorage.clear() }
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

export default Profile;
