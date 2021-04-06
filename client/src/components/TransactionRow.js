import moment from 'moment';

export const TransactionRow = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.from.username}</td>
      <td>{transaction.to.username}</td>
      <td>{transaction.amount}$</td>
      <td>{transaction.message}</td>
      <td>{moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
  )
}