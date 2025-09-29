import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        {user && <Link to="/add-job">Add Job</Link>}
        {user ? (
          <>
            <span>{user?.name || user?.email}</span>
            <Link onClick={() => { localStorage.removeItem('user'); setUser && setUser(null); }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;