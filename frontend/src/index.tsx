import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persister, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { addInterseptors } from "./axiosApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

addInterseptors(store);

root.render(
  <React.StrictMode>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </PersistGate>
  </React.StrictMode>,
);
