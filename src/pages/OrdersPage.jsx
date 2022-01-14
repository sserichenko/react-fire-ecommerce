import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// import { FaTrash } from 'react-icons/fa';
import fireDB from '../fireConfig';
import Layout from '../components/Layout';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userID = JSON.parse(localStorage.getItem('currentUser')).uid;

  const getData = async () => {
    setIsLoading(true);
    try {
      const arrivedOrders = await getDocs(collection(fireDB, 'orders'));
      const ordersArray = [];
      arrivedOrders.forEach((order) => {
        // const obj = {
        //   id: order.id,
        //   ...order.data(),
        // };
        ordersArray.push(order.data());
      });
      setOrders(ordersArray);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <div className="container">
        {orders &&
          orders.filter(order => order.userID === userID).map((order, i) => (
            <table className="table order" key={i}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems &&
                  order.cartItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td>
                        <img src={cartItem.imageUrl} width="50px" height="auto" alt="Product" />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ))}
      </div>
    </Layout>
  );
};

export default OrdersPage;
