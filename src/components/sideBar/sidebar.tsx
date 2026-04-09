import {
  ArrowLeftIcon,
  DarkModeIcon,
  LightModeIcon,
  LogoutIcon,
} from "@/assets/icons";
import { useInitialSetUpStore } from "@/store/initialSetUp";
import { cn } from "@heroui/react";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

export type NavItemProps = {
  id?: string;
  key: string;
  icon: React.ReactNode;
  route?: string;
};

export type SidebarProps = {
  items?: NavItemProps[];
  onSideBarChange: (data: NavItemProps) => void;
  onPressColorMode?: () => void;
  onPressLogout?: () => void;
  isColorMode?: boolean;
  isDarkMode?: boolean;
  className?: string;
  Logo?: React.ReactNode | string;
  profileImage?: string;
  userName?: string;
  Email?: string;
};

export const Sidebar = (props: SidebarProps) => {
  const location = useLocation();
  const {
    className,
    items = [],
    onSideBarChange = () => {},
    onPressColorMode = () => {},
    onPressLogout = () => {},
    profileImage,
    Logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12mA3zSzz_9SWnLm4B_0OocWAQhpAnaAzYA&s",
    isColorMode,
    isDarkMode,
    userName,
    Email,
  } = props;
  const { isSideBarOpen, setIsSideBarOpen } = useInitialSetUpStore();

  const URLPath = location.pathname;

  // Logic adapted from reference: check exact match OR sub-route match
  const isRouteActive = (route?: string) => {
    if (!route) return false;
    return URLPath === route || URLPath.startsWith(route + "/");
  };

  const actionItems = useMemo(
    () =>
      [
        !isColorMode && {
          key: "colorMode",
          icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />,
          onPress: onPressColorMode,
        },
        { key: "logout", icon: <LogoutIcon />, onPress: onPressLogout },
      ].filter(Boolean) as {
        key: string;
        icon: React.ReactNode;
        onPress?: () => void;
      }[],
    [onPressLogout, onPressColorMode, isDarkMode, isColorMode],
  );

  return (
    <div className="relative">
      {/* Sidebar Toggle Button */}
      <button
        className={cn(
          "absolute bg-white p-1 size-5 flex items-center justify-center rounded-full top-7 right-0 cursor-pointer z-10 border-2",
          isSideBarOpen
            ? "md:translate-x-[14px] translate-x-[78px]"
            : "rotate-180 translate-x-9 ",
        )}
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      >
        <ArrowLeftIcon size={18} className="absolute text-background" />
      </button>

      <div
        className={cn(
          "transition-opacity duration-300 ease-in-out animate-fade-in absolute md:static",
          !isSideBarOpen && "hidden",
        )}
      >
        <div
          className="absolute bg-opacity-30 h-full w-[80vw] left-16 md:hidden block cursor-pointer"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          role="button"
        />

        <div
          className={cn(
            "h-screen gap-3 bg-background w-[4rem] flex flex-col items-center border-r-2 border-slate-300 z-10",
            className,
          )}
        >
          {/* Sidebar Logo */}
          <div className="px-2 pb-1 pt-3.5 shrink-0 relative">
            <img
              alt="L"
              className="w-11 h-11 rounded-full"
              src={typeof Logo === "string" ? Logo : undefined}
            />
          </div>

          {/* Nav Items */}
          <div className="grow flex flex-col items-center gap-3">
            {items.map((item) => {
              const active = isRouteActive(item.route);
              return (
                <div key={item.key} className="relative group">
                  <div
                    className={cn(
                      "rounded-xl h-[2.75rem] w-[2.7rem] flex justify-center items-center transition-all duration-300",
                      // Colors adapted from reference: bg-indigo-500/20 for active
                      active
                        ? "bg-indigo-500/20 text-indigo-600 scale-110"
                        : "text-slate-500 hover:bg-indigo-500/10 hover:text-indigo-500",
                    )}
                    role="button"
                    onClick={() => onSideBarChange(item)}
                  >
                    {/* Applying stroke width logic if icons support it */}
                    {item.icon}
                  </div>

                  {/* Indigo indicator dot/bar */}
                  <div
                    className={cn(
                      "absolute bg-indigo-600 w-1 h-5 rounded-full left-[-10px] top-1/2 -translate-y-1/2 transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
              );
            })}
          </div>

          {/* Sidebar Action Items */}
          <div>
            <div className="w-full py-3 flex flex-col items-center gap-4">
              {actionItems.map((item) => (
                <div
                  key={item.key}
                  className={cn(
                    "rounded-xl h-[2.75rem] w-[2.7rem] flex justify-center items-center transition-colors",
                    item.key === "logout"
                      ? "text-rose-500 hover:bg-rose-500/10"
                      : "text-slate-500 hover:bg-indigo-500/10 hover:text-indigo-500",
                  )}
                  role="button"
                  onClick={() => item?.onPress?.()}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Profile Image */}
            <div
              className="pb-3.5 flex justify-center"
              title={`${userName ?? ""}${userName && Email ? " — " : ""}${Email ?? ""}`}
            >
              <img
                alt={userName ? `Profile of ${userName}` : "Profile"}
                className="rounded-full w-10 h-10 cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all"
                src={
                  typeof profileImage === "string" ? profileImage : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
