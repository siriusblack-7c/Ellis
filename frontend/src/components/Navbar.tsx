
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { t } = useLanguage();
  const { isAuthenticated, user, loading, getProfile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Mock user state - REMOVED

  const navLinks = [
    { name: "Home", path: "/#home" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "FAQs", path: "/#faq" },
    { name: "Services", path: "/#services" },
    // { name: "Gallery", path: "/gallery" },
    { name: "Caregivers", path: "/caregivers" },
    { name: "Careers", path: "/careers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: user?.role === "admin" ? "/admin" : user?.role === "caregiver" ? "/caregiver-dashboard" : "/client-dashboard" },
    // { name: "Caregivers Dashboard", path: "/caregiver-dashboard" },
    // { name: "Clients Dashboard", path: "/client-dashboard" },
    // { name: "Admin Dashboard", path: "/admin" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile();

      } catch (error) {

      }
    };
    fetchProfile();
  }, []);

  const handleScrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    const [basePath, hash] = path.split("#");

    if (location.pathname === basePath && hash) {
      handleScrollTo(`#${hash}`);
    } else if (basePath === "/" && hash) {
      navigate(basePath);
      setTimeout(() => handleScrollTo(`#${hash}`), 100);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHomePage
          ? "bg-white/80 dark:bg-card/80 backdrop-blur-lg py-3 shadow-md"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleNavClick(link.path)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  !scrolled && isHomePage
                    ? "text-white"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          {!loading && (
            <>
              {isAuthenticated && user ? (
                <UserDropdown />
              ) : (
                <>
                  <Button asChild className="btn-primary">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  {/* <Button asChild className="btn-primary">
                    <Link to="/auth?mode=signup">Register</Link>
                  </Button> */}
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-3/4 max-w-sm bg-card shadow-xl p-6 transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.path)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {!loading && (
              <>
                {isAuthenticated && user ? (
                  <div className="mt-6">
                    <UserDropdown />
                  </div>
                ) : (
                  <>
                    <Button asChild className="w-full btn-primary mt-6">
                      <Link to="/auth?mode=signin" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full btn-primary mt-6">
                      <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
