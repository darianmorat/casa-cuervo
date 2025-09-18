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
};

export const DropImage = ({ files, setFiles }: DropImageProps) => {
   const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
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
            toast.error("Límite de 10 imagenes");
         } else if (errorCode === "file-too-large") {
            toast.error("Tamaño limite es 20 MB");
         } else {
            toast.error("Error al subir imagen");
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles: 10,
      maxSize: 20 * 1024 * 1024, // 20 MB // USE THE LIMIT SIZE FROM YOUR CLOUD PROVIDER
      accept: {
         "image/png": [".png"],
         "image/jpeg": [".jpg", ".jpeg"],
      },
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
      <div className="space-y-4">
         <div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 text-center transition-all cursor-pointer ${
               isDragActive
                  ? "border-blue-400 bg-blue-50/50"
                  : "border-gray-300 hover:border-blue-400"
            }`}
         >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
               {isDragActive
                  ? "Suelta las imágenes aquí"
                  : "Arrastra imágenes o haz clic"}
            </p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG (máx. 20MB)</p>
         </div>

         {files.length > 0 && (
            <div className="bg-accent p-4 space-y-4">
               {files.length > 0 && (
                  <p className="text-sm text-green-600 font-semibold text-center -mt-1">
                     Nueva imagen seleccionada:
                  </p>
               )}

               {files.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
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
               )}
            </div>
         )}
      </div>
   );
};
