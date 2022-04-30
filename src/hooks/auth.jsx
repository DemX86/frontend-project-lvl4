import { useContext } from 'react';
import AuthContext from '../contexts/auth.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
