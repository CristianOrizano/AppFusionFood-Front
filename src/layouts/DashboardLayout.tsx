import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, LogOut, Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="mr-10 p-2 rounded-md dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-sm cursor-pointer"
      onKeyDown={(e) =>
        e.key === "Enter" && setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </div>
  );
};

const DashboardLayout = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setHasNotification(false);
  };

  const [notifications] = useState([
    "Notificación 1",
    "Notificación 2",
    "Notificación 3",
  ]);

  const cerrarSesion = (e: { preventDefault: () => void }): void => {
    window.location.href = "/login";
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-slate-50 dark:bg-neutral-950">
          <header className="bg-white dark:bg-neutral-950 flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center gap-2 mx-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <div className="p-2 rounded-md transition-colors hover:bg-gray-200 hover:text-accent-foreground dark:hover:bg-gray-800">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80"
                  align="end"
                  sideOffset={1}
                >
                  {notifications.map((notification, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src="https://avatars.githubusercontent.com/u/19550456"
                          alt="User Avatar"
                        />
                        <AvatarFallback>CR</AvatarFallback>
                      </Avatar>
                      <span>{notification}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/19550456"
                      alt="User Avatar"
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-60"
                  align="end"
                  sideOffset={1}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/19550456" />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          Critian Orizano
                        </span>
                        <span className="truncate text-xs">
                          {"cristian@gmail.com"}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Perfil
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={cerrarSesion}
                    className="cursor-pointer "
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
            </div>
          </header>
          <main className="py-4 md:py-6 px-4 lg:px-6 ">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
