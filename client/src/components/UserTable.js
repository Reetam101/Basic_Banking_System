import { useContext, useEffect } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { UserRow } from './UserRow';

export const UserTable = () => {
  const { users, getUsers } = useContext(GlobalContext);

  useEffect(async () => {
    await getUsers();
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, []);

  return ( 
      (users.constructor === Array) ? (
            <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Balance</th>
            <th scope="col">Transfer Money</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <UserRow key={user._id} user={user} />
            ))
          }
        </tbody>
      </table>
      ) : (
        window.location.reload()
      )
  )
}

