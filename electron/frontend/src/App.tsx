import Home from "./components/Pages/Home"
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App
