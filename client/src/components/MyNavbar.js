import { Link } from 'react-router-dom'; 

export const MyNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">League Bank</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/transactions">Transactions</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/makeTransaction">Make Transaction</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>

        </div>
      </div>
  </nav>
  )
}

