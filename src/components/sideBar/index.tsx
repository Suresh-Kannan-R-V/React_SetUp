import {
  DashboardIcon,
  LooksOneIcon,
  LooksTwoIcon,
  PeopleAltIcon,
  PersonIcon,
} from "@/assets/icons";
import { useInitialSetUpStore } from "@/store/initialSetUp";
import { getSidebarMenu, useDarkMode } from "@/utils/sideMenu";
import React from "react";
import { NavItemProps, Sidebar } from "./sidebar";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const WithSideBar = () => {
  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useInitialSetUpStore();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const onSideBarChange = (data: NavItemProps) => {
    if (data?.route) {
      navigate(data?.route);
    }
  };

  const handleLogOut = () => {
    googleLogout();
    setUserLoginData({});
    navigate("/auth/signIn");
  };

  const getIcon = (key: string) => {
    switch (key) {
      case "Dashboard":
        return <DashboardIcon />;
      case "page1":
        return <LooksOneIcon />;
      case "student":
        return <PeopleAltIcon />;
      case "admin":
        return <PersonIcon />;
      case "page2":
        return <LooksTwoIcon />;
      default:
        return <></>;
    }
  };

  const defaultItems = React.useMemo(
    () =>
      getSidebarMenu()?.map((item) => ({
        ...item,
        icon: getIcon(item?.key),
      })),
    [],
  );

  return (
    <>
      <Sidebar
        items={defaultItems}
        onSideBarChange={onSideBarChange}
        onPressColorMode={toggleDarkMode}
        onPressLogout={handleLogOut}
        isDarkMode={isDarkMode}
        profileImage={userLoginData?.picture}
        userName={userLoginData?.name}
        Email={userLoginData?.email}
      />
    </>
  );
};
