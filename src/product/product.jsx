import ProductInfo from './productblock';
import FotoBlock from './fotoblock';
import './styles.css'

const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
link.rel = "stylesheet";
document.head.appendChild(link);

const Product = () => {

    return (
            <div className="cont2">
                <FotoBlock />
                <ProductInfo />
            </div>
    );
};

export default Product;
