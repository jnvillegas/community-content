// import { Route, Routes } from "react-router-dom"
// import { useState, useEffect } from "react"
// import PATHROUTES from "./helpers/PathRoutes"
// import Home from "./views/Home/Home"
// import Navbar from "./components/Navbar/Navbar"
// import About from "./views/About/About"
// import Wallpaper from "./views/Wallpaper/Wallpaper"
// import Blog from "./views/Blog/Blog"
// import Theme from "./components/Theme/Theme"
// import Login from "./views/Login/Login"
// import BlogDetail from "./views/BlogDetail/BlogDetail"

// function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved !== null ? saved === "true" : false;
//   });

//   useEffect(() => {
//     document.documentElement.setAttribute(
//       "data-theme",
//       darkMode ? "dark" : "light"
//     );
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   const toggleTheme = () => setDarkMode((prev) => !prev);

//   return (
//     <>
//       <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
//       <Theme toggleTheme={toggleTheme} darkMode={darkMode} />
//       <Routes>
//         <Route path={PATHROUTES.HOME} element={<Home />} />
//         <Route path={PATHROUTES.ABOUT} element={<About />} />
//         <Route path={PATHROUTES.BLOG} element={<Blog />} />
//         <Route path={PATHROUTES.WALLPAPER} element={<Wallpaper />} />
//         {/* <Route path={PATHROUTES.LOGIN} element={<Login />} /> */}
//         <Route path={PATHROUTES.BLOG_DETAIL} element={<BlogDetail />} />
//       </Routes>
//     </>
//   )
// }

// export default App
