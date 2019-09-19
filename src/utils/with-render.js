/* eslint-disable react/jsx-no-bind */
import React from 'react';

export default (Core, Inner) => props => (
  <Core {...props} render={renderProps => <Inner {...renderProps} />} />
);
