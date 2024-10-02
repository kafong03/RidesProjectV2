import { Outlet, Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/ridelist">All Rides</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Root;