// import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routing } from "./components/rootRoute";

function App() {
  return <RouterProvider router={routing}></RouterProvider>;
}

export default App;
