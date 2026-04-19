import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, FileText, Check, Loader2, AlertCircle } from 'lucide-react';
import { uploadFile } from '../../services/api';

export default function FileUploader({ onUploadSuccess }) {
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [error, setError] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setStatus('uploading');
    setError('');

    try {
      const data = await uploadFile(file);
      setFileInfo(data.file_info);
      setStatus('success');
      setTimeout(() => onUploadSuccess(data), 800);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Upload failed';
      setError(msg);
      setStatus('error');
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
    disabled: status === 'uploading',
  });

  const fileIcon = fileInfo?.file_type === 'csv' ? FileSpreadsheet : FileText;
  const FileIcon = fileIcon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Upload zone */}
      <div
        {...getRootProps()}
        className={`
          relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-300 group
          ${isDragActive
            ? 'border-brand-400 bg-brand-400/5 scale-[1.01]'
            : status === 'error'
              ? 'border-accent-500/50 bg-accent-500/5'
              : status === 'success'
                ? 'border-success-500/50 bg-success-500/5'
                : 'border-brand-600/40 bg-brand-800/30 hover:border-brand-400/50 hover:bg-brand-700/20'
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Icon */}
        <div className={`
          w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-all duration-300
          ${status === 'uploading'
            ? 'bg-brand-400/10'
            : status === 'success'
              ? 'bg-success-500/10'
              : status === 'error'
                ? 'bg-accent-500/10'
                : 'bg-brand-700/40 group-hover:bg-brand-600/40'
          }
        `}>
          {status === 'uploading' ? (
            <Loader2 size={28} className="text-brand-400 animate-spin" />
          ) : status === 'success' ? (
            <Check size={28} className="text-success-500" />
          ) : status === 'error' ? (
            <AlertCircle size={28} className="text-accent-500" />
          ) : (
            <Upload size={28} className="text-brand-300 group-hover:text-brand-200 transition-colors" />
          )}
        </div>

        {/* Text */}
        {status === 'idle' && (
          <>
            <p className="text-base font-medium text-white mb-2">
              {isDragActive ? 'Drop your file here' : 'Drop your dataset here'}
            </p>
            <p className="text-sm text-brand-200/50">
              CSV, PDF, or XLSX · Max 50MB
            </p>
          </>
        )}

        {status === 'uploading' && (
          <p className="text-base font-medium text-brand-300">Processing your file...</p>
        )}

        {status === 'success' && fileInfo && (
          <div>
            <p className="text-base font-medium text-success-400 mb-3">Upload successful</p>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-brand-800/60 border border-brand-600/30">
              <FileIcon size={20} className="text-brand-300" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{fileInfo.filename}</p>
                <p className="text-xs text-brand-200/50 font-mono">
                  {fileInfo.row_count} rows · {fileInfo.columns?.length} columns
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <p className="text-base font-medium text-accent-400 mb-1">Upload failed</p>
            <p className="text-sm text-accent-300/70">{error}</p>
            <p className="text-xs text-brand-200/40 mt-3">Click or drop to try again</p>
          </div>
        )}
      </div>

      {/* File type badges */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {['CSV', 'PDF', 'XLSX'].map((type) => (
          <span key={type} className="px-3 py-1 rounded-full text-xs font-mono text-brand-200/40 bg-brand-800/40 border border-brand-700/30">
            .{type.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
