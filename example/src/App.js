import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withNav, withNavItem } from 'react-skeletal-nav';

export const Nav = withNav(
  ({ children, goBack, route, isStack, isVisible }) =>
    // Only render stack nav
    isStack && (
      // Hide if not visible, but don't unmount so nested navs stay mounted
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        {/* Never render the back button on the "root" nav */}
        {route !== 'root' && (
          <button className="go-back" onClick={goBack}>
            {'<'} Back
          </button>
        )}

        {/* Render children, including nested navs */}
        {children}
      </div>
    )
);

export const NavItem = withNavItem(
  ({ children, href, onClick, title, setActiveRoute, isActive }) => {
    const [isLinkActive, setIsLinkActive] = useState(false);
    useEffect(() => {
      if (href === window.location.pathname) {
        setIsLinkActive(true);
        setActiveRoute();
      }
    }, []);
    return (
      <div className={`nav-item${isActive || isLinkActive ? ' active' : ''}`}>
        {href && <a href={href}>{title}</a>}
        {!href && (
          <button onClick={onClick}>
            {title} {'>'}
          </button>
        )}
        {/* Render nested navs */}
        {children}
      </div>
    );
  }
);

const page = title => () => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default () => (
  <Router>
    <header>
      <h1>React Skeletal Nav</h1>
      <Nav>
        <NavItem title="Home" href="/" />
        <NavItem title="Personal">
          <Nav>
            <NavItem title="About Me" href="/about" />
            <NavItem title="Code" href="/code" />
          </Nav>
        </NavItem>
        <NavItem title="Contact" href="/contact" />
      </Nav>
    </header>
    <main>
      <Route exact path="/" render={page('Home')} />
      <Route exact path="/about" render={page('About')} />
      <Route exact path="/code" render={page('Code')} />
      <Route exact path="/contact" render={page('Contact')} />
    </main>
  </Router>
);
