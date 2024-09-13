import Header from "./components/Header";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex flex-row min-h-screen  ">
      <Sidebar />
      <div className="flex flex-col w-full bg-indigo-100">
        {/* Header */}
        <Header />

        {/* Main Content Area */}

        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
