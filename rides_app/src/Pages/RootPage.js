// RootPage.js
import { Outlet,Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const RootPage = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
};

export default RootPage;