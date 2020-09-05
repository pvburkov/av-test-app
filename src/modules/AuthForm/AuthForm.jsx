import React, { PureComponent, Fragment } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { withNaming } from '@bem-react/classname';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import Loader from 'components/Loader';
import './AuthForm.css';

const authFormClasses = withNaming({ e: '__', m: '_', v: '--' })('authform');

class AuthForm extends PureComponent {
  state = {
    login: '',
    loginError: false,
    password: '',
    passwordError: false,
    isChecking: false
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: value === ''
    });
  };

  render() {
    const {
      login,
      loginError,
      password,
      passwordError,
      isChecking
    } = this.state;

    return (
      <form className={authFormClasses()} onSubmit={this.onSubmit}>
        <header>Авторизация</header>
        <Label htmlFor="login">Логин:</Label>
        <Input
          id="login"
          hasError={loginError}
          name="login"
          onChange={this.onChange}
          value={login}
          wideMode
        />
        <Label
          htmlFor="login"
          isErrorInfo
          isHidden={!loginError}
        >
          Логин не должен быть пустым!
        </Label>
        <Label htmlFor="password">Пароль:</Label>
        <Input
          id="password"
          hasError={passwordError}
          name="password"
          onChange={this.onChange}
          type="password"
          value={password}
          wideMode
        />
        <Label
          htmlFor="password"
          isErrorInfo
          isHidden={!passwordError}
        >
          Пароль не должен быть пустым!
        </Label>
        <Button
          type="submit"
          isDisabled={loginError || passwordError}
        >
          Войти в приложение
        </Button>
        {isChecking && <Loader size="l" />}
      </form>
    );
  }
}

export default AuthForm;
