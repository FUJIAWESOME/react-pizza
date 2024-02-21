import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="311" rx="10" ry="10" width="280" height="89" />
    <rect x="0" y="425" rx="10" ry="10" width="91" height="27" />
    <rect x="126" y="414" rx="20" ry="20" width="152" height="46" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="28" />
  </ContentLoader>
);

export default Skeleton;
