import { useNavigate } from 'react-router-dom';
import emptyCart from '../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <button onClick={goBack} className="button button--black">
          <span>Вернуться назад</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
