import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import { ProtectRoutes } from './hooks/ProtectRoutes';
import AdminLayout from './layout/AdminLayout';
import { CustomRouter } from './router/CustomRouter';
import NavbarLayout from './pages/NavbarLayoutPage/NavbarLayout';

function App() {
  return (

    <Routes>
      <Route path='/login' element={<Login />} />
      
      <Route element={<ProtectRoutes />}>

          {CustomRouter.map((item, index) => <Route key={index} {...item} />)}


      </Route>
      
    </Routes>


  );
}

export default App;
