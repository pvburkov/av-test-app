import React, { memo } from 'react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  Redirect
} from 'react-router-dom';
import SplitterLayout from 'react-splitter-layout';
import { withNaming } from '@bem-react/classname';
import 'react-splitter-layout/lib/index.css';
import './Workplace.css';
import ObjectForm from 'modules/ObjectForm/index';

const workplaceNavClasses = withNaming({
  e: '__',
  m: '--',
  v: '-'
})('workplace-navigation');

const Workplace = () => {
  const match = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <SplitterLayout
      percentage
      primaryMinSize={20}
      secondaryMinSize={20}
    >
      <nav className={workplaceNavClasses()}>
        <Link to={`${match.url}/view`}>
          <div
            className={workplaceNavClasses('link', {
              active: pathname === `${match.url}/view`
            })}
          >
            Просмотр
          </div>
        </Link>
        <Link to={`${match.url}/edit`}>
          <div
            className={workplaceNavClasses('link', {
              active: pathname === `${match.url}/edit`
            })}
          >
            Редактирование
          </div>
        </Link>
        <Link to={`${match.url}/about`}>
          <div
            className={workplaceNavClasses('link', {
              active: pathname === `${match.url}/about`
            })}
          >
            О программе
          </div>
        </Link>
        <Link to={`${match.url}/exit`}>
          <div
            className={workplaceNavClasses('link', { exit: true })}
          >
            Выход
          </div>
        </Link>
      </nav>
      <Switch>
        <Route path={`${match.url}/view`} render={() => <h1>Просмотр</h1>} />
        <Route
          path={`${match.url}/edit:objectId`}
          render={({
            history,
            match: {
              params: {
                objectId
              }
            }
          }) => <ObjectForm mode="edit" historyPush={history.push} objectId={objectId} />}
        />
        <Route
          path={`${match.url}/edit`}
          render={({ history }) => <ObjectForm mode="create" historyPush={history.push} />}
        />
        <Route path={`${match.url}/about`} render={() => <h1>О программе</h1>} />
        <Route path={`${match.url}/exit`} render={() => <Redirect to="/" />} />
      </Switch>
    </SplitterLayout>
  );
};

export default memo(Workplace);
