import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

const useCameraPermission = () => {
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    void (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  return [permission] as const;
};

export default useCameraPermission;
