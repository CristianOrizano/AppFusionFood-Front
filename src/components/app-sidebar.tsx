import * as React from "react";
import {
  AudioWaveform,
  BarChart,
  BookOpen,
  Clock,
  Command,
  GalleryVerticalEnd,
  HomeIcon,
  LucideIcon,
  Menu,
  PlaneTakeoff,
  Settings,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logoDash from "../assets/logoDash.png";

// This is sample data.
const data = {
  user: {
    name: "cristian",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/home",
      icon: HomeIcon,
    },
    {
      title: "Administración de Platos",
      url: "#",
      icon: Menu,
      items: [
        {
          title: "Categorías",
          url: "/dashboard/categoria",
          icon: Tags,
        },
        {
          title: "Menús",
          url: "/dashboard/foodmenu",
          icon: BookOpen,
        },
        {
          title: "Platos",
          url: "/dashboard/platos",
          icon: PlaneTakeoff,
        },
      ],
    },
    {
      title: "Gestión de Pedidos",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Pedidos Activos",
          url: "/pedidos/activos",
          icon: Clock,
        },
        {
          title: "Historial de Pedidos",
          url: "/pedidos/historial",
          icon: PlaneTakeoff,
        },
      ],
    },
    {
      title: "Clientes",
      url: "/dashboard/cliente",
      icon: Users,
    },
    {
      title: "Reportes y Estadísticas",
      url: "/reportes",
      icon: BarChart,
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
  ],
};
type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img
          src={logoDash}
          className="w-20 h-10 sm:w-24 sm:h-12 md:w-55 md:h-18  object-contain"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain as NavItem[]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
