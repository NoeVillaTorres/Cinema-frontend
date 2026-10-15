import {Routes, Route, Navigate} from "react-router-dom"
import { Home } from "../pages/cinema-app/Home"
import { MainLayout } from "../layouts/MainLayout"

import { useAuth } from "../context/AuthContext";
import {Login} from "../pages/auth/Login";
import {Admin} from "../pages/auth/Admin";
import {TitleDetails} from "../pages/cinema-app/TitleDetails";

  
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}


export const AppRouter = () => {
    return (
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/titles/:id" element={<TitleDetails />} />

            <Route path="/login" element={<Login />} />

            

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      );
    }