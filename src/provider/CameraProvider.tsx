import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface CameraContextType {
  stream: MediaStream | null;
  error: string | null;
}

const CameraContext = createContext<CameraContextType>({
  stream: null,
  error: null,
});

export const useCamera = () => useContext(CameraContext);

interface CameraProviderProps {
  children: ReactNode;
}

export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (mounted) {
          setStream(cameraStream);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            "Error accessing the camera: " +
              (err instanceof Error ? err.message : String(err))
          );
          console.error("Error accessing the camera:", err);
        }
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <CameraContext.Provider value={{ stream, error }}>
      {children}
    </CameraContext.Provider>
  );
};
