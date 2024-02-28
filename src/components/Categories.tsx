import { CATEGORIES } from '../consts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectCategory, updateCategory } from '../store/reducers/filterSlice';

const Categories: React.FC = () => {
  const activeIndex = useAppSelector(selectCategory);

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
};

export default Categories;
