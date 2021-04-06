import { Header } from './Header';

import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CreateUser = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState(0);
  const [balance, setBalance] = useState(0);

  //const [successMessage, setSuccessMessage] = useState(false); 
  const [display, setDisplay] = useState(false);

  const { addUser, error } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      contact,
      balance
    }

    await addUser(newUser);
    setDisplay(true);
    console.log(error);
  }

  return (
    <>
    <Header />
    <br />
    {
        display && (error ? (
          <div className="alert alert-danger fade show" role="alert">
            <strong>{error}</strong>
          </div> 
        ) : (
          <div className="alert alert-success fade show" role="alert">
            <strong>User created successfully</strong>
          </div>
        ))
      }
    <div className="card border-dark mb-3 mx-auto">
    <div className="card-body">
    <h5 className="card-title text-center">Create an User</h5>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Contact No.</label>
        <input type="number" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact No." aria-label="Contact No." aria-describedby="basic-addon1" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Initial Balance</label>
        <input type="number" className="form-control" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="Balance" aria-label="Balance" aria-describedby="basic-addon1" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>   
    </div>
    </div>
    </>
  )
}

