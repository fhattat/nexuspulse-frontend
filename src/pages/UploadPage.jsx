import FileUploader from '../components/upload/FileUploader';
import { Database, ArrowRight } from 'lucide-react';

export default function UploadPage({ onUploadSuccess }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8">
      {/* Title section */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
          <Database size={22} className="text-brand-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Upload your dataset</h2>
        <p className="text-sm text-brand-200/40 max-w-md">
          Upload a CSV, PDF, or Excel file to start analyzing your e-commerce data with AI.
        </p>
      </div>

      {/* Uploader */}
      <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <FileUploader onUploadSuccess={onUploadSuccess} />
      </div>

      {/* How it works */}
      <div className="mt-14 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <p className="text-xs text-brand-200/30 uppercase tracking-widest text-center mb-5">How it works</p>
        <div className="flex items-center gap-4">
          {[
            { step: '01', label: 'Upload data' },
            { step: '02', label: 'Ask questions' },
            { step: '03', label: 'Get insights' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono text-accent-500">{item.step}</span>
                <span className="text-sm text-brand-200/50">{item.label}</span>
              </div>
              {i < 2 && <ArrowRight size={14} className="text-brand-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
