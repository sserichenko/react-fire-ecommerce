import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fireDB from '../fireConfig';

const HomePage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [filterType, setFilterType] = useState('');
  
  //   const addData = async () => {
  //     try {
  //       await addDoc(collection(fireDB, 'products'), {
  //         name: 'Paul',
  //         age: 38,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const getData = async () => {
    setIsLoading(true);
    try {
      const products = await getDocs(collection(fireDB, 'products'));
      const productsArray = [];
      products.forEach((product) => {
        const obj = {
          id: product.id,
          ...product.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  console.log('filterType', filterType);

  return (
    <Layout isLoading={isLoading}>
      <div className="container">
        <div className="d-flex w-50">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <select
            className="form-control"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {products
            ?.filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product, index) => (
              <div className="col-md-4" key={product.id}>
                <div className="m-2 p-2 pb-4 pt-4 product">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img src={product.imageUrl} alt="" className="product-img" />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2 className="mb-3">{Number(product.price)} UAH</h2>
                    <div className="d-flex">
                      <button onClick={() => addToCart(product)} className="mx-2">
                        Add to CART
                      </button>
                      <button onClick={() => navigate(`/productinfo/${product.id}`)}>View</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
