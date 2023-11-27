import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const navToLogin = () => {
    navigate("/login");
  };
  const navToRegister = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="main-div">
        Welcome to Split BIT
        <div className="button-container">
          <button
            className=" main-screen-button cursor-pointer transition-all  text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={navToLogin}
          >
            Login
          </button>
          <button
            className=" main-screen-button cursor-pointer transition-all  text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={navToRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
