
import Cookies from 'js-cookie';


const CheckLogin = () => {
  const login = Cookies.get('login');
  
  return !!login; 
};

export default CheckLogin