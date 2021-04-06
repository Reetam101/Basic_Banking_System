import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const UserInfo = ({ props }) => {
  const { users, getSingleUser, loading, addTransaction, error } = useContext(GlobalContext);
  useEffect(async () => {
    console.log(props.match.params.id);
    await getSingleUser(props.match.params.id);
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, []);

  const from = users.username;
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      from,
      to,
      amount,
      message
    }

    await addTransaction(newTransaction);
    setDisplay(true);
    console.log(error);
  }

  console.log(users);
  return (
    <>
    <div className="card p-3 mx-5">
      <div className="card-body">
        <h3 className="card-title text-center">User Info</h3>
        {
          loading ? (<span>Loading...</span>) : ( 
            <>
            <p className="card-text h6">Name: {users.username}</p>
            <p className="card-text h6">Email: {users.email}</p>
            <p className="card-text h6">Contact: {users.contact}</p>
            <p className="card-text h6">Balance: {users.balance}$</p>
            </>
          )
        }
        
      </div>
    </div>
    <br />
    {
        display && (error ? (
          <div className="alert alert-danger fade show" role="alert">
            <strong>{error}</strong>
          </div> 
        ) : (
          <div className="alert alert-success fade show" role="alert">
            <strong>Transaction Successful</strong>
          </div>
        ))
    }
    <div className="card border-dark mb-3 mt-3 mx-5">
    <div className="card-body">
    <h5 className="card-title text-center">Make a Transaction</h5>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Sender's Username</label>
        <input type="text" className="form-control" value={from} placeholder={from} aria-label="Username" aria-describedby="basic-addon1" disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Receiver's Username</label>
        <input type="text" className="form-control" value={to} onChange={e => setTo(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Amount</label>
        <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 1000" aria-label="Money" aria-describedby="basic-addon1" />
      </div>
      <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Message</label>
        <input type="text" className="form-control" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter a message..." />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>   
    </div>
    </div>
    </>
  )
}
