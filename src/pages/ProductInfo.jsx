import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import fireDB from '../fireConfig';
import Layout from "../components/Layout";
import Loader from "../components/Loader";


const ProductInfo = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    const getData = async () => {
      setIsLoading(true);
        try {
          const productTemp = await getDoc(doc(fireDB, 'products', params.productID));
          if(productTemp.exists()){
             setProduct(productTemp.data());
             setIsLoading(false);
          }else{
              console.log("DATA IS NOT DEFINED IN FIREBASE")
          }
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

    return (
        <Layout>
          {isLoading && (<Loader />)}
            {product && (
                <div className="container">
                    <p className="mb-4"><b>{product.name}</b></p>
                    <img src={product.imageUrl} alt="product" className="product-info-img" />
                    <hr />
                    <p className="mb-4">{product.description}</p>
                    <div className="d-flex justify-content-end">
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ProductInfo;