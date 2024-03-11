import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex">
    <div className="w-1/1 text-white">
      <Sidebar />
    </div>
    <div className="main-container">
    <Outlet />
    </div>
  </div>
  );
}

export default App;
