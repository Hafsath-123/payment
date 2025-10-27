import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {

    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
         setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (form.username === "admin" && form.password === "admin123") {
            alert("Login successfully");
            navigate("/admin");
            onLogin(true);
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Admin Login</h2>
                
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                
                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>

                <button type='submit' style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f5f5f5',
        
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333',
        fontSize: '24px',
        fontWeight: '600'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
};

// Add hover and focus effects
const style = document.createElement('style');
style.textContent = `
    input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    button:hover {
        background-color: #0056b3;
        transform: translateY(-1px);
    }
    input:hover {
        border-color: #007bff;
    }
`;
document.head.appendChild(style);

export default AdminLogin;