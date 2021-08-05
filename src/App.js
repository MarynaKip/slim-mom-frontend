import { Switch, Route, Redirect } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Modal from './components/Modal';
import getModalIsOpen from './redux/modal/modal-operations';
import routes from './routes';
import './App.css';
//import PromoView from './pages/PromoView';
// import DiaryPageView from './pages/DiaryPageView';
// import RegisterLoginPageView from './pages/RegisterLoginPageView';
// import Header from './components/Header';
// import CalculatorPageView from './pages/CalculatorPageView';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import { calculatorOperations, calculatorSelectors } from './redux/calculator';
import { useEffect, Suspense, lazy } from 'react';

const PromoView = lazy(
  () => import("./pages/PromoView") /* webpackChunkName: "PromoView" */
);

const DiaryPageView = lazy(
  () => import("./pages/DiaryPageView") /* webpackChunkName: "DiaryPageView" */
);

const CalculatorPageView = lazy(
  () => import("./pages/CalculatorPageView") /* webpackChunkName: "CalculatorPageView" */
);

const RegisterLoginPageView = lazy(
  () => import("./pages/RegisterLoginPageView") /* webpackChunkName: "RegisterLoginPageView" */
);



const App = ({ onGetCurrentUser, onGetDailyRate, isModalOpen }) => {
  useEffect(() => {
    onGetCurrentUser();
    // onGetDailyRate();
  }, []);

  return (
    <>
      <Suspense fallback={<p>loading</p>}>
      <Switch>
        <PublicRoute
          exact
          path={routes.home}
          restricted
          redirectTo={routes.mydiary}
          component={PromoView}
        />
        <PublicRoute
          path={routes.register}
          restricted
          redirectTo={routes.mydiary}
          component={RegisterLoginPageView}
        />
        <PublicRoute
          path={routes.login}
          restricted
          redirectTo={routes.mydiary}
          component={RegisterLoginPageView}
        />

        <PrivateRoute
          path={routes.mydiary}
          redirectTo={routes.home}
          component={DiaryPageView}
        />


        <PrivateRoute
          path={routes.calculator}
          redirectTo={routes.home}
          component={CalculatorPageView}
        />
        {isModalOpen && <Modal />}
        <Redirect to={routes.home} />
      </Switch>
      </Suspense>
       </>
  );
};

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
  onGetDailyRate: authOperations.getDailyRate,
};
const mapStateToProps = state => ({
  // isAuthenticated: authSelectors.getIsAuthenticated(state),
  isModalOpen: getModalIsOpen(state),
});

export default connect(null, mapDispatchToProps)(App);
