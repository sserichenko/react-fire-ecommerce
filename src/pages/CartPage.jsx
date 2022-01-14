import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useEffect(() => {
    let tempAmount = 0;
    tempAmount = cartItems.reduce(function (previousValue, currentValue) {
      return Number(previousValue) + Number(currentValue.price);
    }, 0);
    setTotalAmount(tempAmount);
  }, [cartItems]);

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: id });
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const placeOrder = async () => {
    setIsLoading(true);
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).email,
      userID: JSON.parse(localStorage.getItem('currentUser')).uid,
    };

    console.log('orderInfo', orderInfo);

    try {
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo);
      console.log(result);
      setIsLoading(false);
      toast.success('Order has been added successfully');
      handleClose();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Order failed');
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          {cartItems.length ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((cartItem) => (
                      <tr key={cartItem.id}>
                        <td>
                          <img src={cartItem.imageUrl} width="50px" height="auto" alt="Product" />
                        </td>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td>
                          <FaTrash onClick={() => removeItem(cartItem.id)} role="button" />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end mb-3">
                <h3 className="total-amount">
                  Total Amount : <strong>{totalAmount.toLocaleString()}</strong> UAH
                </h3>
              </div>
              <div className="d-flex justify-content-end">
                <button onClick={handleShow} className="btn btn-primary">
                  Place order
                </button>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add your address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="register-form">
                    <h2>Order contacts</h2>
                    <hr />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      rows="4"
                      type="text"
                      className="form-control"
                      placeholder="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="pincode"
                      value={pincode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={placeOrder}>
                    Order
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <p className="text-center fs-2">There are no products in the Cart</p>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
