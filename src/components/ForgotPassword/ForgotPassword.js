import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('check you mail box for further info');
    } catch {
      setError('failed to reset password');
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h5 className='text-center mb-4'>Forgot Password</h5>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className=' w-100 text-center mt-2'>
        No account ? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
}

export default ForgotPassword;
