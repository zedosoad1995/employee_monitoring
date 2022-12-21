import { useRef, useState } from "react";
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
import { Menu, MenuItem, Typography } from "@mui/material";
import GroupDetails from "./GroupDetails/GroupDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useExcelNavbarStore, useNavbarStore } from "../../store/navbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTemplate, upload } from "../../services/excel.service";

import { saveAs } from "file-saver";

const NAVBAR_TEXTS = [
  { page: "/", text: "Timesheet" },
  { page: "/employees", text: "Employees" },
  { page: "/groups", text: "Groups" },
];

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, menuOptions } = useNavbarStore();
  const { canDownload, hasOptions } = useExcelNavbarStore();

  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openMoreOptions, setOpenMoreOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | undefined
  >();

  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClickUploadFile = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files) {
      upload(input.files[0]);
    }
  };

  const handleOpenMoreOptions = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenMoreOptions(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreOptions = () => {
    setOpenMoreOptions(false);
  };

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

  const handleDownloadTemplate = async () => {
    const id = location.pathname.split("/").at(-1);
    if (id) {
      const data = await getTemplate(id);
      const fileBlob = new Blob([data]);
      saveAs(fileBlob, "template.xlsx");
    }
  };

  const isGroupDetails = Boolean(matchPath("groups/:id", location.pathname));

  const renderMenuElements = () => {
    const handleClose = (func: () => void) => () => {
      func();
      handleCloseMoreOptions();
    };

    return menuOptions.map((option) => (
      <MenuItem
        key={option.label}
        disabled={option.isDisabled}
        onClick={handleClose(option.onClick)}
      >
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
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
          </div>
          {hasOptions && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleOpenMoreOptions}
            >
              <MoreVertIcon />
            </IconButton>
          )}
          <Menu
            anchorEl={anchorEl}
            open={openMoreOptions}
            onClose={handleCloseMoreOptions}
          >
            {renderMenuElements()}
          </Menu>
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
