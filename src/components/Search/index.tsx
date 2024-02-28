import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import { useAppDispatch } from '../../hooks/redux';
import { updateSearch } from '../../store/reducers/filterSlice';
import debounce from 'lodash.debounce';
import React from 'react';

const Search: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useAppDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateValue = React.useCallback(
    debounce((value) => {
      dispatch(updateSearch(value));
    }, 250),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateValue(e.target.value);
  };

  const handleClear = () => {
    dispatch(updateSearch(''));
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        type="text"
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {inputValue && (
        <img onClick={handleClear} src={close} className={styles.closeIcon} alt="close" />
      )}
    </div>
  );
};

export default Search;
