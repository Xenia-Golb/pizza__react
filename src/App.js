import './sass/app.scss';
import Categories from './components/categories/Categories';
import Header from './components/header/Header';
import Sort from './components/sort/Sort';
import PizzaBlock from './components/pizza-block/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
          <Categories />
          <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
           <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
