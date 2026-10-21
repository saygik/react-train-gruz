import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { Alert, Button } from 'react-bootstrap';
// project-imports

import Logo from '../../../img/train.png';
import { useAuth } from '../../../context/Auth';
import { authConfig } from '../../../config';
import { canAutoRedirect, safePath } from '../../../context/Auth/utils';
import './login.css';
// ================================|| LOGIN ||================================ //

const Login = () => {
  const { initializing, loginProcess, signedIn, error, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = safePath(
    typeof location.state?.from === 'string' ? location.state.from : authConfig.homePath
  );
  const manual = Boolean(location.state?.manual);
  const expired = Boolean(location.state?.expired);

  // Уже вошли — сразу на запрошенную страницу
  useEffect(() => {
    if (signedIn) {
      navigate(from, { replace: true });
    }
  }, [signedIn, from, navigate]);

  // Стандартное поведение SSO: не показываем промежуточный экран,
  // а сразу уходим на страницу входа провайдера.
  useEffect(() => {
    if (initializing || signedIn || loginProcess || manual) return;
    if (!canAutoRedirect()) return;
    signIn(from);
  }, [initializing, signedIn, loginProcess, manual, from, signIn]);

  if (initializing || loginProcess || signedIn) {
    return (
      <div className="login-page">
        <div className="login-card text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="sr-only">Загрузка…</span>
          </div>
          <p className="text-muted mb-0">Перенаправляем на страницу входа…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card text-center">
        <img className="login-logo" src={Logo} alt="" />
        <h1 className="h4 mb-1">Грузовая работа</h1>
        <p className="text-muted mb-4">Вход в корпоративную систему</p>

        {expired && (
          <Alert variant="warning" className="py-2 small">
            Сессия истекла. Войдите снова.
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="py-2 small">
            {error}
          </Alert>
        )}

        <Button
          variant="primary"
          size="lg"
          className="btn-block"
          onClick={() => signIn(from)}
        >
          Войти через корпоративную учётную запись
        </Button>

        <p className="login-hint">
          Используются учётные данные вашего домена (Authentik).
        </p>
      </div>
    </div>
  );
};

export default Login;
