import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router";

import { Container, Row, Col, Button } from 'react-bootstrap';
// project-imports

import Loader from '../../shared/bigloader'
import { useAuth } from '../../../context/Auth';
// ================================|| LOGIN ||================================ //

const Login = ({ signIn }) => {
  return (

    <div className="container py-5">
      <div className="row">
        <div className="col-md-2 text-center">

        </div>
        <div className="col-md-10">
          <h3>Доступ отклонен!</h3>
          <p>Доступ к приложению ограничен по соображениям безопасности.<br />Пожалуйста войдите в систему учетными данными вашего домена.
          </p>
          <Button variant="primary" onClick={() => signIn()}>
            Войти
          </Button>
        </div>
      </div>
    </div>


  );
};

const LoginWrapper = () => {

  const { signInAuto, signedIn, logoffProcess, loginProcess, signIn } = useAuth();
  const location = useLocation()
  const redirectTo = location.state?.from ? location.state?.from : "/"
  const showLoader = logoffProcess || signedIn || loginProcess
  // console.log('loginProcess', loginProcess)
  // console.log('signedIn', signedIn)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('REACT_APPS_GRUZ_ATOKEN')
    token && signInAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    signedIn && navigate(redirectTo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn])

  if (showLoader) return <Loader minHeight='100vh' />
  return <Login signIn={signIn} />
};
export default LoginWrapper;