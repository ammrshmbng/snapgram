import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <section className="topbar">
      <div className="px-5 py-4 flex-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
      </div>
    </section>
  );
};

export default TopBar;
