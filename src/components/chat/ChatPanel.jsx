import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { sendQuery } from '../../services/api';
import ChartContainer from '../dashboard/ChartContainer';
import KPICard from '../dashboard/KPICard';

const SUGGESTED_QUERIES = [
  'Generate an executive summary for this dataset',
  'Which product category has the most cancellations?',
  'Show products with stock level below 10',
  'Show revenue distribution by region',
  'What is the sales forecast for next month?',
  'What does the return policy say?',
];

export default function ChatPanel({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (query) => {
    const q = query || input.trim();
    if (!q || loading) return;

    const userMsg = { role: 'user', content: q, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendQuery(q, sessionId);
      const aiMsg = {
        role: 'assistant',
        content: data.text,
        charts: data.charts || [],
        kpis: data.kpis || [],
        queryType: data.query_type,
        processingTime: data.processing_time,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: `Error: ${err.response?.data?.detail || err.message}`,
        isError: true,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <EmptyState onSelect={handleSend} />
        ) : (
          messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))
        )}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-brand-400" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-800/50 border border-brand-700/30">
              <Loader2 size={16} className="text-brand-400 animate-spin" />
              <span className="text-sm text-brand-200/50">Analyzing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0d1526' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '896px', margin: '0 auto' }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your data..."
              disabled={loading}
              style={{
                width: '100%', padding: '16px 52px 16px 18px', borderRadius: '12px',
                backgroundColor: '#0a0f1e', border: '1px solid rgba(255,255,255,0.12)',
                color: 'white', fontSize: '14px', outline: 'none', transition: 'all 0.2s',
              }}
              className=""
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg
                text-brand-200/40 hover:text-brand-300 hover:bg-brand-700/50
                disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ─────────────────────────────────────────
function EmptyState({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5">
        <Sparkles size={24} className="text-brand-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Ask NexusPulse AI</h3>
      <p className="text-sm text-brand-200/40 mb-8 max-w-md text-center">
        Ask questions about your data in natural language. Get instant analysis with visualizations.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl w-full">
        {SUGGESTED_QUERIES.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-left px-4 py-3 rounded-xl bg-brand-800/40 border border-brand-700/30
              text-sm text-brand-200/60 hover:text-white hover:bg-brand-700/40 hover:border-brand-500/30
              transition-all duration-200"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Message Bubble ──────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 animate-fade-in-up ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <Bot size={16} className="text-brand-400" />
        </div>
      )}

      <div className={`max-w-3xl space-y-4 ${isUser ? 'items-end' : ''}`}>
        {/* Text */}
        <div className={`
          px-4 py-3 rounded-xl text-sm leading-relaxed
          ${isUser
            ? 'bg-brand-500/20 text-brand-100 border border-brand-400/20 ml-auto'
            : message.isError
              ? 'bg-accent-500/10 text-accent-300 border border-accent-500/20'
              : 'bg-brand-800/50 text-brand-100/90 border border-brand-700/30'
          }
        `}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.processingTime && (
            <p className="text-xs text-brand-200/30 mt-2 font-mono">
              {message.queryType} · {message.processingTime}s
            </p>
          )}
        </div>

        {/* KPIs */}
        {message.kpis?.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {message.kpis.map((kpi, i) => (
              <KPICard key={i} {...kpi} index={i} />
            ))}
          </div>
        )}

        {/* Charts */}
        {message.charts?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {message.charts.map((chart, i) => (
              <ChartContainer
                key={i}
                chartData={chart.plotly_json}
                title={chart.title}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center shrink-0 mt-0.5">
          <User size={14} className="text-white" />
        </div>
      )}
    </div>
  );
}
