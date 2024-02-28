import React from 'react';
import { SORT_OPTIONS } from '../consts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectSortBy, updateSort } from '../store/reducers/filterSlice';

const Sort: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedSortIndex = useAppSelector(selectSortBy);
  const dispatch = useAppDispatch();

  const popupRef = React.useRef<HTMLDivElement>(null);

  const sortName = SORT_OPTIONS[selectedSortIndex];

  const handleChangeSort = (index: number) => {
    dispatch(updateSort(index));
    setIsOpen(false);
  };

  const togglePopup = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const closePopupHandler = (e: MouseEvent) => {
      const isInsideClick = e.target === popupRef.current;

      if (!isInsideClick) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', closePopupHandler);

    return () => {
      document.body.removeEventListener('click', closePopupHandler);
    };
  }, []);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={togglePopup}>{sortName}</span>
      </div>
      {isOpen && (
        <div ref={popupRef} className="sort__popup">
          <ul>
            {SORT_OPTIONS.map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleChangeSort(index)}
                  className={selectedSortIndex === index ? 'active' : ''}>
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
