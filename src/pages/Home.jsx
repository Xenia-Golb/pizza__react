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
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

function Home() {
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza.items);
  const sortType = sort.sort;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);

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

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sort.sort.replace("-", "");
    dispatch(
      fetchPizzas({
        search,
        category,
        sortBy,
        pageCount,
      })
    );
  };

  useEffect(() => {
    getPizzas();
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
        {status === "error" ? (
          <div>Ошибка</div>
        ) : (
          <div className="content__items">
            {status === "loading"
              ? skeletons
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        )}
      </div>
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
