import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodsId from './pages/FoodsId';
import DrinksId from './pages/DrinksId';
import DrinksProgress from './pages/DrinksProgress';
import FoodsProgress from './pages/FoodsProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/foods/:id" render={ (props) => <FoodsId { ...props } /> } />
        <Route path="/drinks/:id" render={ (props) => <DrinksId { ...props } /> } />
        <Route
          path="/drinks/:id/in-progress"
          render={ (props) => <DrinksProgress { ...props } /> }
        />
        <Route
          path="/foods/:id/in-progress"
          render={ (props) => <FoodsProgress { ...props } /> }
        />
        <Route path="/foods" component={ (props) => <Foods { ...props } /> } />
        <Route path="/drinks" component={ (props) => <Drinks { ...props } /> } />
        <Route path="/profile" component={ (props) => <Profile { ...props } /> } />
        <Route path="/done-recipes" render={ (props) => <DoneRecipes { ...props } /> } />
        <Route
          path="/favorite-recipes"
          component={ (props) => <FavoriteRecipes { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
