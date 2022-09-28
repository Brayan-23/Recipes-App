import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Profile.scss';

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
    <div className="profile">
      <h3 data-testid="profile-email">{ email }</h3>
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
