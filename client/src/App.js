import { Switch, Route, Link } from 'react-router-dom';
import { MyNavbar } from './components/MyNavbar'; 
import { CreateUser } from './components/CreateUser';  
import { UserTable } from './components/UserTable';
import { TransactionTable } from './components/TransactionTable';
import { About } from './components/About';
import { MakeTransaction } from './components/MakeTransaction';
import { UserInfo } from './components/UserInfo';
import { GlobalProvider } from './context/GlobalState';
import { MyFooter } from './components/MyFooter';


function App() {
  return (
    <GlobalProvider>
    <MyNavbar />
    <div className="container mainContent d-flex flex-column justify-content-center">
      <Switch>
        <Route exact path="/" component={CreateUser} />
        <Route exact path="/users" render={props => 
          <>
          <h2 className="text-center">All Users</h2>
          <br />
          <div className="table-wrapper scroll-y my-custom-scrollbar table-responsive">
            <UserTable />
          </div>
          </>
        } />
        <Route exact path="/transactions" render={props =>
          <> 
          <h2 className="text-center">All Transactions</h2>
          <br />
          <div className="table-wrapper scroll-y my-custom-scrollbar table-responsive">
            <TransactionTable />
          </div>
          </> 
          }/>
        <Route exact path="/makeTransaction" component={MakeTransaction} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user/:id" render={props => 
          <>
            <UserInfo props={props} />
          </>
      }/>
      </Switch>
    </div>
    <br />
    <br />
    <MyFooter />
    </GlobalProvider>
  );
}

export default App;
