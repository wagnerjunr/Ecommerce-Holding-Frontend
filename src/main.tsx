import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'
import './index.css'

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./Pages/Home/HomePage.tsx";
import LoginPage from './Pages/Auth/Login.tsx'
import RegisterPage from './Pages/Auth/Register.tsx'
import { ProductPageWrapper } from './Pages/Product/ProductPageWrapper.tsx'
import { OrderSuccessPage } from './Pages/Checkout/SucessPage/SuccessPage.tsx'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage.tsx'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/product/:provider/:id",
        element: <ProductPageWrapper />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);