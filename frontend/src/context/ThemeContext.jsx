import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check time and set theme
    const checkTimeAndSetTheme = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Dark mode from 6 PM (18:00) to 6 AM (06:00)
      const isNightTime = currentHour >= 18 || currentHour <= 6;

      setIsDarkMode(isNightTime);

      if (isNightTime) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Check immediately on mount
    checkTimeAndSetTheme();

    // Set up an interval to check every minute (in case time crosses the threshold while app is open)
    const interval = setInterval(checkTimeAndSetTheme, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
