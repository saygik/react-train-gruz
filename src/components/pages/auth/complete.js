import { useEffect, useState, useMemo } from 'react';

// material-ui

import { Container, Row, Col, Button } from 'react-bootstrap';

// project-imports


import Loader from '../../shared/bigloader'
import { useAuth } from '../../../context/Auth';
// ================================|| LOGIN ||================================ //

const Callback = () => {
  return (
    <Container>
      <Row>
        <Col>
          Вход
        </Col>
      </Row>
    </Container>
  );
};

const LoginWrapper = () => {
  const { exchangeCode } = useAuth();
  const [showLoader, setShowLoader] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const queryParams = new URLSearchParams(window.location.search);

  //  const saved_state = sessionStorage.getItem('FINDUSERS_OAUTH_STATE_KEY');
  const saved_state = useMemo(() => {
    const value = sessionStorage.getItem('GRUZ_OAUTH_STATE_KEY');
    sessionStorage.removeItem('GRUZ_OAUTH_STATE_KEY');
    return value
  }, [])


  //const code = queryParams.get('code');
  const state = queryParams.get('state');



  // console.log('saved_state', saved_state)
  //  console.log('code', code)
  // console.log('state', state)

  useEffect(() => {
    // console.log('saved_state', saved_state)
    // console.log('state', state)
    if (saved_state === state) {
      exchangeCode(window.location.search)
    }

  }, [state, saved_state]);// eslint-disable-line react-hooks/exhaustive-deps

  if (saved_state !== state) {
    //setErrMsg("Не совпадают случайные числа авторизации запроса и ответа")
    //setShowLoader(false)
    return <>Не совпадают случайные числа авторизации запроса и ответа</>

  }
  if (showLoader) return <Loader minHeight='100vh' />
  if (!showLoader && errMsg.length > 1) return <> {errMsg} </>
  return <Callback />
};
export default LoginWrapper;