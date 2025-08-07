import Header from "@/components/shared/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex-center size-full'>
      <Header />
      {children}
    </main>
  );
};
export default Layout;