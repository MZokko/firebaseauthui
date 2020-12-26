import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser , uiFireBase} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setLoading(false);
      setError('failed to Log in');
    }
    setLoading(false);
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h5 className='text-center mb-4'>Log in</h5>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              Log in
            </Button>
            <div id="firebaseui-auth-container">
                {uiFireBase}
            </div>

          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgotPassword'>Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className=' w-100 text-center mt-2'>
        No account ? <Link to='/signup'>Sign Up</Link>
      </div>

      <div>
          {!currentUser  ? <div>sign in</div> : <div>not sign in</div>}
      </div>
    </>
  );
}

export default Login;
