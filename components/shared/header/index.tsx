
import Logo from "./logo";
import Menu from "./menu";
import clsx from "clsx";
import { HomePageConfig } from "@/types";

interface HeaderProps {
  className?: string;
  config?: HomePageConfig | null;
}

function Header({ className, config }: HeaderProps) {
  return (
    <header className={clsx('w-full h-14 flex-between px-12 border-b border-white/10 bg-black/20 backdrop-blur-sm header-box', className)}>
        <Logo config={config} />
        <Menu />
    </header>
  );
}

export default Header;
