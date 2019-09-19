# react-skeletal-nav 🦴🧭

> A set of React components for building recursive navigation UIs for the web

[![NPM](https://img.shields.io/npm/v/react-skeletal-nav.svg)](https://www.npmjs.com/package/react-skeletal-nav) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

Makes defining recursive navs as simple as this

```jsx
const Header = () => (
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
```

It's also possible to [render from JSON](#from-json) by taking advantage from the `react-from-json` library.

## Install

```bash
npm install --save react-skeletal-nav
```

## Usage

`react-skeletal-nav` provides 3 skeleton components:

1. `<Nav />` - The root navigation component.
2. `<NavItem />` - A navigation item, such as a link to a page, or link to a nested `<Nav />`
3. `<NavList />` - A group of `<NavItem />` components. Useful for segmenting your items. Optional.

**You need to extend these components for use in your app.** It's easiest to use the HOCs provided, but you can also use render props.

**Nav.js**

```jsx
import React from 'react';
import { withNav } from 'react-skeletal-nav';

export const Nav = withNav(
  ({ children, goBack, route, isStack, isVisible }) =>
    // Only render stack nav
    isStack && (
      // Hide if not visible, but don't unmount so nested Navs stay mounted
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        {/* Never render the back button on the "root" nav */}
        {route !== 'root' && <button onClick={goBack}>Back</button>}

        {/* Render children, including nested Navs */}
        {children}
      </div>
    )
);
```

**NavItem.js**

```jsx
import React from 'react';
import { withNavItem } from 'react-skeletal-nav';

export const NavItem = withNavItem(({ children, href, onClick, title }) => (
  <div>
    {href && <a href="">{title}</a>}
    {!href && <button onClick={onClick}>{title}</button>}

    {/* Render nested navs */}
    {children}
  </div>
));
```

**App.js**

```jsx
import Nav from './Nav';
import NavItem from './NavItem';

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
```

### Rendering from JSON

We can also render complex navigation UI from JSON, using the `react-from-json` library. This is particularly useful when working with a headless CMS.

```jsx
import React from 'react';
import ReactFromJSON from 'react-from-json';
import Nav from './Nav';
import NavItem from './NavItem';

const componentMapping = {
  Nav,
  NavItem
};

const data = {
  type: 'Nav',
  props: {
    children: [
      { type: 'NavItem', props: { href: '/', title: 'Item 1' } },
      { type: 'NavItem', props: { href: '/', title: 'Item 2' } },
      {
        type: 'NavItem',
        props: {
          children: {
            type: 'Nav',
            props: {
              children: [
                {
                  type: 'NavItem',
                  props: { href: '/', title: 'Subitem 1' }
                },
                {
                  type: 'NavItem',
                  props: { href: '/', title: 'Subitem 2' }
                }
              ]
            }
          },
          title: 'SubNav'
        }
      }
    ]
  }
};

export default () => <ReactFromJSON mapping={componentMapping} entry={data} />;
```

## API

TBD

## License

MIT © [chrisvxd](https://github.com/chrisvxd)
