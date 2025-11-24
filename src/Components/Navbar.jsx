

const Navbar = ({ active, setActive }) => {
  return (
    <nav className="p-1">
      <div className="w-full flex gap-2 bg-[#06080a05] rounded-md p-1">
        <div
          onClick={() => setActive("projects")}
          className={`w-1/3 p-1 text-center cursor-pointer font-bold rounded transition-all duration-500 ${
            active === "projects" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-200 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          Projects
        </div>
        <div
          onClick={() => setActive("about")}
          className={`w-1/3 p-1 text-center cursor-pointer font-bold rounded transition-all duration-500 ${
            active === "about" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-200 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          About
        </div>
        <div
          onClick={() => setActive("blog")}
          className={`w-1/3 p-1 text-center cursor-pointer font-bold rounded transition-all duration-500 ${
            active === "blog" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-200 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          Blogs
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
