import { useContext, useEffect, useRef, useState } from "react";
import {
  Categories,
  Sort,
  Skeleton,
  PizzaBlock,
  Pagination,
} from "../components/index";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setFilters,
  setPageCount,
} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home() {
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const sortType = sort.sort;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  useEffect(() => {
    if (window.location.search && !isSearch.current) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, [dispatch]);

  const fetchPizzas = () => {
    setLoading(true);
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://6740b1c4d0b59228b7f10754.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType}&order=desc&page=${pageCount}&limit=4${search}`
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPizzas();
  }, [categoryId, sortType, pageCount]);

  useEffect(() => {
    if (isSearch.current) {
      const queryString = qs.stringify({
        sort: sortType,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, pageCount]);

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
          {loading
            ? skeletons
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
