import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Loader.css';

const loaderClasses = withNaming({ m: '--', v: '-' })('loader');

const Loader = ({
  className,
  size
}) => (
  <div className={loaderClasses('', { size }, [className])}></div>
);

export default memo(Loader);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
};

Loader.defaultProps = {
  className: '',
  size: 'm'
};
