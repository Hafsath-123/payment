// src/components/ProductList.js
import React, {
    useContext,
    useEffect,
    useState,
} from 'react';

import axios from 'axios';

import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products/')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Available Products</h2>
            <div style={styles.productsGrid}>
                {products.map(prod => (
                    <div
                        key={prod._id}
                        style={styles.productCard}
                    >
                        {prod.image && (
                            <img
                                src={`http://localhost:5000/${prod.image}`}
                                alt={prod.name}
                                style={styles.productImage}
                            />
                        )}
                        <h3 style={styles.productName}>{prod.name}</h3>
                        <p style={styles.productPrice}>${prod.price}</p>
                        {prod.description && <p style={styles.productDescription}>{prod.description}</p>}
                        <button 
                            onClick={() => addToCart(prod)}
                            style={styles.addToCartButton}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center'
    },
    productsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '25px',
        justifyContent: 'center'
    },
    productCard: {
        border: '1px solid #e0e0e0',
        padding: '20px',
        width: '280px',
        borderRadius: '12px',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    },
    productImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px'
    },
    productName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px'
    },
    productPrice: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#007bff',
        marginBottom: '10px'
    },
    productDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '15px',
        lineHeight: '1.4'
    },
    addToCartButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '100%'
    }
};

// Add hover effects
const style = document.createElement('style');
style.textContent = `
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }
    .add-to-cart-button:hover {
        background-color: #218838;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

export default ProductList;