import React, { useEffect, useRef } from "react";
import { useCamera } from "../provider/CameraProvider";

interface SecurityProps {
  showCamera: boolean;
}

const Security: React.FC<SecurityProps> = ({ showCamera }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { stream, error } = useCamera();

  useEffect(() => {
    if (videoRef.current && stream && showCamera) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, showCamera]);

  return (
    <div>
      <h1>Security Page</h1>
      {error && <p>Error: {error}</p>}
      {showCamera && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: "100%",
              maxWidth: "400px",
              display: showCamera ? "block" : "none",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Security;
