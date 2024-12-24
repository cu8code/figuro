"use client";

import { Home, Search, FileText, Settings, CreditCard, HelpCircle, Menu, X, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-black text-white rounded-full"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 text-xl font-bold tracking-wide">Figuro</div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-4 px-4">
              {/* Dashboard */}
              <li>
                <Link href="/dashboard">
                  <div className="flex items-center p-3 hover:bg-pink-600 rounded-lg transition duration-200">
                    <Home className="mr-4 h-5 w-5 text-white" />
                    <span className="text-base font-medium">Dashboard</span>
                  </div>
                </Link>
              </li>

              {/* Scan New Content */}
              <li>
                <Link href="/dashboard/scan-new-content">
                  <div className="flex items-center p-3 hover:bg-[#e90074] rounded-lg transition duration-200">
                    <Search className="mr-4 h-5 w-5 text-white" />
                    <span className="text-base font-medium">Scan New Content</span>
                  </div>
                </Link>
              </li>

              {/* My Cases */}
              <li>
                <Link href="/dashboard/my-cases">
                  <div className="flex items-center p-3 hover:bg-[#e90074] rounded-lg transition duration-200">
                    <FileText className="mr-4 h-5 w-5 text-white" />
                    <span className="text-base font-medium">My Cases</span>
                  </div>
                </Link>
              </li>

              {/* Billing */}
              <li>
                <Link href="/dashboard/billing">
                  <div className="flex items-center p-3 hover:bg-[#e90074] rounded-lg transition duration-200">
                    <CreditCard className="mr-4 h-5 w-5 text-white" />
                    <span className="text-base font-medium">Billing</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="space-y-4 px-4 pb-6">
            {/* Settings */}
            <li>
              <Link href="/dashboard/settings">
                <div className="flex items-center p-3 hover:bg-[#e90074] rounded-lg transition duration-200">
                  <Settings className="mr-4 h-5 w-5 text-white" />
                  <span className="text-base font-medium">Settings</span>
                </div>
              </Link>
            </li>

            {/* Support */}
            <li>
              <Link href="/dashboard/support">
                <div className="flex items-center p-3 hover:bg-[#e90074] rounded-lg transition duration-200">
                  <HelpCircle className="mr-4 h-5 w-5 text-white" />
                  <span className="text-base font-medium">Support</span>
                </div>
              </Link>
            </li>

            {/* Profile Section */}
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <User className="h-10 w-10 text-white rounded-full bg-gray-700 p-2" />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
