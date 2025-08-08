import Header from "@/components/shared/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='size-full'>
      <Header className="relative z-20" />
      {children}
    </main>
  );
};
export default Layout;