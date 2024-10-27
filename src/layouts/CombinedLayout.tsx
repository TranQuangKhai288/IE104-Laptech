// CombinedLayout.tsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface CombinedLayoutProps {
    children: React.ReactNode;
}

const CombinedLayout: React.FC<CombinedLayoutProps> = ({ children }) => {
    return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
        <Footer />
    </div>
    );
};

export default CombinedLayout;
