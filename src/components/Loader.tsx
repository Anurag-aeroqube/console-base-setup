import { useLoading } from "@/contexts/LoadingContext";

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
      {/* Loading Text */}
      <h2 className="text-primary font-semibold text-3xl" >
        Loading...
      </h2>
    </div>
  );
};