import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AIChat } from '../ai/AIChat';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="md:pl-64">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          onAiChatToggle={() => setAiChatOpen(!aiChatOpen)}
          aiChatOpen={aiChatOpen}
        />

        {/* Page content */}
        <main className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* AI Chat Overlay */}
      <AIChat isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </div>
  );
} 