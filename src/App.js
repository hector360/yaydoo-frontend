
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import { YaydooLayout } from "./layouts/yaydo-layout";
import Home from "./pages/home.pages";
import Dashboard from "./components/Dashboard";
const Auth = lazy(() => import("./pages/auth.page"));
// const Dashboard = lazy(() => import("./components/Dashboard"));

// import './App.css';

function App() {
  return (
    <div className="App">
      <YaydooLayout>

        <Router>
          <Routes>
          <Route path="/auth/*" element={<Auth />} />
            
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Home />                  
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate replace={true} to="/auth" />} />
            {/* <Route path="/auth/*" element={<Auth />} />
          <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div>dddf</div>
                </PrivateRoute>
              }
            />
          <Route path="/" element={<Navigate replace={true} to="/auth" />} />
          <Route path="/buyer-view" element={<BuyerView />} /> */}
          </Routes>

        </Router>
      </YaydooLayout>

    </div>
  );
}

export default App;
