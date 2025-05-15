import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const { firstname, lastname, email, phone, password } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\+(\d{1,4})-(\d{10})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (firstname.trim().length < 3) return 'First name must be at least 3 characters long.';
    if (lastname.trim().length < 3) return 'Last name must be at least 3 characters long.';
    if (!emailRegex.test(email.trim())) return 'Please enter a valid Gmail address.';
    if (!phoneRegex.test(phone.trim())) return 'Phone number must include a country code and exactly 10 digits (e.g., +91-9876543210).';
    if (!passwordRegex.test(password)) return 'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
    return '';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch('http://localhost/book-management-system/server/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setMessage('Registration successful!');
        setFormData({ firstname: '', lastname: '', email: '', phone: '', password: '' });
        localStorage.setItem('user_name', result.user_name);
        localStorage.setItem('user_id', result.user_id);
        navigate('/');
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">User Registration</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            autoComplete="given-name"
            type="text"
            name="firstname"
            className="form-control"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            autoComplete="family-name"
            type="text"
            name="lastname"
            className="form-control"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email (Gmail only)</label>
          <input
            autoComplete="email"
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Phone (with country code)</label>
          <input
            autoComplete="tel"
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
