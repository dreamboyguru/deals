import logo from './logo.svg';
import './App.css';
import Navbar from './componants/admin/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './componants/admin/Create';
import Employees from './componants/admin/Employees';
import Edit from './componants/admin/Edit';
import Login from './componants/admin/Login';
import Auth from './componants/admin/Auth';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Employees />} />
        <Route path='create' element={<Create />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
