import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
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

  onSubmit = async (event) => {
    event.preventDefault();

    const { login, password, isChecking } = this.state;

    if (isChecking) return;

    if (login === '' || password === '') {
      this.setState({
        loginError: login === '',
        passwordError: password === ''
      });
      return;
    }

    await this.setState({ isChecking: true });

    /**
     * Хардкод логина и пароля - плохое решение, но в данном случае
     * это имитация авторизации, поэтому прошу не бить по рукам за это :)
     * Таймер на 3 секунды нужен для демонстрации работы индиктора загрузки.
     */

    setTimeout(async () => {
      await this.setState({ isChecking: false });

      // TODO: сообщения о неверно введенных логине и пароле
      if (login !== 'test' || password !== 'test') {
        this.setState({
          loginError: true,
          passwordError: true
        });
      }

      const { historyPush } = this.props;
      historyPush('/work');
    }, 3000);
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
      <Fragment>
        <form className={authFormClasses()} onSubmit={this.onSubmit}>
          <header className={authFormClasses('header')}>Авторизация</header>
          <Label
            className={authFormClasses('label')}
            htmlFor="login"
          >
            Логин:
          </Label>
          <Input
            id="login"
            hasError={loginError}
            name="login"
            onChange={this.onChange}
            value={login}
            wideMode
          />
          <Label
            className={authFormClasses('label')}
            htmlFor="login"
            isErrorInfo
            isHidden={!loginError}
          >
          Логин не должен быть пустым!
          </Label>
          <Label
            className={authFormClasses('label')}
            htmlFor="password"
          >
            Пароль:
          </Label>
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
            className={authFormClasses('label')}
            htmlFor="password"
            isErrorInfo
            isHidden={!passwordError}
          >
          Пароль не должен быть пустым!
          </Label>
          <Button
            className={authFormClasses('button')}
            isDisabled={loginError || passwordError}
            type="submit"
          >
          Войти в приложение
          </Button>
        </form>
        {isChecking && <Loader className={authFormClasses('loader')} />}
      </Fragment>
    );
  }
}

export default AuthForm;

AuthForm.propTypes = {
  historyPush: PropTypes.func.isRequired
};
