import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNaming } from '@bem-react/classname';
import { nanoid } from 'nanoid';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import Loader from 'components/Loader';
import {
  addNotificationAction,
  removeNotificationAction
} from 'store/actions/notifications';
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
     * Таймер на 3 секунды нужен для имитации отправки запроса на сервер
     * и получения ответа.
     */

    setTimeout(() => {
      this.setState({ isChecking: false });

      if (login !== 'test' || password !== 'test') {
        this.setState({
          login: '',
          password: '',
          loginError: true,
          passwordError: true
        });

        const notificationId = nanoid();
        this.props.addNotification({
          id: notificationId,
          text: 'Введен неверный логин и/или пароль',
          type: 'failure'
        });

        setTimeout(
          () => this.props.removeNotification(notificationId),
          3000
        );

        return;
      }

      const notificationId = nanoid();
      this.props.addNotification({
        id: notificationId,
        text: 'Введены корректные данные',
        type: 'success'
      });

      setTimeout(
        () => this.props.removeNotification(notificationId),
        3000
      );

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
        {isChecking && (
          <Loader
            className={authFormClasses('loader')}
            size={window.innerHeight < 600 ? 's' : 'm'}
          />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNotification: ({ id, type, text }) => 
    dispatch(addNotificationAction({ id, type, text })),
  removeNotification: (notificationId) =>
    dispatch(removeNotificationAction(notificationId))
});

export default connect(null, mapDispatchToProps)(AuthForm);

AuthForm.propTypes = {
  historyPush: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired
};
