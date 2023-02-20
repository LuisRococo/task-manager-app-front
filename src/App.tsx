import { useState } from "react";
import BoardPage from "./pages/BoardPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BoardPage />
    </div>
  );
}

export default App;
