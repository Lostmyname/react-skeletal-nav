import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';

import { NestedNavContext, RootNavContext } from '../context';
import buildRenderProps from '../utils/build-render-props';
import withRender from '../utils/with-render';

const NavItem = ({ children, href, render, targetNavId, ...renderProps }) => {
  const [navId] = useState(
    targetNavId || uniqueId(`${kebabCase(renderProps.title || 'nav')}-`)
  );

  return (
    <RootNavContext.Consumer>
      {rootContext => (
        <NestedNavContext.Consumer>
          {navContext => {
            const { route, setRoute } = rootContext;
            const { navId: parentNavId, absoluteRoute: parentAbsoluteRoute } = navContext;

            const routeIndex = route.indexOf(parentNavId);
            const targetRouteIndex = route.indexOf(navId);
            const isInRoute = targetRouteIndex >= 0;

            const nextAbsoluteRoute = [...parentAbsoluteRoute, navId];

            const nextNestedContext = {
              title: renderProps.title,
              absoluteRoute: nextAbsoluteRoute,
              navId
            };

            return (
              <React.Fragment>
                <NestedNavContext.Provider
                  value={{
                    ...nextNestedContext,
                    isInline: true
                  }}
                >
                  {render({
                    ...buildRenderProps(rootContext, { ...navContext, absoluteRoute: nextAbsoluteRoute, itemId: navId }),
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
                            navId
                          ]);
                        } else {
                          // Go forward
                          setRoute([...route, navId]);
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
                    ...nextNestedContext,
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
