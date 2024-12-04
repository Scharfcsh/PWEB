

const Navbar = ({ active, setActive }) => {
  return (
    <nav className="p-4">
      <div className="w-full flex gap-4 bg-[#18212b] rounded-md p-2">
        <div
          onClick={() => setActive("projects")}
          className={`w-1/3 p-2 text-center cursor-pointer font-bold rounded-lg transition-all duration-500 ${
            active === "projects" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-500 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          Projects
        </div>
        <div
          onClick={() => setActive("about")}
          className={`w-1/3 p-2 text-center cursor-pointer font-bold rounded-lg transition-all duration-500 ${
            active === "about" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-500 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          About
        </div>
        <div
          onClick={() => setActive("blog")}
          className={`w-1/3 p-2 text-center cursor-pointer font-bold rounded-lg transition-all duration-500 ${
            active === "blog" ? "text-white font-bold bg-[#27ceb5] " : "text-gray-500 hover:text-gray-300 hover:bg-[#14393A]"
          }`}
        >
          Blogs
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
