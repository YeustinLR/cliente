// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Importa react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker
import '../styles/Register.css'; // Importa tus estilos CSS
import Spinner from '../toys/Sppiner.js'; // Importa el componente Spinner

// Define el componente Register
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pin: '',
    nombre: '',
    apellidos: '',
    pais: '',
    fechaNacimiento: new Date(), // Inicializa la fecha de nacimiento con la fecha actual
  });
    // Define el estado inicial para el formulario y el mensaje de error
  const [showSpinner, setShowSpinner] = useState(false); // Estado para mostrar/ocultar el spinner
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

    // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el cambio en la fecha de nacimiento
  const handleDateChange = (date) => {
    setFormData({ ...formData, fechaNacimiento: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    try {
      await axios.post('http://localhost:5000/api/v1/auth/register', formData);
      navigate('/login'); // Después del registro, redirige al login
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage('Error al registrar, por favor intenta nuevamente.');
    }finally {
      setShowSpinner(false); // Ocultar spinner al finalizar el registro
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="number" name="pin" placeholder="PIN" value={formData.pin} onChange={handleChange} required />
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
        <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required />
        <div className="date-picker-container">
          <label>Fecha de Nacimiento:</label>
          <DatePicker selected={formData.fechaNacimiento} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {showSpinner && <Spinner />}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="register-link">
        <p>Ya tienes cuenta? <a href="/login">Iniciar sesión</a></p>
      </div>
    </div>
  );
};
// Exporta el componente Register
export default Register;
