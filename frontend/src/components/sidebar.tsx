import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface SidebarProps {
    setView: (view: string) => void;
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    isSmallScreen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ setView, drawerWidth, mobileOpen, handleDrawerToggle, isSmallScreen }) => {
    const drawer = (
        <div>
            <List>
                {['Overview', 'Income', 'Expenses'].map((text, index) => (
                    <ListItem button key={text} onClick={() => setView(text)}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {/* <Divider /> */}
        </div>
    );

    return (
        <nav>
            <Drawer
                variant={isSmallScreen ? 'temporary' : 'permanent'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '64px' }
                }}
            >
                {drawer}
            </Drawer>
        </nav>
    );
};

export default Sidebar;
