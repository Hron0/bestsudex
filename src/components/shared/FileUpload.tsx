"use client"

import type React from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X } from "lucide-react"

interface FileUploadProps {
    files: File[]
    setFiles: any
    single?: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, single }) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (single) {
                setFiles([acceptedFiles[0]])
            } else {
                setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles])
            }
        },
        [setFiles, single],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (fileToRemove: File) => {
        setFiles((prevFiles: any) => prevFiles.filter((file: any) => file !== fileToRemove))
    }

    return (
        <div>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                    isDragActive ? "border-primary" : "border-gray-300"
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>{single ? "Перетащите файл сюда ..." : "Перетащите файлы сюда ..."}</p>
                ) : (
                    <p>
                        {single ? "Перетащите файл сюда или кликните для выбора" : "Перетащите файлы сюда или кликните для выбора"}
                    </p>
                )}
            </div>
            {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {(single ? files.slice(0, 1) : files).map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <span className="truncate max-w-[200px]">{file.name}</span>
                            <button onClick={() => removeFile(file)} className="text-red-500 hover:text-red-700">
                                <X size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

