import React, { useState } from 'react';
import { RootNavContext } from '../context';

const NavRoot = ({ navRootId = 'nav-root', children }) => {
  const [route, setRoute] = useState(['root']);
  const [activeRoute, setActiveRoute] = useState([]);

  return (
    <RootNavContext.Provider
      value={{
        route,
        activeRoute,
        setRoute,
        setActiveRoute,
        navRootId
      }}
    >
      {/* {`/${route.join('/')}`} */}
      <div>{children}</div>
      <div id={navRootId} />
    </RootNavContext.Provider>
  );
};

export const OptionalNavRoot = ({ children }) => (
  <RootNavContext.Consumer>
    {({ route }) => (!!route ? children : <NavRoot>{children}</NavRoot>)}
  </RootNavContext.Consumer>
);

export default NavRoot;
