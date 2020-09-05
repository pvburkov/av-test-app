import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Loader.css';

const loaderClasses = withNaming({ m: '--', v: '-' })('loader');

const Loader = ({
  size
}) => (
  <div className={loaderClasses('', { size })}></div>
);

export default memo(Loader);

Loader.propTypes = {
  size: PropTypes.string
};

Loader.defaultProps = {
  size: 'm'
};
