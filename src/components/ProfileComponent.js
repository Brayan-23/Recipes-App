import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ProfileComponent() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  const storageEmail = () => {
    const getLocalEmail = JSON.parse(localStorage.getItem('user'));
    setEmail(getLocalEmail?.email);
  };

  useEffect(() => {
    storageEmail();
  }, []);

  const clickLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clickLogoutButton }
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileComponent;
