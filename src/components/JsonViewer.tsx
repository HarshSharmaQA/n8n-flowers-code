import React, { useState } from 'react';
import { Copy, Check, Download, X } from 'lucide-react';

interface JsonViewerProps {
  jsonData: any;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  jsonData,
  title,
  isOpen,
  onClose,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(jsonData, null, 2);
  const filteredJson = searchTerm 
    ? jsonString.split('\n').filter(line => 
        line.toLowerCase().includes(searchTerm.toLowerCase())
      ).join('\n')
    : jsonString;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search in JSON..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Content */}
        <div className="flex-1 overflow-hidden">
          <pre className="h-full overflow-auto p-4 text-sm font-mono bg-gray-900 text-green-400 leading-relaxed">
            <code>{filteredJson}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-sm text-gray-600 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span>Lines: {jsonString.split('\n').length}</span>
            <span>Size: {new Blob([jsonString]).size} bytes</span>
          </div>
        </div>
      </div>
    </div>
  );
};