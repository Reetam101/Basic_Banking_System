import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const MakeTransaction = ({ props }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  
  const [display, setDisplay] = useState(false);

  const { addTransaction, error, getSingleUser, users } = useContext(GlobalContext);

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

  return (
    <div>
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
      <div className="card border-dark mb-3 mx-auto">
    <div className="card-body">
    <h5 className="card-title text-center">Make a Transaction</h5>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="validationDefaultUsername" className="form-label">Sender's Username</label>
        <input type="text" className="form-control" value={from} onChange={e => setFrom(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
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
    </div>
  )
}

