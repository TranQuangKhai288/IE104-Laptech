// FooterLayout.tsx
import React, { ReactNode } from "react";
import Footer from "./components/Footer";

interface FooterLayoutProps {
    children: ReactNode;
}

const FooterLayout: React.FC<FooterLayoutProps> = ({ children }) => {
    return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

      {/* Footer */}
        <Footer />
    </div>
    );
};

export default FooterLayout;
