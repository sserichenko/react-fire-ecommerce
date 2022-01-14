import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaCartPlus, FaUserAlt } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    window.location.reload();
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FireCommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
              <FaBars size={24} color="#fff" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <FaUserAlt /> <i className="px-2">{user.email.split('@')[0]}</i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaCartPlus />{' '}
                  {cartItems.length > 0 && <span>{cartItems && cartItems.length}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
