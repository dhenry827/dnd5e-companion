import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserDataContext } from '../App';


const Login = () => {
  const { users, setUsers } = useContext(UserDataContext)

  const handleLogin = () => {
    const user = users.find((user) => user.email === email && user.password === password)

    if(user){
      setLoggedinUser(user)
      console.log(lLoggedinUser)
    } else {
      alert('Login failed. Please check your credentials')
    }
  } 

  return (
    <div>
      <Form>

        <h2>Login</h2>

        <Form.Group className="mb-3" >
          <Form.Label>Username/Email</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

      </Form>
    </div>
  )
}

export default Login