import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
// import { CameraProvider } from "./provider/CameraProvider";
import DefaultLayout from "./layouts/DefaultLayout";
import { routes } from "./routes";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.component;
        let Layout: React.FC<DefaultLayoutProps> = DefaultLayout;
        if (route.layout) {
          Layout = route.layout as React.FC<DefaultLayoutProps>;
        } else if (route.layout === null) {
          Layout = ({ children }) => <>{children}</>;
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default App;
