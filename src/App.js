import React from 'react';
import './css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } title="Drinks" /> }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } title="Foods" /> }
        />
        <Route
          exact
          path="/foods/:id"
          render={ (props) => <RecipeDetails { ...props } title="Foods" /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } title="Drinks" /> }
        />
        <Route exact path="/foods" render={ (props) => <Foods { ...props } /> } />
        <Route exact path="/drinks" render={ (props) => <Drinks { ...props } /> } />
        <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route
          exact
          path="/done-recipes"
          render={ (props) => <DoneRecipes { ...props } /> }
        />
        <Route
          exact
          path="/favorite-recipes"
          component={ (props) => <FavoriteRecipes { ...props } /> }
        />
        <Route path="/" component={ Footer } />
      </Switch>
    </div>
  );
}

export default App;
