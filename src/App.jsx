import AppRoutes from "./router/Routes";
import "./index.css";
import { UserProvider } from "./context/contextAPI";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
