import { Link } from "@tanstack/react-router";

const AppLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-2">
        <img
          src="/logos/tree-logo-main.png"
          alt="FamBoard Logo"
          className="w-12 h-12 rounded-full"
        />
        <p className="text-xl font-semibold">Famboard</p>
      </div>
    </Link>
  );
};

export { AppLogo };
