/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import ReactDOM from 'react-dom';
import { NestedNavContext, RootNavContext } from '../context';
import { OptionalNavRoot } from './NavRoot';
import buildRenderProps from '../utils/build-render-props';
import withRender from '../utils/with-render';

const isBrowser = typeof window !== 'undefined';

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);

    if (isBrowser) {
      this.el = document.createElement('div');
    }
  }

  componentDidMount() {
    const { navRootId = 'nav-root' } = this.context;

    if (isBrowser) {
      this.navRoot = document.getElementById(navRootId);
      this.navRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (isBrowser) {
      this.navRoot.removeChild(this.el);
    }
  }

  render() {
    const { id = 'root', render, ...remainingProps } = this.props;

    return (
      <NestedNavContext.Consumer>
        {nestedContext => {
          const navId = nestedContext.navId || id;

          const renderProps = buildRenderProps(this.context, {
            ...nestedContext,
            navId
          });

          const body = render({
            ...renderProps,
            ...remainingProps,
            title: remainingProps.title || nestedContext.title
          });

          if (isBrowser) {
            return !nestedContext.isInline
              ? ReactDOM.createPortal(body, this.el)
              : body;
          }

          return id === 'root' && renderProps.isVisible && body;
        }}
      </NestedNavContext.Consumer>
    );
  }
}

Nav.contextType = RootNavContext;

const NavWithRoot = props => (
  <OptionalNavRoot>
    <Nav {...props} />
  </OptionalNavRoot>
);

export const withNav = c => withRender(NavWithRoot, c);

export default Nav;
