import "./head.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function HeadNav() {
    const [isVisible, setIsVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Стейт для збереження введеного тексту
    const navigate = useNavigate(); // Хук для навігації

    // Функція для отримання товарів з кошика
    const getCart = () => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    };

    useEffect(() => {
        // При монтуванні компонента отримуємо товари з кошика
        setCartItems(getCart());

        // Створення слухача подій для оновлення кошика при зміні localStorage
        const handleStorageChange = () => {
            setCartItems(getCart());
        };

        // Додаємо слухача на подію зміни localStorage
        window.addEventListener("storage", handleStorageChange);

        // Видаляємо слухача при розмонтуванні компонента
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    function removeFromCart(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));

        setCartItems(getCart());
    }

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const handleSearchClick = () => {
        if (searchTerm.trim()) { // Перевірка, чи не пустий рядок
            navigate(`/${searchTerm}`); // Переходить на сторінку пошуку з введеним значенням
        }
    };

    return (
        <div className="">
            <div className="topbar">
                <div className="icon-bar">
                    <i className="material-icons">menu</i>
                </div>

                <div className="icon-bar">
                    <div className="search-bar">
                        <i className="material-icons" onClick={handleSearchClick}>search</i>
                        <input 
                            type="text" 
                            placeholder="Search here" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Оновлює значення в стейті
                        />
                    </div>
                    <i className="material-icons">notifications</i>
                    <i className="material-icons" onClick={toggleVisibility}>
                        ballot
                    </i>
                    <i className="material-icons">person</i>
                </div>
            </div>

            {isVisible && (
                <div className="card_cont">
                    <div className="card_">
                        {/* Перебір елементів кошика та їх відображення */}
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="cont_item_in_card">
                                    <div className="cont___">
                                        <a href={`product/${item.id}`} className="cont_item_card">
                                            <p>{item.title}</p>
                                            <p>{item.price}$</p>
                                        </a>
                                        <i
                                            onClick={(e) => {
                                                removeFromCart(item.id);
                                            }}
                                            className="material-icons"
                                        >
                                            delete
                                        </i>
                                    </div>
                                    <div style={{ margin: 0 }} className="line-2"></div>
                                </div>

                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                    </div>
                    <div className="cont_close_icon">
                        <i className="material-icons" onClick={toggleVisibility}>
                            close
                        </i> 
                    </div>
                    
                </div>
            )}
        </div>
    );
}
