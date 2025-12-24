import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';

export default function App() {
  const totalCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.count, 0)
  );

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">React Shop Pro</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({totalCount})</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}
