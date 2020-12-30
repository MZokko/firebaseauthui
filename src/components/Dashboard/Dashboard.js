import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { Link , useHistory} from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser , logOut } = useAuth();
  const history = useHistory();

  async function handleLogOut() {
      setError('')
      try{
          await logOut();
          history.push('/login')
      }catch{
          setError('failed to log out')
      }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h5 className='text-center mb-4'>Profile</h5>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to='/updateProfile' className='btn btn-primary w-100'>
            update profile
          </Link>
        </Card.Body>
      </Card>
      <div className=' w-100 text-center mt-2'>
        
        <Button variant='link' onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
}
