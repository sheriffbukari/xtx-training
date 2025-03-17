import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { ChevronDown } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(prev => ({ ...prev, email: true }));
    
    try {
      await signup(formData.email, formData.password, formData.name);
      toast.success("Account created successfully!");
      navigate("/profile");
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Email is already in use. Please use a different email or try logging in.");
        toast.error("Email is already in use");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Please use a stronger password.");
        toast.error("Password is too weak");
      } else {
        setError("Failed to create an account. Please try again.");
        toast.error("Failed to create account");
      }
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(prev => ({ ...prev, google: true }));
      await signInWithGoogle();
      toast.success("Successfully signed in with Google!");
      navigate("/profile");
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Join{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              XTX Train
            </span>
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading.google}
            className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#ffffff"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#ffffff"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#ffffff"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#ffffff"
              />
            </svg>
            {loading.google ? "Signing in..." : "Sign up with Google"}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-900 text-neutral-500">Or</span>
          </div>
        </div>

        {/* Email Sign Up Toggle */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowEmailForm(!showEmailForm)}
            className="flex w-full justify-between items-center py-2 px-4 border border-neutral-700 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <span>Sign up with email</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${showEmailForm ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Email Password Form */}
        {showEmailForm && (
          <form className="mt-4 space-y-6" onSubmit={handleEmailSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading.email}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-orange-800 hover:from-orange-600 hover:to-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading.email ? "Creating account..." : "Create account with email"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup; 