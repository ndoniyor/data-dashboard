import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="route-page">
      <nav>
        <ul>
          <li  key="home-button">
            <Link className="home-link" to="/">
              HOME
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;

