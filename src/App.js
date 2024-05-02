import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import { ProtectRoutes } from './hooks/ProtectRoutes';

function App() {
  return (
    
    <Routes>
      <Route path='/login' element={<Login />}/>
      
      <Route element={<ProtectRoutes/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
    </Routes>
  );
}

export default App;
