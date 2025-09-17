// app/ReduxProvider.tsx
"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Store from "@/Store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [persistor] = useState(() => persistStore(Store));

  return (
    <Provider store={Store}>
      <PersistGate
        loading={
          <div className="flex justify-center items-center py-20 h-screen">
            <div className="h-12 w-12 border-4 border-gray-200 border-t-[#1AB65C] rounded-full animate-spin" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
