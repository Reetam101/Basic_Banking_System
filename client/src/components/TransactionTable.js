import { useContext, useEffect } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { TransactionRow } from './TransactionRow';

export const TransactionTable = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Money</th>
          <th scope="col">Message</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map((transaction) => (
            <TransactionRow key={transaction._id} transaction={transaction} />
          ))
        }
      </tbody>
    </table>
  )
}

