
import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is CSV
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size should not exceed 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
  };

  const uploadFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      // Reset success state after a delay
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const resetFile = () => {
    setFile(null);
  };

  return (
    <div className="cricket-card">
      <h2 className="text-xl font-semibold mb-4">Upload Cricket Data</h2>
      <p className="text-muted-foreground mb-6">
        Upload CSV files containing match data, player statistics, and venue information.
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-cricket-light-green bg-cricket-bg' 
            : 'border-gray-300 hover:border-cricket-green'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-cricket-green mb-4" />
            <p className="font-medium mb-2">Drag and drop your CSV file here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <label className="cricket-btn cursor-pointer">
              Browse Files
              <input 
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileSelect}
              />
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: .CSV (max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              {uploadSuccess ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <div className="bg-cricket-green/10 rounded-md p-2">
                  <svg className="h-6 w-6 text-cricket-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                    <line x1="10" y1="9" x2="14" y2="9" />
                  </svg>
                </div>
              )}
              <div className="text-left">
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                className="cricket-btn-secondary flex items-center text-sm"
                onClick={uploadFile}
                disabled={isUploading || uploadSuccess}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cricket-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : uploadSuccess ? (
                  'Uploaded'
                ) : (
                  'Upload File'
                )}
              </button>
              <button
                className="cricket-btn-outline flex items-center text-sm"
                onClick={resetFile}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
