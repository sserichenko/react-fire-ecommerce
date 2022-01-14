import React, { useState, useEffect } from 'react';
import { collection, addDoc, setDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Modal, Button, Tabs, Tab} from 'react-bootstrap';
import fireDB from '../fireConfig';
import Layout from '../components/Layout';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    imageUrl: '',
    category: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getOrders = async () => {
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
    getOrders();
  }, []);

  const editHandler = (product) => {
    setProduct(product);
    setAdd(false);
    handleShow(true);
  };

  const updateProduct = async () => {
    try {
      setIsLoading(true);
      await setDoc(doc(fireDB, 'products', product.id), product);
      setIsLoading(false);
      getData();
      toast.success('Product has been edited successfully');
      handleClose();
      setProduct({
        name: '',
        price: 0,
        imageUrl: '',
        category: '',
      });
    } catch (err) {
      setIsLoading(false);
      toast.error('Edites failed. Try again later');
      handleClose();
      console.log(err);
    }
  };

  const addHandler = () => {
    setProduct({
      name: '',
      price: 0,
      imageUrl: '',
      category: '',
    });
    setAdd(true);
    setShow(true);
  };

  const addProduct = async () => {
    try {
      setIsLoading(true);
      await addDoc(collection(fireDB, 'products'), product);
      setIsLoading(false);
      getData();
      toast.success('Product has been added');
      handleClose();
      setProduct({
        name: '',
        price: 0,
        imageUrl: '',
        category: '',
      });
    } catch (e) {
      setIsLoading(false);
      toast.error('Adding product failed');
      handleClose();
      console.log(e);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(fireDB, 'products', id));
      setIsLoading(false);
      getData();
      toast.success('Product has been deleted');
    } catch (err) {
      setIsLoading(false);
      toast.error('Product deleting false');
      console.log(err);
    }
  };

  return (
    <Layout isLoading={isLoading}>
      <div className="container">
        {/*  */}
        <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="products" title="Products">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>
                <strong>Products List</strong>
              </h3>
              <button onClick={addHandler}>Add Product</button>
            </div>

            <table className="table productTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.imageUrl} width="50px" height="auto" alt="Product" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>
                        <FaTrash
                          role="button"
                          fill="red"
                          className="mx-2"
                          onClick={() => deleteProduct(product.id)}
                        />
                        <FaEdit role="button" fill="blue" onClick={() => editHandler(product)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{add ? 'Add new Product' : 'Edit current product'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="register-form">
                  <h2>{add ? 'New Product' : 'Edit'}</h2>
                  <hr />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  />
                  <input
                    rows="4"
                    type="text"
                    className="form-control"
                    placeholder="imgUrl"
                    value={product.imageUrl}
                    onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={add ? () => addProduct(product) : updateProduct}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Tab>
          <Tab eventKey="orders" title="Orders">
          {orders &&
          orders.map((order, i) => (
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
          </Tab>
          <Tab eventKey="users" title="Users">
              <p>Contacts</p>
          </Tab>
        </Tabs>
        {/*  */}
      </div>
    </Layout>
  );
};

export default AdminPage;
