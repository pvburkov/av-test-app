import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNaming } from '@bem-react/classname';
import { nanoid } from 'nanoid';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import {
  addObjectAction,
  editObjectAction,
  removeObjectAction
} from 'store/actions/objects';
import {
  addNotificationAction,
  removeNotificationAction
} from 'store/actions/notifications';
import './ObjectForm.css';

const objectFormClasses = withNaming({ e: '__', m: '--', v: '-' });
const addPropClasses = objectFormClasses('objectform-add-prop-block');
const propsClasses = objectFormClasses('objectform-props-block');
const propItemClasses = objectFormClasses('objectform-prop-item');
const controlsClasses = objectFormClasses('objectform-controls');

class ObjectForm extends PureComponent {
  state = {
    objectData: {},
    addPropName: '',
    addPropNameError: false,
    addPropValue: '',
    addPropValueError: false,
    editablePropName: '',
    editPropValue: ''
  };

  componentDidMount() {
    const {
      mode,
      objectId,
      objects
    } = this.props;
    
    if (mode === 'edit') {
      const objectData = objects.find(({ id }) => id === objectId);
      this.getEditableObjectData(objectData);
    }
  }

  getEditableObjectData = (objectData) => this.setState({ objectData });

  onAddProperty = () => {
    const {
      addPropName,
      addPropValue,
      objectData
    } = this.state;

    if (addPropName === '' || addPropValue === '') {
      return;
    }

    this.setState({
      objectData: {
        ...objectData,
        [addPropName]: addPropValue 
      },
      addPropName: '',
      addPropValue: ''
    });
  };

  onEditProp = (propName) => {
    const { objectData } = this.state;

    this.setState({
      editablePropName: propName,
      editPropValue: objectData[propName]
    });
  };

  onDeleteProp = (deletePropName) => {
    const { objectData } = this.state;

    const deleteConfirm = confirm(
      `Свойство '${deletePropName}: ${objectData[deletePropName]}' будет удалено.`
    );

    if (!deleteConfirm) return;

    const updatedObjectData = {};
    Object.keys(objectData).forEach(key => {
      if (key !== deletePropName) updatedObjectData[key] = objectData[key];
    });

    const notificationId = nanoid();
    this.props.addNotification({
      id: notificationId,
      type: 'success',
      text: `Свойство '${deletePropName}: ${objectData[deletePropName]}' удалено.`
    });
    setTimeout(() => this.props.removeNotification(notificationId), 3000);
    
    this.setState({ objectData: updatedObjectData });
  };

  onSaveProp = () => {
    const {
      editablePropName,
      editPropValue,
      objectData
    } = this.state;
    
    if (editPropValue !== '' && objectData[editablePropName] !== editPropValue) {
      this.setState({
        objectData: {
          ...objectData,
          [editablePropName]: editPropValue
        }
      });
    }

    this.setState({
      editablePropName: '',
      editPropValue: ''
    });
  };

  onCancel = () => this.props.historyPush('/work/view');
  
  onDeleteObject = () => {
    const deleteConfirm = confirm('Вы хотите удалить данный объект?');

    if (!deleteConfirm) return;

    const notificationId = nanoid();
    this.props.addNotification({
      id: notificationId,
      type: 'success',
      text: 'Объект удален'
    });
    setTimeout(() => this.props.removeNotification(notificationId), 3000);

    const { objectData: { id } } = this.state;

    this.props.removeObject(id);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: value === ''
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const {
      mode,
      addObject,
      editObject
    } = this.props;

    const { objectData } = this.state;

    if (mode === 'edit') {
      editObject(objectData);
    } else {
      addObject({
        ...objectData,
        id: nanoid()
      });
    }

    const notificationId = nanoid();
    this.props.addNotification({
      id: notificationId,
      type: 'success',
      text: mode === 'edit' ? 'Объект изменён' : 'Новый объект создан'
    });
    setTimeout(() => this.props.removeNotification(notificationId), 3000);
  };
  
  render() {
    const { mode } = this.props;
    const {
      objectData,
      addPropName,
      addPropNameError,
      addPropValue,
      addPropValueError,
      editPropValue,
      editablePropName
    } = this.state;

    return (
      <form className="objectform" onSubmit={this.onSubmit}>
        <header className="objectform-header">
          {mode === 'edit' ? 'Редактирование объекта' : 'Создание нового объекта'}
        </header>
        <div className={addPropClasses()}>
          <Label className={addPropClasses('header')}>
            Добавление нового свойства
          </Label>
          <div className={addPropClasses('table')}>
            <div className="column">
              <Label htmlFor="addPropName">Название:</Label>
              <Input
                id="addPropName"
                name="addPropName"
                hasError={addPropNameError}
                onChange={this.onChange}
                value={addPropName}
                wideMode
              />              
            </div>
            <div className="column">
              <Label htmlFor="addPropValue">Значение:</Label>
              <Input
                id="addPropValue"
                name="addPropValue"
                hasError={addPropValueError}
                onChange={this.onChange}
                value={addPropValue}
                wideMode
              />
            </div>
            <div className="column">
              <Button
                className={addPropClasses('button')}
                isDisabled={addPropNameError || addPropValueError}
                onClick={this.onAddProperty}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div className={propsClasses()}>
          <Label className={propsClasses('header')}>
            Свойства объекта
          </Label>
          {Object.entries(objectData)
            .filter(([ name ]) => name !== 'id')
            .map(([ name, value ], index) => (
              <div
                className={propItemClasses()}
                key={index}
              >
                <div className={propItemClasses('name')}>{name}</div>
                <div className={propItemClasses('value')}>
                  {editablePropName !== name
                    ? value
                    : (
                      <Input
                        id="editPropValue"
                        name="editPropValue"
                        onChange={this.onChange}
                        value={editPropValue}
                        wideMode
                      />
                    )
                  }
                </div>
                <Button
                  className={propItemClasses('button')}
                  onClick={() => {
                    editablePropName !== name
                      ? this.onEditProp(name)
                      : this.onSaveProp();
                  }}
                >
                  {editablePropName !== name
                    ? 'Изменить'
                    : 'Сохранить'
                  }
                </Button>
                <Button
                  className={propItemClasses('button', {}, ['delete-button'])}
                  onClick={() => this.onDeleteProp(name)}
                >
                  Удалить
                </Button>
              </div>
            ))}
        </div>
        <div className={controlsClasses()}>
          {mode === 'edit' && (
            <Button
              className={controlsClasses('button', {}, ['delete-button'])}
              onClick={this.onDeleteObject}
            >
              Удалить объект
            </Button>
          )}
          <Button
            className={controlsClasses('button', {}, ['addon-button'])}
            onClick={this.onCancel}
          >
            Выход
          </Button>
          <Button
            className={controlsClasses('button')}
            type="submit"
          >
            {mode === 'edit' ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ objects }) => ({ objects });

const mapDispatchToProps = dispatch => ({
  addNotification: ({ id, type, text }) => 
    dispatch(addNotificationAction({ id, type, text })),
  removeNotification: (notificationId) =>
    dispatch(removeNotificationAction(notificationId)),
  addObject: (objectData) => dispatch(addObjectAction(objectData)),
  editObject: (objectData) => dispatch(editObjectAction(objectData)),
  removeObject: (objectId) => dispatch(removeObjectAction(objectId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectForm);

ObjectForm.propTypes = {
  historyPush: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  objectId: PropTypes.string,
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNotification: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
  addObject: PropTypes.func.isRequired,
  editObject: PropTypes.func.isRequired,
  removeObject: PropTypes.func.isRequired
};

ObjectForm.defaultProps = {
  objectId: ''
};
