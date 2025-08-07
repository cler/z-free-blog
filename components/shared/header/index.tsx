
import Logo from "./logo";
import Menu from "./menu";
import clsx from "clsx";

function Header({className}: {className?: string}) {
  return (
    <header className={clsx('w-full h-14 flex-between px-12 border-b border-b-gray-200 bg-white fixed top-0 z-50 header-box', className)}>
        <Logo />
        <Menu />
    </header>
  );
}

export default Header;
