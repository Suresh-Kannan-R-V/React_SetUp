import { AppRoutes } from "@/router/routes";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <AppRoutes />
    </HeroUIProvider>
  );
}

export default App;

