import React from 'react';
import { NestedNavContext, RootNavContext } from '../context';
import buildRenderProps from '../utils/build-render-props';
import withRender from '../utils/with-render';

const NavList = ({ render, ...props }) => (
  <RootNavContext.Consumer>
    {rootContext => (
      <NestedNavContext.Consumer>
        {nestedContext =>
          render({
            ...buildRenderProps(rootContext, nestedContext),
            ...props
          })
        }
      </NestedNavContext.Consumer>
    )}
  </RootNavContext.Consumer>
);

export const withNavList = c => withRender(NavList, c);

export default NavList;
