import { WithSideBar } from "@/components/sideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50 transition-colors duration-500 overflow-hidden">
      <div>
        <WithSideBar />
      </div>
      <div className="flex grow">
        <div
          // style={{ padding: "22px 28px" }}
          className="p-4 grow overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-secondary"
        >
          <div className="bg-white shadow-lg rounded-xl p-2 w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
