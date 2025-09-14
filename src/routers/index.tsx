import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: HomeLayout } = await import(
        "../layouts/DashboardLayout"
      );
      return { element: <HomeLayout /> };
    },
    children: [
      {
        path: "home",
        async lazy() {
          const { default: Home } = await import(
            "../modules/dashboard/home/views/index"
          );
          return {
            element: <Home />,
          };
        },
      },
      {
        path: "categoria",
        async lazy() {
          const { default: Categoria } = await import(
            "../modules/dashboard/categoria/views/index"
          );
          return {
            element: <Categoria />,
          };
        },
      },
      {
        path: "foodmenu",
        async lazy() {
          const { default: Food } = await import(
            "../modules/dashboard/food/views/index"
          );
          return {
            element: <Food />,
          };
        },
      },
      {
        path: "cliente",
        async lazy() {
          const { default: Cliente } = await import(
            "../modules/dashboard/cliente/views/index"
          );
          return {
            element: <Cliente />,
          };
        },
      },
    ],
  },
  {
    path: "demo",
    async lazy() {
      const { default: Demo } = await import(
        "../modules/dashboard/cliente/views/index"
      );
      return {
        element: <Demo />,
      };
    },
  },
  {
    path: "/login",
    async lazy() {
      const { default: LoginLayout } = await import(
        "../modules/auth/views/index"
      );
      return { element: <LoginLayout /> };
    },
  },
];
export default createBrowserRouter(routes);
