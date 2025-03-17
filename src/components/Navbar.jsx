import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  // Get the user's first name or display name
  const getUserFirstName = () => {
    if (!currentUser) return "";
    
    if (currentUser.displayName) {
      // If there's a display name, get the first part (first name)
      return currentUser.displayName.split(' ')[0];
    } else if (currentUser.email) {
      // If no display name, use the part of the email before @
      return currentUser.email.split('@')[0];
    }
    
    return "there"; // Fallback
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setMobileDrawerOpen(false);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/home" className="flex items-center">
              <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight">xtx Codes</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {currentUser ? (
              <>
                <Link to="/learn" className="hover:text-orange-500 transition-colors">
                  Learn
                </Link>
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center hover:text-orange-500 transition-colors"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span>Hi, {getUserFirstName()}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:from-orange-600 hover:to-orange-900 transition-all"
                >
                  Create an account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 top-[57px] z-20 bg-neutral-900 w-full p-8 flex flex-col items-center lg:hidden">
            {currentUser ? (
              <div className="flex flex-col items-center space-y-6">
                <Link 
                  to="/learn" 
                  className="text-lg hover:text-orange-500 transition-colors"
                  onClick={toggleNavbar}
                >
                  Learn
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center text-lg hover:text-orange-500 transition-colors"
                  onClick={toggleNavbar}
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Hi, {getUserFirstName()}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <Link
                  to="/login"
                  className="py-2 px-3 border rounded-md hover:bg-neutral-800 transition-colors"
                  onClick={toggleNavbar}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 hover:from-orange-600 hover:to-orange-900 transition-all"
                  onClick={toggleNavbar}
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
