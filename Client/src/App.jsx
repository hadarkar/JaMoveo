import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SessionProvider } from "./context/SessionProvider"; // 🆕
import AppContent from "./layouts/AppContent";
import NavigationSocketHandler from "./components/NavigationSocketHandler";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionProvider> {/* 🟢 עוטף את הכל */}
          <NavigationSocketHandler />
          <AppContent />
        </SessionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
