import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Prescriptions from './pages/Prescriptions';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import AdminDashboard from './pages/Admin/Dashboard';
import BranchDashboard from './pages/Branch/Dashboard';
import CompanyDashboard from './pages/Company/Dashboard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import { CartItem, Product, User } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'branch' | 'company'>('user');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to sign in if not authenticated
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    // TODO: Implement order confirmation
  };

  const handleSignIn = (user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setUserRole(user.role);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('user');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
  };

  const RoleRoute = ({ 
    children, 
    allowedRole 
  }: { 
    children: React.ReactNode;
    allowedRole: 'admin' | 'branch' | 'company';
  }) => {
    return isAuthenticated && userRole === allowedRole ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          wishlistCount={wishlistItems.length}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onSignOut={handleSignOut}
          currentUser={currentUser}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                searchQuery={searchQuery}
                onAddToCart={(product) => {
                  setCartItems(prev => {
                    const existingItem = prev.find(item => item.product.id === product.id);
                    if (existingItem) {
                      return prev.map(item =>
                        item.product.id === product.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                      );
                    }
                    return [...prev, { product, quantity: 1 }];
                  });
                }}
                onToggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            } 
          />
          <Route path="/categories" element={<Categories />} />
          <Route 
            path="/prescriptions" 
            element={
              <PrivateRoute>
                <Prescriptions />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile user={currentUser} />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/signin" 
            element={
              isAuthenticated ? 
                <Navigate to="/profile" /> : 
                <SignIn onSignIn={handleSignIn} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
                <Navigate to="/profile" /> : 
                <SignUp onSignIn={handleSignIn} />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <RoleRoute allowedRole="admin">
                <AdminDashboard />
              </RoleRoute>
            } 
          />
          <Route 
            path="/branch" 
            element={
              <RoleRoute allowedRole="branch">
                <BranchDashboard />
              </RoleRoute>
            } 
          />
          <Route 
            path="/company" 
            element={
              <RoleRoute allowedRole="company">
                <CompanyDashboard />
              </RoleRoute>
            } 
          />
        </Routes>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          total={cartTotal}
          onCheckout={handleCheckout}
          isAuthenticated={isAuthenticated}
        />

        {isCheckoutOpen && (
          <Checkout
            items={cartItems}
            total={cartTotal}
            onClose={() => setIsCheckoutOpen(false)}
            onComplete={handleOrderComplete}
          />
        )}

        <Wishlist
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistItems}
          onRemove={(productId) => {
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
          }}
          onAddToCart={(product) => {
            setCartItems(prev => {
              const existingItem = prev.find(item => item.product.id === product.id);
              if (existingItem) {
                return prev.map(item =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
              }
              return [...prev, { product, quantity: 1 }];
            });
          }}
        />
      </div>
    </Router>
  );
}

export default App;