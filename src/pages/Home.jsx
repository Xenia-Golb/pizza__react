import { useContext, useEffect, useState } from "react";
import { Categories } from "../components/index";
import { Sort } from "../components/index";
import { Skeleton } from "../components/index";
import { PizzaBlock } from "../components/index";
import { Pagination } from "../components/index";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import axios from "axios";

function Home() {
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const sortType = sort.sort;
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://6740b1c4d0b59228b7f10754.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType}&order=desc&page=${pageCount}&limit=4${search}`
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, search, pageCount]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setPageCount(page));
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
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
