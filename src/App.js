import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Mainpage from './pages/MainPage';
import Explore from './pages/ExplorePages/Explore';
import ExploreDrinks from './pages/ExplorePages/ExploreDrinks';
import ExploreFoods from './pages/ExplorePages/ExploreFoods';
import FoodsIngredients from './pages/ExplorePages/FoodsIngredients';
import DrinksIngredients from './pages/ExplorePages/DrinksIngredients';
import FoodsNacionality from './pages/ExplorePages/FoodsNacionality';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './pages/Profile';

function App() {
  // TODO: Adicionar Header e Footer nas páginas principais Foods e Drinks
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/foods" component={ Mainpage } />
        <Route exact path="/drinks" component={ Mainpage } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
        <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
        <Route exact path="/explore/foods/nationalities" component={ FoodsNacionality } />
        <Route path="/profile" component={ Profile } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
