import { useState, useEffect } from "react";

let routerContext = {
  currentPage: "home",
  navigate: () => {},
  params: {}
};

const listeners = new Set();

export function navigate(page, params = {}) {
  routerContext.currentPage = page;
  routerContext.params = params;

  // Update URL hash for basic navigation
  window.location.hash = page === "home" ? "" : `#${page}`;

  // Notify all listeners
  listeners.forEach(listener => listener());
}

export function useRouter() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);

    // Handle browser back/forward
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== routerContext.currentPage) {
        routerContext.currentPage = hash || "home";
        forceUpdate({});
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Set initial page from hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      routerContext.currentPage = initialHash;
    }

    return () => {
      listeners.delete(listener);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return {
    currentPage: routerContext.currentPage,
    navigate,
    params: routerContext.params
  };
}
