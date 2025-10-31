import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const cartItemsCount = cart.length;

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/');
        window.location.reload();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const styles = {
        navbar: {
            backgroundColor: '#2c3e50',
            padding: '0 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        },
        navContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70px'
        },
        navLogo: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
        },
        navMenu: {
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            '@media (max-width: 768px)': {
                position: 'fixed',
                left: isMenuOpen ? '0' : '-100%',
                top: '70px',
                flexDirection: 'column',
                backgroundColor: '#2c3e50',
                width: '100%',
                textAlign: 'center',
                transition: '0.3s',
                padding: '20px 0',
                gap: '0'
            }
        },
        navLink: {
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '10px 15px',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        cartBadge: {
            backgroundColor: '#e74c3c',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-5px',
            right: '5px'
        },
        navToggle: {
            display: 'none',
            flexDirection: 'column',
            cursor: 'pointer',
            gap: '4px',
            '@media (max-width: 768px)': {
                display: 'flex'
            }
        },
        bar: {
            width: '25px',
            height: '3px',
            backgroundColor: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <Link to="/" style={styles.navLogo}>
                    🛍️ ShopApp
                </Link>

                <div style={{
                    ...styles.navMenu,
                    left: isMenuOpen ? '0' : '-100%'
                }}>
                    <Link to="/" style={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    
                    <Link to="/cart" style={{...styles.navLink, position: 'relative'}} onClick={() => setIsMenuOpen(false)}>
                        Cart
                        {cartItemsCount > 0 && (
                            <span style={styles.cartBadge}>{cartItemsCount}</span>
                        )}
                    </Link>

                    {isAdmin ? (
                        <>
                            <Link to="/admin" style={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                Admin Panel
                            </Link>
                            <button 
                                onClick={handleLogout}
                                style={{...styles.navLink, background: 'none', border: 'none', cursor: 'pointer'}}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/admin-login" style={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            Admin Login
                        </Link>
                    )}
                </div>

                <div style={styles.navToggle} onClick={toggleMenu}>
                    <span style={styles.bar}></span>
                    <span style={styles.bar}></span>
                    <span style={styles.bar}></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;