import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const {clearCart} = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.successCard}>
                <div style={styles.successIcon}>✓</div>
                <h2 style={styles.title}>Payment Successful!</h2>
                <p style={styles.message}>Thank you for your purchase</p>
                <p style={styles.redirectMessage}>Redirecting to home page...</p>
                <div style={styles.loadingBar}>
                    <div style={styles.loadingProgress}></div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
    },
    successCard: {
        backgroundColor: 'white',
        padding: '50px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
    },
    successIcon: {
        width: '80px',
        height: '80px',
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '40px',
        fontWeight: 'bold',
        margin: '0 auto 20px'
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
        color: '#28a745',
        marginBottom: '15px'
    },
    message: {
        fontSize: '18px',
        color: '#666',
        marginBottom: '10px'
    },
    redirectMessage: {
        fontSize: '16px',
        color: '#888',
        marginBottom: '20px'
    },
    loadingBar: {
        width: '100%',
        height: '6px',
        backgroundColor: '#e0e0e0',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    loadingProgress: {
        height: '100%',
        backgroundColor: '#28a745',
        borderRadius: '3px',
        animation: 'loading 2s linear forwards'
    }
};

// Add animation
const style = document.createElement('style');
style.textContent = `
    @keyframes loading {
        from { width: 0%; }
        to { width: 100%; }
    }
`;
document.head.appendChild(style);

export default Success;