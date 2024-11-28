import { useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import { Skeleton } from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/pagination";

function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "цене",
    sort: "price",
  });
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://6740b1c4d0b59228b7f10754.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : " "
      }&sortBy=${sortType.sort}&order=desc ${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
          {loading && skeletons}
          {items.map((obj) => {
            return <PizzaBlock key={obj.id} {...obj} />;
          })}
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Home;
