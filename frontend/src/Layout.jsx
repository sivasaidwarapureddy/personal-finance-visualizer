import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-4 px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
              alt="Logo" 
              className="w-14 h-14 rounded-full shadow-md border-2 border-white" 
            />
            <h1 className="text-2xl font-semibold tracking-wide">Finance Tracker</h1>
          </div>

          {/* (Optional) Future Navigation */}
          <nav className="hidden md:flex space-x-6">
           <h2>Hai hello USER !!</h2>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Finance Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
