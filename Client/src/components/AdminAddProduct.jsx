// import React, { useState } from 'react'

// import axios from 'axios';

// const AdminAddProduct = () => {
//     const [form, setForm] = useState({
//         name: '',
//         price: '',
//         description: ''
//     });


//     const [imageFile, setImageFile] = useState(null);

//     const handleChange = e => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleFilechnage = e => {
//         setImageFile(e.target.files[0]);
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();

//         if (!imageFile) {
//             alert("Please select an image file.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('name', form.name);
//         formData.append('price', form.price);
//         formData.append('description', form.description);
//         formData.append('image', imageFile);

//         try {
//             await axios.post('http://localhost:5000/api/products/add/', formData, {
//                 headers: {
//                     'content-Type': 'multipart/form-data'
//                 }
//             });
//             alert('Product added successfully!');
//             setForm({ name: '', price: '', description: ''});
//             setImageFile(null);
//         } catch (err) {
//             console.error(err);
//             alert('Error adding product.');
//         }
//     };

//   return (
//     <form onSubmit={handleSubmit}>
//         <h2>Admin: Add Product</h2>

//         <input
//         type="text"
//         name="name"
//         placeholder="Product name"
//         value={form.name}
//         onChange={handleChange}
//         required
//         />

//         <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={form.price}
//         onChange={handleChange}
//         required
//         />

//         <input
//         type="text"
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         />

//         <input
//         type="file"
//         accept="image/*"
//         onChange={handleFilechnage}
//         required
//         />

//         <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default AdminAddProduct
import React, { useState } from 'react'
import axios from 'axios';

const AdminAddProduct = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('image', imageFile);

        try {
            await axios.post('http://localhost:5000/api/products/add/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully!');
            setForm({ name: '', price: '', description: ''});
            setImageFile(null);
        } catch (err) {
            console.error(err);
            alert('Error adding product.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Admin: Add Product</h2>

                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        style={styles.fileInput}
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto'
    },
    form: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    inputGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    fileInput: {
        width: '100%',
        padding: '10px'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default AdminAddProduct;


