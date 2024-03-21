// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

    // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      history('/home'); // Redirige al usuario a la página de inicio (home)
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Datos incorrectos, vuelve a intentarlo.');

    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="login-link">
        <p>No tienes cuenta? <a href="/register">Regístrate</a></p>
      </div>
    </div>
  );
};

// Exporta el componente Login
export default Login;
