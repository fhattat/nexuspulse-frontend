import ChatPanel from '../components/chat/ChatPanel';

export default function DashboardPage({ sessionId }) {
  return (
    <div className="h-full">
      <ChatPanel sessionId={sessionId} />
    </div>
  );
}
