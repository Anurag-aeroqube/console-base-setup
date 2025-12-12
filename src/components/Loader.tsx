import { useLoading } from "@/contexts/LoadingContext";
import loaderAnimation from "@/assets/animations/loader.json"; 
import Lottie from "lottie-react";

export const Loader: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <Lottie
        animationData={loaderAnimation}
        loop
        autoPlay
        style={{ width: 250, height: 250 }}
      />
    </div>
  );
};
