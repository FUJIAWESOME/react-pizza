import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { IPizzaItem } from '../models/IPizzaItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { FetchPizzaStatuses, getPizzas, selectPizza } from '../store/reducers/pizzaSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { selectFilter, updateFilters } from '../store/reducers/filterSlice';

const Home: React.FC = () => {
  const { items, status } = useAppSelector(selectPizza);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const urlParams = window.location.search;
    const isEmptyParams = !urlParams;

    if (!isEmptyParams) {
      const params = qs.parse(urlParams.substring(1));
      dispatch(updateFilters({ ...filter, ...params }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(getPizzas(filter));
    }

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [filter]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({ sortBy: filter.sortBy, category: filter.category });
      if (filter.sortBy !== 0 || filter.category !== 0) {
        navigate(`?${params}`);
      } else {
        navigate(`/`);
      }
    }

    isMounted.current = true;
  }, [filter]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === FetchPizzaStatuses.LOADING
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items.map((item: IPizzaItem) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      {status === FetchPizzaStatuses.ERROR && (
        <div className="container">
          <div className="error">
            <h2>Произошла ошибка 😕</h2>
            <p>Не удалось получить пиццы.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
