import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, styled, useMediaQuery, useTheme } from '@mui/material';
import styles from '../../../styles/page.module.css';
import { useRouter } from 'next/navigation';
import ModalLogout from './ModalSair';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))
  

export default function MenuHeader() {
    const [sideOpneMenu, setSideOpenMenu] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:850px)');
    const theme = useTheme();

    const handleDrawerOpen = (): void => {
        setSideOpenMenu(() => true)
    }

    const handleDrawerClose = (): void => {
        setSideOpenMenu(() => false)
    }

    const handleOpenModal = (): void => {
        setOpenModal(true)
    }
    return (
        <>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        mr: 2,
                        ...(sideOpneMenu && {
                            display: 'none'
                        })
                    }}
                >
                    <MenuIcon sx={{ padding: '0px', margin: '0px' }} />
                </IconButton>
                <Drawer
                    sx={{
                        width: isMobile ? '100vw' : '250px',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: isMobile ? '100vw' : '100px',
                            boxSizing: 'border-box'
                        }
                    }}
                    variant="persistent"
                    anchor="left"
                    open={sideOpneMenu}
                >
                    <Box sx={{ height: isMobile ? '100%' : '100vh' }}>
                    <List
                        className={styles.listLayout}
                        sx={{
                            bgcolor: '#FFF',
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            mb: '1rem',
                            minHeight: '100vh',
                            height: 'auto',
                            color: '#000000',
                            itemsColor: '#000000',
                        }}
                    >
                        <Box>
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose} sx={{ color: '#000000' }}>
                                {theme.direction === 'ltr' ? (
                                    <ChevronLeftIcon sx={{ color: '#000000' }} />
                                ) : (
                                    <ChevronRightIcon sx={{ color: '#000000' }} />
                                )}
                                </IconButton>
                            </DrawerHeader>
                        </Box>
                        <ListItemButton>
                            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', color: '#000000' }}>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText className="conteudoMenu"/>
                        </ListItemButton>
                        <ListItemButton onClick={handleOpenModal} >
                            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', color: '#000000' }}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                    </Box>
                </Drawer>
            </Toolbar>
            <ModalLogout setOpenModal={setOpenModal} openModal={openModal} />
        </>
    )
}