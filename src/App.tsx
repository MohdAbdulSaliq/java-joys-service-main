
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import AuthModal from "@/components/auth/AuthModal";

// Pages
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                
                <main className="flex-1">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/menu/:categoryId" element={<Menu />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/checkout/success" element={<CheckoutSuccess />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/profile" element={<Profile />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                
                <Footer />
                
                {/* Modals and Overlays */}
                <CartSidebar />
                <AuthModal />
                
                {/* Toasts */}
                <Toaster />
                <Sonner />
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
