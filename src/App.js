import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import { ProtectRoutes } from './hooks/ProtectRoutes';
import AdminLayout from './layout/AdminLayout';
import { CustomRouter } from './router/CustomRouter';
import NavbarLayout from './pages/NavbarLayoutPage/NavbarLayout';
import DashboardLayout from './layout/DashboardLayout';
import User from './pages/User/User';

import SettingsMain from './pages/Settings/SettingsMain';
import AddTable from './pages/Settings/AddTable/AddTable';
import AddUser from './pages/Settings/AddUser/AddUser';
import Tables from './pages/Tables/Tables';

function App() {
  return (

    
        <Routes>
         <Route path='/login' element={<Login />} />
        
        
          <Route path='/' element={<Navigate to='anasayfa' exact />} />
          <Route path='/login' element={<Login />} />
        
        <Route element={<ProtectRoutes />}>
          <Route element={<DashboardLayout/>}>
            <Route path='/anasayfa' element={<Home />} />
            <Route path='/User' element={<User />} />
            <Route path='/ayarlar' element={<SettingsMain />} />
            <Route path='/ayarlar/masaEkleme' element={<AddTable />} />
            <Route path='/ayarlar/kullaniciEkleme' element={<AddUser />} />
            <Route path='/masalar' element={<Tables />} />
          </Route>
        </Route>
        
      </Routes>
    


  );
}

export default App;
