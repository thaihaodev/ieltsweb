import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import AppConfigProvider from "./components/Config/AppConfigProvider";

function App() {
  return (
    <AppConfigProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </AppConfigProvider>
  );
}

export default App;
