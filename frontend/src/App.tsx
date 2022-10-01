import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar"
import Home from "./components/Pages/Home";

function App() {
  return (
    <>
      <AppBar position="static" >
        <Toolbar />
      </AppBar>
      <Box sx={{ p: 4 }}>
        <Home />
      </Box>
    </>
  );
}

export default App
