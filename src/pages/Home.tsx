import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { IPizzaItem } from '../models/IPizzaItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getPizzas } from '../store/reducers/pizzaSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { updateFilters } from '../store/reducers/filterSlice';

function HomePage() {
  const pizzas = useAppSelector((state) => state.pizza.items);
  const isLoading = useAppSelector((state) => state.pizza.isLoading);
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const urlParams = window.location.search;
    const isEmptyParams = !urlParams;

    if (!isEmptyParams) {
      const params = qs.parse(urlParams.substring(1));
      dispatch(updateFilters({ ...params }));
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

      navigate(`?${params}`);
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
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item: IPizzaItem) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default HomePage;
