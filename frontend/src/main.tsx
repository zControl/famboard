import App from "@/app";
import { Spinner } from "@/common/ui/feedback/spinner";
import React from "react";
import ReactDOM from "react-dom/client";

// Render the app to the root element
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <App />
    </React.Suspense>,
  );
}
