import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
    const { id } = useParams(); // Витягує 'id' із URL
    const [product, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/getoneptoduct/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching product data:', error));
    }, [id]);

    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <div className="cont_info">
            <h2 className="title_product">{product.title}</h2>
                    <p>★★★★★ 5 reviews</p>
                    <p>{product.description}</p>
                    <h2 className="price">${product.price}</h2>
                    <div className="cont_button">
                        <div className="card" 
                            onClick={() => addToCart(product)}
                            >
                            <i className="fas fa-shopping-cart"></i>Add to Cart
                        </div>
                        <div className="like">
                            <i className="fas fa-heart"></i>
                        </div>
                    </div>
        </div>
    );
};

export default ProductInfo;
