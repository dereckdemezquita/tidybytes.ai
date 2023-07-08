// NavbarComponent.tsx
import { Alignment, Button, Navbar as BPNavbar, NavbarGroup, NavbarHeading, NavbarDivider, Popover, Menu, MenuItem, Position } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { unsetUserData } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    setSelectedApp: (app: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSelectedApp }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // once logout navigate to '/'
    const handleLogout = () => {
        dispatch(unsetUserData());
        localStorage.removeItem('token');
        navigate('/');
    };

    const userMenu = (
        <Menu>
            <MenuItem text="Settings" onClick={() => {/* Navigate to settings */}} />
            <MenuItem text="Log out" onClick={handleLogout} />
        </Menu>
    );

    return (
        <BPNavbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>TidyBytes.io</NavbarHeading>
                <NavbarDivider />
                <Button className="bp3-minimal" icon="home" text="Home" onClick={() => setSelectedApp('home')} />
                <Button className="bp3-minimal" icon="document" text="Files" onClick={() => setSelectedApp('files')} />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Popover content={userMenu} position={Position.BOTTOM_RIGHT}>
                    <Button className="bp3-minimal" icon="user" text="User" />
                </Popover>
            </NavbarGroup>
        </BPNavbar>
    );
};

export default Navbar;
