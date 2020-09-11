import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withNaming } from '@bem-react/classname';
import Button from 'components/Button';
import { loadObjectsAction } from 'store/actions/objects';
import { readObjectsDataFromFile } from 'utils/fileUtils';
import './ObjectTable.css';

const baseClasses = withNaming({ e: '__', m: '--', v: '-' });
const objectTableClasses = baseClasses('object-table');
const objectTableRowClasses = baseClasses('object-table-row');

const ObjectTable = ({
  objects,
  loadObjects
}) => {
  useEffect(() => {
    readObjectsDataFromFile()
      .then(data => loadObjects(data));
  }, []);

  const history = useHistory();

  return (
    <div className={objectTableClasses()}>
      <header className={objectTableClasses('header')}>
        Список внесенных объектов
      </header>
      <div className={objectTableClasses('button-container')}>
        <Button onClick={() => history.push('/work/edit/')}>
          Добавить объект
        </Button>
      </div>
      {objects.map(obj => (
        <div
          className={objectTableRowClasses()}
          key={obj.id}
          onClick={() => history.push(`/work/edit/${obj.id}`)}
        >
          <div className={objectTableRowClasses('main')}>{obj.id}</div>
          {Object.entries(obj)
            .filter(([ name ]) => name !== 'id')
            .map(([ name, value ]) => (
              <div
                className={objectTableRowClasses('secondary')}
                key={`${obj.id}-${name}`}
              >
                {`${name}: ${value}`}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ objects }) => ({ objects });

const mapDispatchToProps = dispatch => ({
  loadObjects: objectsData => dispatch(loadObjectsAction(objectsData))
});

export default memo(connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectTable));

ObjectTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadObjects: PropTypes.func.isRequired
};
