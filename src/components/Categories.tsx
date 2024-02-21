import { CATEGORIES } from '../consts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateCategory } from '../store/reducers/filterSlice';

function Categories() {
  const activeIndex = useAppSelector((state) => state.filter.category);

  const dispatch = useAppDispatch();

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((item, index) => (
          <li
            key={index}
            onClick={() => dispatch(updateCategory(index))}
            className={activeIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
