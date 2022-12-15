import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import Groups from "./Groups";
import { useNavigate } from "react-router-dom";
import Timesheet from "./Timesheet/Timesheet";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Employees from "./Employees";
import { Typography } from "@mui/material";
import GroupDetails from "./GroupDetails/GroupDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavbarStore } from "../../store/navbar";

const NAVBAR_TEXTS = [
  { page: "/", text: "Timesheet" },
  { page: "/employees", text: "Employees" },
  { page: "/groups", text: "Groups" },
];

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const { title } = useNavbarStore();

  const [openSideMenu, setOpenSideMenu] = useState(false);

  const handleClickMenuBtn = () => {
    setOpenSideMenu(true);
  };

  const handleCloseSideMenu = () => {
    setOpenSideMenu(false);
  };

  const handleClickMenuItem = (url: string) => () => {
    navigate(url);
    setOpenSideMenu(false);
  };

  const handleClickBackGroupDetails = () => {
    navigate("/groups");
  };

  const isGroupDetails = Boolean(matchPath("groups/:id", location.pathname));

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          {isGroupDetails && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={handleClickBackGroupDetails}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {!isGroupDetails && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={handleClickMenuBtn}
            >
              <MenuIcon />
            </IconButton>
          )}
          {isGroupDetails && (
            <Typography variant="h6" component="div">
              Group: {title}
            </Typography>
          )}
          {!isGroupDetails && (
            <Typography variant="h6" component="div">
              {NAVBAR_TEXTS.find((n) => n.page === location.pathname)?.text}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Box sx={{ p: 4, width: "auto" }}>
          <Routes>
            <Route path="" element={<Timesheet />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:id" element={<GroupDetails />} />
            <Route path="employees" element={<Employees />} />
            <Route path="timesheet" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </div>
      <Drawer anchor="left" open={openSideMenu} onClose={handleCloseSideMenu}>
        <List>
          {[
            { id: "timesheet", label: "Timesheet" },
            { id: "employees", label: "Employees" },
            { id: "groups", label: "Groups" },
          ].map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={handleClickMenuItem(item.id)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Home;
