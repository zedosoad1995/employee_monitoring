import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar";
import UsersTable from "./components/Table/Table"

function App() {
  return (
    <>
      <AppBar position="static" >
        <Toolbar />
      </AppBar>
      <UsersTable />
    </>
  );
}

export default App;
