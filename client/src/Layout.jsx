import { Outlet } from "react-router-dom";
import Header from "./ui/Header";

function Layout() {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
