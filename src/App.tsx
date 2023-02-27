import React from "react";
import BoardPage from "./pages/BoardPage";
import { Footer } from "./components/common/Footer/Footer";
import { Navigation } from "./components/common/Navigation/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <BoardPage />
      <Footer />
    </div>
  );
}

export default App;
