import { useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import { Skeleton } from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "цене",
    sort: "price",
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `"https://6740b1c4d0b59228b7f10754.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : " "
      }&sortBy=${sortType.sort}&order=desc`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(i) => setCategoryId(i)}
          />
          <Sort value={sortType} onChangeSort={() => setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading &&
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
          {items.map((obj) => {
            return <PizzaBlock key={obj.id} {...obj} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
