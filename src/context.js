import React from 'react';

export const RootNavContext = React.createContext({});

export const NestedNavContext = React.createContext({
  navId: 'root',
  absoluteRoute: ['root']
});
