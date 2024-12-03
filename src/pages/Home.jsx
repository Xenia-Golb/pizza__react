import { useContext, useEffect, useState } from "react";
import { Categories } from "../components/index";
import { Sort } from "../components/index";
import { Skeleton } from "../components/index";
import { PizzaBlock } from "../components/index";
import { Pagination } from "../components/index";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Home() {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sort;
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://6740b1c4d0b59228b7f10754.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType}&order=desc&page=${currentPage}&limit=4${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading && skeletons}
          {items.map((obj) => {
            return <PizzaBlock key={obj.id} {...obj} />;
          })}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default Home;
