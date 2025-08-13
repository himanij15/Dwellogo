import { Search, Menu, User, Heart, MessageSquare, Settings } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState } from "react";

import { useRouter } from "./Router";
import { AuthModal } from "./AuthModal";  
 

export function Header() {
  const { currentPage, navigate } = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "listings", label: "Properties" },
    { id: "user-dashboard", label: "Dashboard" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-warm-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="text-xl font-semibold text-warm-gray-900">Dwellogo</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`transition-colors ${
                  currentPage === id
                    ? "text-teal-600 font-medium"
                    : "text-warm-gray-600 hover:text-teal-600"
                }`}
              >
                {label}
              </button>
             ))}
          </nav>

         
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="button"
              className="hidden sm:flex"
              onClick={() => navigate("user-dashboard")}
              aria-label="Favorites"
            > 
               <Heart className="h-5 w-5" />
             </Button>
              <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => navigate("Messages")}
              aria-label="Messages" >
                <MessageSquare className="h-5 w-5" />
                </Button> 
          
           <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => navigate("Messages")}
              aria-label="Messages" >
                Login
                </Button> 
          
          
        {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("user-dashboard")}
              aria-label="User Profile"
            >
              <User className="h-5 w-5" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
        
          </div>
        </div>
      </div>

    </header>
  );
}
