import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const {uid} = useSelector((state)=> state.auth)


  if (uid == null) {
    return navigate('/login')
  }

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
