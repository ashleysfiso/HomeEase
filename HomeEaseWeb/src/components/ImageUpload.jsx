import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;
    const contentType = file.type;

    try {
      // Step 1: Get presigned URL from API
      const response = await axios.get(
        "https://localhost:7234/api/AwsUpload/presigned-url",
        {
          params: { fileName: fileName, contentType: contentType },
        }
      );

      const { url, key } = response.data;

      // Step 2: Upload directly to S3
      await axios.put(url, file, {
        headers: {
          "Content-Type": contentType,
        },
      });

      // Step 3: Public URL to access the image
      const publicUrl = `https://${process.env.REACT_APP_BUCKET_NAME}.s3.amazonaws.com/${key}`;
      setImageUrl(publicUrl);

      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Image using Presigned URL</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
          <p>{imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
