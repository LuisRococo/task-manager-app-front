import React from "react";
import BoardPage from "./pages/BoardPage";
import { Footer } from "./components/common/Footer/Footer";
import { Navigation } from "./components/common/Navigation/Navigation";
import { useUserState } from "./hooks/useUserState";
import { LoadingPage } from "./pages/LoadingPage";

function App() {
  const { user } = useUserState();

  if (!user.userData) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Navigation />
      <BoardPage />
      <Footer />
    </div>
  );
}

export default App;
