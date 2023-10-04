import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persister, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { addInterseptors } from "./axiosApi";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

addInterseptors(store);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persister}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </PersistGate>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
