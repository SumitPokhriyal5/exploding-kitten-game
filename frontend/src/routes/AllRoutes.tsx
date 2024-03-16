import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AllRoutes;