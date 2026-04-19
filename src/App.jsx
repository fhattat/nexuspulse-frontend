import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';

const VIEW_CONFIG = {
  upload:    { title: 'Upload Data',  subtitle: 'Import your dataset to begin analysis' },
  dashboard: { title: 'Dashboard',    subtitle: 'Interactive analytics & visualization' },
  chat:      { title: 'AI Chat',      subtitle: 'Ask questions in natural language' },
};

export default function App() {
  const [activeView, setActiveView] = useState('upload');
  const [session, setSession] = useState(null);
  const [chatKey, setChatKey] = useState(0);

  const handleUploadSuccess = (data) => {
    setSession({
      sessionId: data.session_id,
      filename: data.file_info.filename,
      fileType: data.file_info.file_type,
      rowCount: data.file_info.row_count,
      columns: data.file_info.columns,
      row_count: data.file_info.row_count,
    });
    setChatKey(k => k + 1);
    setActiveView('chat');
  };

  const handleNewChat = () => {
    setChatKey(k => k + 1);
  };

  const cfg = VIEW_CONFIG[activeView] || VIEW_CONFIG.upload;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        session={session}
        onNewChat={handleNewChat}
      />
      <main style={{ marginLeft: '256px', flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header title={cfg.title} subtitle={cfg.subtitle} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeView === 'upload' && (
            <UploadPage onUploadSuccess={handleUploadSuccess} />
          )}
          {(activeView === 'dashboard' || activeView === 'chat') && session && (
            <DashboardPage key={chatKey} sessionId={session.sessionId} />
          )}
        </div>
      </main>
    </div>
  );
}
