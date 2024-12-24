import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh)] bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}
