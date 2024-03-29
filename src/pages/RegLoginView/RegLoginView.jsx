import Registration from '../../components/RegistrationForm';
import Login from '../../components/LoginForm';
import ContainerForView from '../../components/ContainerForLogin';
import './styles.css';



const RegLoginView = () => {
  return (
    <ContainerForView>
      {location.pathname === '/register' && <Registration />}
      {location.pathname === '/login' && <Login />}
    </ContainerForView>
  );
};

export default RegLoginView;
