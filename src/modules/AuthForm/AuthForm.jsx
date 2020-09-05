import React, { PureComponent, Fragment } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { withNaming } from '@bem-react/classname';
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
      passwordError
    } = this.state;

    return (
      <form className={authFormClasses()} onSubmit={this.onSubmit}>
        <Loader size="l" />
        <header>Авторизация</header>
        <label
          htmlFor="login"
          className={authFormClasses('label')}
        >
          Логин:
        </label>
        <input
          type="text"
          id="login"
          name="login"
          className={authFormClasses('input', { error: loginError })}
          value={login}
          onChange={this.onChange}
        />
        <label
          htmlFor="login"
          className={authFormClasses('error-label', { error: loginError })}
        >
          Логин не должен быть пустым!
        </label>
        <label
          htmlFor="password"
          className={authFormClasses('label')}
        >
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={authFormClasses('input', { error: passwordError })}
          value={password}
          onChange={this.onChange}
        />
        <label
          htmlFor="password"
          className={authFormClasses('error-label', { error: passwordError })}
        >
          Пароль не должен быть пустым!
        </label>
      </form>
    );
  }
}

export default AuthForm;
