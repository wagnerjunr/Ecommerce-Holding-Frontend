import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "./components/Layout/Navbar/Navbar";
import CartDrawer from "./components/DrawerShop/Drawer";
import { Footer } from "./components/Layout/Footer/Footer";

// Create a client
const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" richColors />
      {!isAuthPage && <Navbar/>}
      <main className="flex min-h-screen flex-col items-center overflow-hidden">
        <Outlet />
      </main>
      <CartDrawer />
      {!isAuthPage && <Footer/>}
    </QueryClientProvider>
  );
}

export default App;