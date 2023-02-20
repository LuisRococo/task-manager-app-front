import { useState } from "react";
import BoardPage from "./pages/BoardPage";
import { Footer } from "./components/common/Footer/Footer";
import { Navigation } from "./components/common/Navigation/Navigation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navigation />
      <BoardPage />
      <Footer />
    </div>
  );
}

export default App;
