import { useDropzone, type FileRejection } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Upload, X } from "lucide-react";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

type DropImageProps = {
   files: FileWithPreview[];
   setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
   maxFiles?: number;
   customTailwind?: string;
};

export const DropImage = ({
   files,
   setFiles,
   maxFiles,
   customTailwind,
}: DropImageProps) => {
   const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
         if (acceptedFiles && acceptedFiles.length > 0) {
            // Check if adding new files would exceed the maximum
            const currentFileCount = files.length;
            const totalAfterAdd = currentFileCount + acceptedFiles.length;

            if (maxFiles && totalAfterAdd > maxFiles) {
               toast.error(
                  `Máximo permitido: ${maxFiles} ${maxFiles === 1 ? "imagen" : "imágenes"}`,
               );
               return;
            }

            const newFiles = acceptedFiles.map(
               (file) =>
                  Object.assign(file, {
                     preview: URL.createObjectURL(file),
                     id: uuid(),
                  }) as FileWithPreview,
            );

            setFiles((prevFiles) => {
               const updatedFiles = [...prevFiles, ...newFiles];
               return updatedFiles;
            });
         }

         if (rejectedFiles.length > 0) {
            const errorCode = rejectedFiles[0].errors[0].code;

            if (errorCode === "too-many-files") {
               toast.error(
                  `Máximo permitido: ${maxFiles} ${maxFiles === 1 ? "imagen" : "imágenes"}`,
               );
            } else if (errorCode === "file-too-large") {
               toast.error("Tamaño limite es 20 MB");
            } else {
               toast.error("Error al subir imagen");
            }
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [files, maxFiles],
   );

   const isDisabled = maxFiles ? files.length >= maxFiles : false;

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles: maxFiles,
      maxSize: 20 * 1024 * 1024, // 20 MB
      accept: {
         "image/png": [".png"],
         "image/jpeg": [".jpg", ".jpeg"],
      },
      disabled: isDisabled,
   });

   const removeFile = (fileId: string) => {
      setFiles((files) => files.filter((file) => file.id !== fileId));
   };

   useEffect(() => {
      return () => {
         files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
   }, [files]);

   return (
      <div className={`space-y-4 ${customTailwind}`}>
         <div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 text-center ${customTailwind} ${
               isDisabled
                  ? "cursor-not-allowed border-gray-200 dark:border-gray-200/50 bg-gray-50 dark:bg-gray-50/20"
                  : `cursor-pointer ${
                       isDragActive
                          ? "border-blue-400 bg-blue-50/50"
                          : "border-gray-300 hover:border-blue-400"
                    }`
            }`}
         >
            <input {...getInputProps()} />
            <Upload
               className={`w-8 h-8 mx-auto mb-2 ${
                  isDisabled ? "text-gray-300" : "text-gray-400"
               }`}
            />
            <p
               className={`text-sm ${
                  isDisabled ? "text-gray-400" : "text-muted-foreground"
               }`}
            >
               {isDisabled
                  ? `Máximo de ${maxFiles} ${maxFiles === 1 ? "imagen" : "imágenes"}`
                  : isDragActive
                    ? "Suelta las imágenes aquí"
                    : "Arrastra imágenes o haz clic"}
            </p>
            {!isDisabled && (
               <p className="text-xs text-gray-500 mt-1">JPG, PNG (máx. 20MB)</p>
            )}
         </div>

         {files.length > 0 && (
            <div className="space-y-4 pt-1">
               {files.length > 0 && (
                  <>
                     <p className="text-sm -mt-1 flex gap-2">
                        <span className="font-semibold">Nueva imagen:</span>
                        <span className="text-muted-foreground">
                           (max {maxFiles || "∞"})
                        </span>
                     </p>

                     <div className="flex flex-row gap-3 flex-wrap justify-center bg-accent p-5">
                        {files.map((file) => (
                           <div key={file.id} className="h-30 w-30 relative group">
                              <img
                                 src={file.preview}
                                 alt={file.name}
                                 className="h-full w-full object-cover border-2 border-dashed border-green-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => removeFile(file.id)}
                                 className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-red-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                              >
                                 <X size={18} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </>
               )}
            </div>
         )}
      </div>
   );
};
