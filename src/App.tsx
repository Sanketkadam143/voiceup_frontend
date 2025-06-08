import React, { useState } from 'react';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './views/Dashboard';
import { Conversations } from './views/Conversations';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'conversations':
        return <Conversations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            {renderView()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;