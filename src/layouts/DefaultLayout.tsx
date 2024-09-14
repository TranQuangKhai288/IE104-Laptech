import Header from "./components/Header";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex flex-row min-h-screen ">
      <div className="sticky top-0 left-0 h-screen z-[999]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full bg-gray-200">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Main Content Area */}

        <main className="flex-grow sm:px-8 md:mx-2 my-2 bg-white py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
