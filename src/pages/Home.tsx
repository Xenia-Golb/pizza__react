import { useEffect, useRef } from "react";
import {
  Categories,
  Sort,
  Skeleton,
  PizzaBlock,
  Pagination,
} from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setFilters,
  setPageCount,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate, Link } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

function Home() {
  const { categoryId, sort, pageCount, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sort;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => (
    <Link to={`/pizza/${obj.id}`} key={obj.id}>
      <PizzaBlock {...obj} />
    </Link>
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

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
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
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
      </div>
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
