import React from 'react';
import { TYPES_PIZZA } from '../../consts';
import { useAppDispatch } from '../../hooks/redux';
import { addPizza } from '../../store/reducers/cartSlice';
// import isEqual from 'lodash.isequal';

export interface PizzaBlockProps {
  id: number;
  title: string;
  price: number;
  sizes: Array<number>;
  types: Array<number>;
  imageUrl: string;
}

function PizzaBlock({ id, title, price, sizes, types, imageUrl }: PizzaBlockProps) {
  const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = React.useState(types[0]);
  // const cartList = useAppSelector((state) => state.cart.items);
  // console.log('cartList', cartList);

  //const item = cartList.find((item) => isEqual({ ...item, count: 1 }, {id, title, sizes, types, imageUrl, count: 1}));

  // const countRef = React.useRef(0);
  // const [count, setCount] = React.useState(0);
  // const tempId = React.useId();
  const dispatch = useAppDispatch();

  // console.log(activeTypeIndex, activeSizeIndex);
  const handleAddToCart = () => {
    // console.log(activeTypeIndex, types[activeTypeIndex]);
    const cartItem = {
      id: id + sizes[activeSizeIndex] + activeTypeIndex,
      title,
      price,
      size: sizes[activeSizeIndex],
      type: activeTypeIndex,
      count: 1,
      imageUrl,
    };

    // console.log(cartItem);

    dispatch(addPizza(cartItem));
    // dispatch(incrementCount(cartItem));
    // setCount(count + 1);
  };

  // React.useEffect(() => {
  //   const item = cartList.find((item) => {
  //     // console.log(
  //     //   { ...item, count: 1 },
  //     //   { id, imageUrl, price, size: activeSizeIndex, type: activeTypeIndex, title, count: 1 },
  //     // );
  //     return isEqual(
  //       { ...item, count: 1 },
  //       {
  //         id,
  //         imageUrl,
  //         price,
  //         size: sizes[activeSizeIndex],
  //         type: activeTypeIndex,
  //         title,
  //         count: 1,
  //       },
  //     );
  //   });
  //   console.log(item);
  //   if (item) {
  //     setCount(item?.count);
  //     // countRef.current = item?.count;
  //   }
  //   console.log('count', count);
  // }, [activeSizeIndex, activeTypeIndex]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveTypeIndex(index)}
                  className={activeTypeIndex === index ? 'active' : ''}>
                  {TYPES_PIZZA[index]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveSizeIndex(index)}
                  className={activeSizeIndex === index ? 'active' : ''}>
                  {item} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={handleAddToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {/* <i>{count}</i> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
