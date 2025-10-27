import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from '../context/CartContext';

const stripePromise = loadStripe("pk_test_51SM0J2EHGpNpnK2zatY7971sPbHRzF3owAvvPSjiRaUKRurOhLPq9qRsfgDnnCf2JJjAh1ZkAODnl0QY0owkbveU000ARefxeJ");

const Cart = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckOut = async () => {
        if (paymentMethod === "stripe") {
            try {
                const cartItems = cart.map(item => ({
                    productId: item._id,
                    quantity: 1,
                }));
    
                const response = await axios.post('http://localhost:5000/api/payment/checkout', { cartItems });
    
                if (response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    console.error("No checkout URL returned from backend");
                    alert("Payment session failed. Try again.");
                }
    
            } catch (err) {
                console.error("Stripe error", err);
                alert("Stripe checkout failed");
            }
        }
    
        if (paymentMethod === "cod") {
            alert("Cash on delivery order placed");
            clearCart();
            navigate('/');
        }
    };

    if (cart.length === 0) return (
        <div style={styles.emptyCart}>
            <h2 style={styles.emptyTitle}>Your cart is empty</h2>
            <button 
                style={styles.continueShopping}
                onClick={() => navigate('/')}
            >
                Continue Shopping
            </button>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Your Cart</h2>
            <div style={styles.cartGrid}>
                {cart.map((item, idx) => (
                    <div key={idx} style={styles.cartItem}>
                        {item.image && (
                            <img
                                src={`http://localhost:5000/${item.image}`}
                                alt={item.name}
                                style={styles.itemImage}
                            />
                        )}
                        <h4 style={styles.itemName}>{item.name}</h4>
                        <p style={styles.itemPrice}>${item.price}</p>
                    </div>
                ))}
            </div>

            <div style={styles.totalSection}>
                <h3 style={styles.totalText}>Total: ${totalAmount}</h3>
            </div>

            <div style={styles.paymentSection}>
                <h3 style={styles.paymentTitle}>Select Payment Method</h3>
                <div style={styles.radioGroup}>
                    <label style={styles.radioLabel}>
                        <input 
                            type="radio"
                            value="stripe"
                            checked={paymentMethod === "stripe"}
                            onChange={() => setPaymentMethod("stripe")}
                            style={styles.radioInput}
                        />
                        Pay with Stripe
                    </label>

                    <label style={styles.radioLabel}>
                        <input 
                            type="radio"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            style={styles.radioInput}
                        />
                        Cash on Delivery
                    </label>
                </div>
            </div>

            <button onClick={handleCheckOut} style={styles.checkoutButton}>
                Place Order
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '80vh'
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center'
    },
    cartGrid: {
        display: "flex",
        flexWrap: 'wrap',
        gap: '25px',
        marginBottom: '40px',
        justifyContent: 'center'
    },
    cartItem: {
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        width: '280px',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
    },
    itemImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px'
    },
    itemName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px'
    },
    itemPrice: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#007bff',
        margin: '0'
    },
    totalSection: {
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
    },
    totalText: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#2c3e50',
        margin: '0'
    },
    paymentSection: {
        marginBottom: '30px',
        padding: '25px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    paymentTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px'
    },
    radioGroup: {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap'
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: '#555',
        cursor: 'pointer'
    },
    radioInput: {
        marginRight: '8px',
        transform: 'scale(1.2)'
    },
    checkoutButton: {
        padding: '15px 40px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
        transition: 'all 0.3s ease',
        minWidth: '200px'
    },
    emptyCart: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center'
    },
    emptyTitle: {
        fontSize: '28px',
        color: '#666',
        marginBottom: '20px'
    },
    continueShopping: {
        padding: '12px 30px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
};

// Add hover effects
const style = document.createElement('style');
style.textContent = `
    .cart-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .checkout-button:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
    }
    .continue-shopping:hover {
        background-color: #218838;
    }
    .radio-label:hover {
        color: #007bff;
    }
`;
document.head.appendChild(style);

export default Cart;