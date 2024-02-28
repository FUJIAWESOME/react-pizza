import React from 'react';
import { TYPES_PIZZA } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem, selectItemCountById } from '../../store/reducers/cartSlice';
import { ICartItem } from '../../models/ICart';

interface IPizzaBlockProps {
  id: number;
  title: string;
  price: number;
  sizes: Array<number>;
  types: Array<number>;
  imageUrl: string;
}

const PizzaBlock: React.FC<IPizzaBlockProps> = ({ id, title, price, sizes, types, imageUrl }) => {
  const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = React.useState(types[0]);

  const cartItemId = id + sizes[activeSizeIndex] + activeTypeIndex + price;
  const count = useAppSelector(selectItemCountById(cartItemId));

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const cartItem: ICartItem = {
      id: id + sizes[activeSizeIndex] + activeTypeIndex + price,
      title,
      price,
      size: sizes[activeSizeIndex],
      type: activeTypeIndex,
      count: 1,
      imageUrl,
    };

    dispatch(addItem(cartItem));
  };

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
            {count && <i>{count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
