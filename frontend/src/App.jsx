import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  // track authenticated user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobPage user={user} />} />
            <Route
              path="/add-job"
              element={user ? <AddJobPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/edit-job/:id"
              element={user ? <EditJobPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" replace /> : <Signup setUser={setUser} />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;