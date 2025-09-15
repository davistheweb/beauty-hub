import Store from "@/Store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import 'remixicon/fonts/remixicon.css'

export default function App({ Component, pageProps }) {


  let persistor = persistStore(Store)

  return (
    <Provider store={Store}>
      <PersistGate loading={<div className="flex items-center justify-center h-screen w-screen">Loading...</div>} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
  // ;
}
