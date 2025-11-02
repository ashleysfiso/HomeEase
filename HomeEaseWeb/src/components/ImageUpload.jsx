import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { GetPresignedURL, UpdateLogo, UpdateServiceImgURl } from "@/api";

export default function ImageUpload({
  onUploadComplete,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  type,
  id,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!acceptedFormats.includes(file.type)) {
      return `Please upload a valid image file (${acceptedFormats
        .map((f) => f.split("/")[1])
        .join(", ")})`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFileSelect = (selectedFile) => {
    setError("");
    setUploadSuccess(false);
    setImageUrl("");

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    setError("");
    setUploadProgress(0);
    console.log("here");
    const fileName = `${Date.now()}-${file.name}`;
    const contentType = file.type;

    try {
      setUploadProgress(20);
      const response = await GetPresignedURL(fileName, contentType);
      console.log(response);
      const { url, key } = response;

      setUploadProgress(40);
      await axios.put(url, file, {
        headers: {
          "Content-Type": contentType,
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round(40 + (progressEvent.loaded / progressEvent.total) * 50)
            : 40;
          setUploadProgress(progress);
        },
      });

      const publicUrl = `https://homeease-s3-bucket-1.s3.af-south-1.amazonaws.com/${key}`;
      setImageUrl(publicUrl);
      setUploadProgress(100);
      if (type === "Logo") {
        console.log("id: ", id);
        await UpdateLogo(id, publicUrl);
      }
      if (type === "Service") {
        await UpdateServiceImgURl(id, publicUrl);
      }
      setUploadSuccess(true);

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    setImageUrl("");
    setError("");
    setUploadSuccess(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-balance">
          Upload Your Image
        </h2>
        <p className="text-sm text-muted-foreground">
          Supports{" "}
          {acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ")}{" "}
          up to {maxSizeMB}MB
        </p>
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}
      </div>

      {!preview && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={acceptedFormats.join(",")}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div
              className={`
              p-4 rounded-full transition-colors
              ${isDragging ? "bg-primary/10" : "bg-muted"}
            `}
            >
              <Upload
                className={`w-8 h-8 ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragging
                  ? "Drop your image here"
                  : "Drag & drop your image here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>
          </div>
        </div>
      )}

      {preview && !uploadSuccess && (
        <div className="relative border rounded-lg p-4 bg-card">
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background border shadow-sm transition-colors z-10"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ImageIcon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file && (file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {uploadSuccess && imageUrl && (
        <div className="border rounded-lg p-6 bg-card space-y-4">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium">Upload successful!</p>
          </div>

          <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Image URL:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-muted rounded-md border border-border"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(imageUrl);
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <Button
            onClick={handleRemove}
            variant="outline"
            className="w-full bg-transparent"
          >
            Upload Another Image
          </Button>
        </div>
      )}
    </div>
  );
}
