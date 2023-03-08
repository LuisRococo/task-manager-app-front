import React from "react";
import BoardPage from "./pages/BoardPage";
import { Footer } from "./components/common/Footer/Footer";
import { Navigation } from "./components/common/Navigation/Navigation";
import { useUserState } from "./hooks/useUserState";
import { LoadingPage } from "./pages/LoadingPage";
import { EditUserModal } from "./components/boardPage/EditUserModal/EditUserModal";

function App() {
  const { user } = useUserState();

  if (!user.userData) {
    return <LoadingPage />;
  }

  return (
    <div>
      <EditUserModal />
      <Navigation />
      <BoardPage />
      <Footer />
    </div>
  );
}

export default App;
