import { useState } from 'react';
import { Form, Button, Header, Message, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setApiError('');
    setSuccessMessage('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await API.post('/auth/forgot-password', { email });
        setSuccessMessage('Password reset instructions have been sent to your email.');
        toast.success('Password reset email sent!');
      } catch (err) {
        setApiError(
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Failed to send reset email'
        );
      }
    }
  };

  return (
    <div
      className="auth-bg-wrapper"
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 0
        }}
      />
      <Segment
        padded="very"
        className="auth-segment"
        style={{
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Icon name="leaf" size="huge" style={{ color: 'var(--primary-green)' }} />
          <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#222', marginLeft: 10 }}>
            GreenKart
          </span>
        </div>
        <Header as="h2" style={{ color: 'var(--primary-green)' }} textAlign="center">
          Forgot Password
        </Header>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={formSubmitted && errors.email ? { content: errors.email, pointing: 'below' } : null}
            placeholder="Enter your email"
            required
          />
          <Button
            fluid
            className="auth-btn"
            style={{ background: 'var(--primary-green)', color: '#fff', marginTop: 10 }}
            type="submit"
          >
            Send Reset Link
          </Button>
        </Form>
        {apiError && (
          <Message negative style={{ marginTop: 10 }}>
            {apiError}
          </Message>
        )}
        {successMessage && (
          <Message positive style={{ marginTop: 10 }}>
            {successMessage}
          </Message>
        )}
        <Message style={{ marginTop: 20 }}>
          Remember your password? <Link to="/login">Login here</Link>
        </Message>
      </Segment>
    </div>
  );
}

export default ForgotPassword;