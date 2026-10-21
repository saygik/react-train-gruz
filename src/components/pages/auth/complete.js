import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { Alert, Button } from 'react-bootstrap';
// project-imports

import { useAuth } from '../../../context/Auth';
import { authConfig } from '../../../config';
import { takeReturnTo } from '../../../context/Auth/utils';
import './login.css';
// ================================|| OAUTH CALLBACK ||================================ //

const Complete = () => {
  const { completeSignIn, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let active = true;
    completeSignIn(location.search).then((result) => {
      if (!active) return;
      if (result.ok) {
        navigate(takeReturnTo(), { replace: true });
      } else {
        setError(result.message);
      }
    });

    return () => {
      active = false;
    };
  }, [completeSignIn, location.search, navigate]);

  if (error) {
    return (
      <div className="login-page">
        <div className="login-card text-center">
          <h1 className="h5 mb-3">Не удалось войти</h1>
          <Alert variant="danger" className="py-2 small text-left">
            {error}
          </Alert>
          <Button variant="primary" className="btn-block" onClick={() => signIn(authConfig.homePath)}>
            Войти снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="sr-only">Загрузка…</span>
        </div>
        <p className="text-muted mb-0">Завершаем вход…</p>
      </div>
    </div>
  );
};

export default Complete;
