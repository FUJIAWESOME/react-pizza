import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => (
  <div className="wrapper">
    <Header />
    <div className="content">
      <Outlet />
    </div>
  </div>
);

export default Layout;
