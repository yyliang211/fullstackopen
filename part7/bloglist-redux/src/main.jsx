import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store";

import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Router>
  </Provider>,
);
