
import Logo from "./logo";
import Menu from "./menu";

function Header() {

 

  return (
    <header className="w-full  h-14 flex-between px-12 border-b border-b-gray-200 bg-white fixed top-0 z-50 header-box">
        <Logo />
        <Menu />
    </header>
  );
}

export default Header;
