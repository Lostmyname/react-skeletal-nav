import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';

import { NestedNavContext, RootNavContext } from '../context';
import buildRenderProps from '../utils/build-render-props';
import withRender from '../utils/with-render';

const NavItem = ({ children, href, render, targetNavId, ...renderProps }) => {
  const [localTargetNavId] = useState(
    targetNavId || uniqueId(`${kebabCase(renderProps.title || 'nav')}-`)
  );

  return (
    <RootNavContext.Consumer>
      {rootContext => (
        <NestedNavContext.Consumer>
          {navContext => {
            const { route, setRoute } = rootContext;
            const { navId } = navContext;

            const routeIndex = route.indexOf(navId);
            const targetRouteIndex = route.indexOf(localTargetNavId);
            const isInRoute = targetRouteIndex >= 0;

            const nestedContextValue = {
              title: renderProps.title,
              navId: localTargetNavId
            };

            return (
              <React.Fragment>
                <NestedNavContext.Provider
                  value={{
                    ...nestedContextValue,
                    isInline: true
                  }}
                >
                  {render({
                    ...buildRenderProps(rootContext, navContext),
                    onClick: () => {
                      if (!href) {
                        if (isInRoute) {
                          // Go back
                          setRoute(route.slice(0, targetRouteIndex));
                        } else if (navId !== route[route.length - 1]) {
                          // Go back to fork

                          // Rebuilding the route up to the current routeIndex
                          // allows us to switch between forks in the route
                          setRoute([
                            ...route.slice(0, routeIndex + 1),
                            localTargetNavId
                          ]);
                        } else {
                          // Go forward
                          setRoute([...route, localTargetNavId]);
                        }
                      }
                    },
                    href,
                    isInRoute,
                    children,
                    ...renderProps
                  })}
                </NestedNavContext.Provider>

                <NestedNavContext.Provider
                  value={{
                    ...nestedContextValue,
                    isInline: false
                  }}
                >
                  {/* Mount Nav links if it's defined recursively as a prop of NavItem */}
                  {children}
                </NestedNavContext.Provider>
              </React.Fragment>
            );
          }}
        </NestedNavContext.Consumer>
      )}
    </RootNavContext.Consumer>
  );
};

export const withNavItem = c => withRender(NavItem, c);

export default NavItem;
