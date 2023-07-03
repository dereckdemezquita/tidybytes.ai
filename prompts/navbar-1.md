I have this code for my Dashboard.tsx. I want you to help to modularise it, let's separate the Navbar into a separate component. I want you to use features from Blueprint.

Here is the Blueprint documentation for Navbar:

---
Navbar

Navbars present useful navigation controls at the top of an application.

Blueprint

Home

Files
Props

Align right

View source on GitHub
Fixed to viewport top

Enable the fixedToTop prop to attach a navbar to the top of the viewport using position: fixed; top: 0;. This is so-called "sticky" behavior: the navbar stays at the top of the screen as the user scrolls through the document.

This modifier is not illustrated here because it breaks the document flow.

Body padding required
The fixed navbar will lie on top of your other content unless you add padding to the top of the <body> element equal to the height of the navbar. Use the $pt-navbar-height Sass variable.
Fixed width

If your application is inside a fixed-width container (instead of spanning the entire viewport), you can align the navbar to match by wrap your navbar groups in an element with your desired width and margin: 0 auto; to horizontally center it.

Blueprint
Home
Files

<nav class="bp5-navbar bp5-dark">
  <div style="margin: 0 auto; width: 480px;"> <!-- ADD ME -->
    <div class="bp5-navbar-group bp5-align-left">
      <div class="bp5-navbar-heading">Blueprint</div>
    </div>
    <div class="bp5-navbar-group bp5-align-right">
      <button class="bp5-button bp5-minimal bp5-icon-home">Home</button>
      <button class="bp5-button bp5-minimal bp5-icon-document">Files</button>
      <span class="bp5-navbar-divider"></span>
      <button class="bp5-button bp5-minimal bp5-icon-user"></button>
      <button class="bp5-button bp5-minimal bp5-icon-notifications"></button>
      <button class="bp5-button bp5-minimal bp5-icon-cog"></button>
    </div>
  </div>
</nav>
Props

The Navbar API includes four stateless React components:

Navbar
NavbarGroup (aliased as Navbar.Group)
NavbarHeading (aliased as Navbar.Heading)
NavbarDivider (aliased as Navbar.Divider)
These components are simple containers for their children. Each of them supports the full range of HTML <div> props.

<Navbar>
    <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp5-minimal" icon="home" text="Home" />
        <Button className="bp5-minimal" icon="document" text="Files" />
    </Navbar.Group>
</Navbar>
interface NavbarProps extends Props, HTMLAttributes
@blueprintjs/core
Props	Description
children	React.ReactNode
className	undefined | string
A space-delimited list of class names to pass along to a child element.
Inherited from Props.className
fixedToTop	undefined | false | true
Whether this navbar should be fixed to the top of the viewport (using CSS position: fixed).
interface NavbarGroupProps extends Props, HTMLAttributes
@blueprintjs/core
Props	Description
align	AlignmentAlignment.LEFT
The side of the navbar on which the group should appear. The Alignment enum provides constants for these values.
children	React.ReactNode
className	undefined | string
A space-delimited list of class names to pass along to a child element.
Inherited from Props.className
interface NavbarHeadingProps extends Props, HTMLAttributes
@blueprintjs/core
Props	Description
children	React.ReactNode
className	undefined | string
A space-delimited list of class names to pass along to a child element.
Inherited from Props.className
interface NavbarDividerProps extends Props, HTMLAttributes
@blueprintjs/core
Props	Description
className	undefined | string
A space-delimited list of class names to pass along to a child element.
Inherited from Props.className
CSS

Use the following classes to construct a navbar:

nav.bp5-navbar – The parent element. Use a <nav> element for accessibility.
.bp5-navbar-group.bp5-align-(left|right) – Left- or right-aligned group.
.bp5-navbar-heading – Larger text for your application title.
.bp5-navbar-divider – Thin vertical line that can be placed between groups of elements.
Blueprint
Home
Files

.bp5-dark
Dark theme
<nav class="bp5-navbar {{.modifier}}">
  <div class="bp5-navbar-group bp5-align-left">
    <div class="bp5-navbar-heading">Blueprint</div>
    <input class="bp5-input" placeholder="Search files..." type="text" />
  </div>
  <div class="bp5-navbar-group bp5-align-right">
    <button class="bp5-button bp5-minimal bp5-icon-home">Home</button>
    <button class="bp5-button bp5-minimal bp5-icon-document">Files</button>
    <span class="bp5-navbar-divider"></span>
    <button class="bp5-button bp5-minimal bp5-icon-user"></button>
    <button class="bp5-button bp5-minimal bp5-icon-notifications"></button>
    <button class="bp5-button bp5-minimal bp5-icon-cog"></button>
  </div>
</nav>
---

Requirements:

1. Create a Navbar component.
2. Navbar component should be created by using Blueprint components.
3. The Navbar component should be aligned left.
4. The Navbar component should have a heading with the website name TidyBytes.io
6. There should be a divider between the first and second button.
5. The first should be Home; this renders the currently selected app (displayed in the MainPanel of the dashbaord)
7. The second button should be Files; renders the Files app in the main panel of the dashboard
8. The third button should be a user icon with the username displayed, this should be right aligned

Here is the current code I have:

```tsx
import { Alignment, Navbar, NavbarGroup, NavbarHeading, Popover, Menu, MenuItem, Position, Button } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { unsetUserData } from '../redux/actions';
// ----------------------------------
import { Sidebar } from './modules/Sidebar';

const DashboardLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    overflow: auto;
`;

const MainPanel = styled.div`
    flex-grow: 2;
    padding: ${({ theme }) => theme.spacing.medium};
    background: ${({ theme }) => theme.colors.secondary};
`;

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(unsetUserData()); // Clear user data from state
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/'); // Redirect to landing page
    }

    const userMenu = (
        <Menu>
            <MenuItem text="Settings" onClick={() => navigate('/settings')} />
            <MenuItem text="Log out" onClick={handleLogout} />
        </Menu>
    );

    return (
        <DashboardLayout>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>TidyBytes.io</NavbarHeading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Popover content={userMenu} position={Position.BOTTOM_RIGHT}>
                        <Button className="bp3-minimal" icon="user" text="User" />
                    </Popover>
                </NavbarGroup>
            </Navbar>
            <Content>
                <Sidebar>
                    {/* Sidebar content goes here */}
                </Sidebar>
                <MainPanel>
                    {/* Main app content goes here */}
                </MainPanel>
            </Content>
        </DashboardLayout>
    );
};
```