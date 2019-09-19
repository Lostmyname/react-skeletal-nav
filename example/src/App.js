import React from 'react';
import { withNav, withNavItem } from 'react-skeletal-nav';

export const Nav = withNav(
  ({ children, goBack, route, isStack, isVisible }) =>
    // Only render stack nav
    isStack && (
      // Hide if not visible, but don't unmount so nested navs stay mounted
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        {/* Never render the back button on the "root" nav */}
        {route !== 'root' && <button onClick={goBack}>Back</button>}

        {/* Render children, including nested navs */}
        {children}
      </div>
    )
);

export const NavItem = withNavItem(({ children, href, onClick, title }) => (
  <div>
    {href && <a href="">{title}</a>}
    {!href && <button onClick={onClick}>{title}</button>}

    {/* Render nested navs */}
    {children}
  </div>
));

export default () => (
  <Nav>
    <NavItem title="Item 1" href="/" />
    <NavItem title="Item 2" href="/" />
    <NavItem title="Sub Nav">
      <Nav>
        <NavItem title="Subitem 1" href="/" />
        <NavItem title="Subitem 2" href="/" />
      </Nav>
    </NavItem>
  </Nav>
);
