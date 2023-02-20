import { useState } from "react";
import BoardPage from "./pages/BoardPage";
import { Footer } from "./components/common/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BoardPage />
      <Footer />
    </div>
  );
}

export default App;
