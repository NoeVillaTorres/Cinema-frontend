import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}