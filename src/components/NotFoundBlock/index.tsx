import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className="container">
      <h1 className={styles.root}>Ничего не найдено 😕</h1>
    </div>
  );
}

export default NotFoundBlock;
