import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import UsersTableApi from "./components/UsersTableApi";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersTableApi />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
