import { AlertTriangleIcon } from "lucide-react";

export const FormError = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <div className="text-destructive bg-destructive/20 text-sm p-3 rounded-md flex align-center font-semibold">
      <AlertTriangleIcon className="h-4 w-4 mx-2 font-bold" />
      <p>{error}</p>
    </div>
  );
};
