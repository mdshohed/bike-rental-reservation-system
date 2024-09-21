// import React, { useState, useEffect } from 'react';

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(localStorage.getItem('hs_theme') || 'light');

//   // Sync with localStorage and apply theme
//   useEffect(() => {
//     const html = document.querySelector('html');

//     if (theme === 'light') {
//       html && html.classList.remove('dark');
//       html && html.classList.add('light');
//     } else if (theme === 'dark') {
//       html && html.classList.remove('light');
//       html && html.classList.add('dark');
//     }

//     localStorage.setItem('hs_theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <div>
//       {/* Light mode button */}
//       <button
//         type="button"
//         className={`${
//           theme === 'dark' ? 'hidden' : 'block'
//         } hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800`}
//         onClick={() => setTheme('dark')}
//       >
//         <span className="group inline-flex shrink-0 justify-center items-center size-9">
//           <svg
//             className="shrink-0 size-4"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
//           </svg>
//         </span>
//       </button>

//       {/* Dark mode button */}
//       <button
//         type="button"
//         className={`${
//           theme === 'light' ? 'hidden' : 'block'
//         } hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800`}
//         onClick={() => setTheme('light')}
//       >
//         <span className="group inline-flex shrink-0 justify-center items-center size-9">
//           <svg
//             className="shrink-0 size-4"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="4" />
//             <path d="M12 2v2" />
//             <path d="M12 20v2" />
//             <path d="m4.93 4.93 1.41 1.41" />
//             <path d="m17.66 17.66 1.41 1.41" />
//             <path d="M2 12h2" />
//             <path d="M20 12h2" />
//             <path d="m6.34 17.66-1.41 1.41" />
//             <path d="m19.07 4.93-1.41 1.41" />
//           </svg>
//         </span>
//       </button>
//     </div>
//   );
// };

// export default ThemeToggle;

import { useState, useEffect } from "react";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200  hover:bg-gray-300 "
    >
      {theme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
    // <div>
    //   <button
    //     type="button"
    //     className="hs-dark-mode hs-dark-mode-active:hidden inline-flex items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-none focus:bg-white/20"
    //     data-hs-theme-click-value="dark"
    //   >
    //     <svg
    //       className="shrink-0 size-4"
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       stroke-width="2"
    //       stroke-linecap="round"
    //       stroke-linejoin="round"
    //     >
    //       <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    //     </svg>
    //     Dark
    //   </button>
    //   <button
    //     type="button"
    //     className="hs-dark-mode hs-dark-mode-active:inline-flex hidden items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-none focus:bg-white/20"
    //     data-hs-theme-click-value="light"
    //   >
    //     <svg
    //       className="shrink-0 size-4"
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       stroke-width="2"
    //       stroke-linecap="round"
    //       stroke-linejoin="round"
    //     >
    //       <circle cx="12" cy="12" r="4"></circle>
    //       <path d="M12 2v2"></path>
    //       <path d="M12 20v2"></path>
    //       <path d="m4.93 4.93 1.41 1.41"></path>
    //       <path d="m17.66 17.66 1.41 1.41"></path>
    //       <path d="M2 12h2"></path>
    //       <path d="M20 12h2"></path>
    //       <path d="m6.34 17.66-1.41 1.41"></path>
    //       <path d="m19.07 4.93-1.41 1.41"></path>
    //     </svg>
    //     Light
    //   </button>
    // </div>
  );
};

export default ThemeToggleButton;
