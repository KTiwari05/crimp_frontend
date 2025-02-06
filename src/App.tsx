import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"; // Import the Home page component
import { BackgroundBeamsWithCollisionDemo } from "./components/backgroundbeamswithcollision"; // Import BackgroundBoxesDemo component
import ProtectedRoute from "./components/protectedroutes"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for the login/landing page */}
        <Route path="/" element={<BackgroundBeamsWithCollisionDemo />} />

        {/* Protected route for the home page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
