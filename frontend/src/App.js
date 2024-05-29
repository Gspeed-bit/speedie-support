import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/privateRoute';
import TicketHome from './pages/TicketHome';
import SingleTicket from './pages/SingleTicket';
// import NewNote from './pages/NewNote';


function App() {
  return (
    <>
      <Router>
        <div className='wrapper '>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<TicketHome />} />
            </Route>
            <Route path='/tickets/:ticketId' element={<PrivateRoute />}>
              <Route path='/tickets/:ticketId' element={<SingleTicket />} />
            </Route>
            {/* <Route path='/tickets/:ticketId/notes' element={<PrivateRoute />}>
              <Route path='/tickets/:ticketId/notes' element={<NewNote />} />
            </Route> */}
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
