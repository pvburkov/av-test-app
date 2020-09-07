import React, { memo } from 'react';
import {
  Link,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './Workplace.css';

const Workplace = () => {
  const match = useRouteMatch();

  return (
    <SplitterLayout
      percentage
      primaryMinSize={20}
      secondaryMinSize={20}
    >
      <nav>
        <Link to={`${match.url}/view`}>Просмотр</Link>
        <Link to={`${match.url}/edit`}>Редактирование</Link>
        <Link to={`${match.url}/about`}>О программе</Link>
      </nav>
      <Switch>
        <Route path={`${match.url}/view`} render={() => <h1>Просмотр</h1>} />
        <Route path={`${match.url}/edit`} render={() => <h1>Редактирование</h1>} />
        <Route path={`${match.url}/about`} render={() => <h1>О программе</h1>} />
      </Switch>
    </SplitterLayout>
  );
};

export default memo(Workplace);
