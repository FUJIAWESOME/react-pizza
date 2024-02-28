import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
