import Header from "./components/Header";
import { ReactNode } from "react";

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default HeaderLayout;
