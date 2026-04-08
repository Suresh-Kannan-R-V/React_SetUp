import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-slate-50 transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[15%] left-[10%] size-[700px] rounded-full bg-indigo-100/30" />
        <div className="absolute -bottom-[20%] -left-[10%] size-[800px] rounded-full bg-pink-100/40" />
        <div className="absolute top-[20%] -right-[5%] size-96 rounded-full hidden md:block bg-blue-100/40" />
      </div>

      <main className="relative z-10 w-full max-w-xl min-h-xs p-8 md:p-12 transition-all duration-500 flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
