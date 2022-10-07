import { useState } from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Groups from "./Groups"
import { useNavigate } from "react-router-dom"
import Timesheet from "./Timesheet/Timesheet"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from '@mui/icons-material/Menu'
import Box from "@mui/material/Box"
import Employees from "./Employees"

function Home() {
    const navigate = useNavigate()

    const [openSideMenu, setOpenSideMenu] = useState(false)

    const handleClickMenuBtn = () => {
        setOpenSideMenu(true)
    }

    const handleCloseSideMenu = () => {
        setOpenSideMenu(false)
    }

    const handleClickMenuItem = (url: string) => () => {
        navigate(`/${url}`)
    }

    return (
        <>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        sx={{ mr: 2 }}
                        onClick={handleClickMenuBtn}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ p: 4, width: "fit-content" }}>
                    <Routes>
                        <Route path="" element={<Timesheet />} />
                        <Route path="groups" element={<Groups />} />
                        <Route path="employees" element={<Employees />} />
                        <Route path="timesheet" element={<Navigate replace to="/" />} />
                    </Routes>
                </Box>
            </div>
            <Drawer
                anchor="left"
                open={openSideMenu}
                onClose={handleCloseSideMenu}
            >
                <List>
                    {[{ id: 'timesheet', label: 'Timesheet' }, { id: 'employees', label: 'Employees' }, { id: 'groups', label: 'Groups' }].map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={handleClickMenuItem(item.id)}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

export default Home
