"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

export interface FileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  onFiles?: (files: File[]) => void;
  multiple?: boolean;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      label = "Upload file",
      description = "Drag & drop or click to select",
      onFiles,
      multiple = false,
      ...props
    },
    ref,
  ) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;
      const arr = Array.from(fileList);
      setFiles(arr);
      onFiles?.(arr);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    };

    return (
      <label
        className={cn(
          "group relative flex min-h-[9rem] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/70 px-6 py-8 outline-none transition-all duration-200",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/10 before:to-transparent",
          dragActive && "border-blue-500 bg-blue-950/30",
          "focus-within:border-blue-500 focus-within:shadow-lg hover:border-blue-400 hover:bg-neutral-800/80 hover:shadow-xl",
          className,
        )}
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        htmlFor="file-upload-input"
      >
        <input
          ref={(el) => {
            // @ts-ignore
            ref && (typeof ref === "function" ? ref(el) : (ref.current = el));
            inputRef.current = el;
          }}
          id="file-upload-input"
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleChange}
          {...props}
        />
        <div className="z-10 flex flex-col items-center">
          <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-900/30">
            <Upload className="h-6 w-6 text-blue-400" />
          </span>
          <span className="mb-1 text-base font-semibold text-white">
            {label}
          </span>
          <span className="mb-2 text-sm text-neutral-400">{description}</span>
        </div>
        {files.length > 0 && (
          <div className="z-10 mx-auto mt-4 w-full max-w-xs">
            {files.map((file, idx) => (
              <div
                key={file.name + idx}
                className="mb-2 flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-800/80 px-3 py-2"
              >
                <span className="max-w-[10rem] truncate text-sm text-white">
                  {file.name}
                </span>
                <span className="ml-2 text-xs text-neutral-400">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        )}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-xl border-2 border-dashed border-blue-400 opacity-0 transition-opacity duration-200",
            dragActive && "opacity-100",
          )}
        />
      </label>
    );
  },
);
FileUpload.displayName = "FileUpload";
