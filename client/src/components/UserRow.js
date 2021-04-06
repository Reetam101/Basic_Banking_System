import { Link } from 'react-router-dom'

export const UserRow = ({user}) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>{user.balance}$</td>
      <td><Link className="btn btn-outline-primary" to={`/user/${user._id}`}>Transfer</Link></td>
    </tr>
  )
}
