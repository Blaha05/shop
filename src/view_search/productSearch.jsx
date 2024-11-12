import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import HeadNav from "../main/head/head";
import styles from './styles.css'

function ProductItem({ title, description, timeAgo, id }) {
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/getfotos?id=${id}`)
            .then(response => response.json())
            .then(data => setFotos(data)) // Отримуємо масив фото
            .catch(error => console.error('Error fetching photos:', error));
    }, [id]); // Виконувати запит лише коли змінюється id
    
    return (
        <a href={`product/${id}`} className="item">
            <div className="block_img">
                <img src={`http://127.0.0.1:8000/${fotos[0]}`} alt={title} />
            </div>
            <h3 className="title_product">{title}</h3>
            <p className="description">{description.length > 200 ? `${description.slice(0, 200)}...` : description}</p>
            <div className="line-2"></div>
            <p className="description">{timeAgo}</p>
        </a>
    );
}


export default function BoxProductSearch() {

    const [products, setProducts] = useState([]); // Стейт для збереження отриманих даних
    const { search } = useParams(); // Витягує 'id' із URL


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/search?search=${search}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Виведення даних у консоль
                setProducts(data); // Збереження даних у стейт
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []); // Порожній масив, щоб виконати запит один раз після рендеру

    return (
        <main style={{position:"relative", width:'calc(100% - 17px)', margin:'80px 15px 0'}}>
            <div className="cont_head_search">
                <HeadNav className='cont_head_search' />
            </div>
            <div className="cont">
                {products.map((product, index) => (
                    <ProductItem
                        key={index}
                        id = {product.id}
                        title={product.title}
                        description={product.description}
                        timeAgo={product.time}
                    />
                ))}
            </div>
        </main>
    )
}
