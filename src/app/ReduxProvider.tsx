"use client";

import Store from "@/Store";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [persistor] = useState(() => persistStore(Store));

  return (
    <Provider store={Store}>
      <PersistGate
        loading={
          <div className="flex h-screen items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#1AB65C]" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
