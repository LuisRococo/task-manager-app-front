import React, { useState } from "react";
import "./BoardPage.scss";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";

function BoardPage() {
  const [boardTitle, setProjectTitle] = useState("My Task Manager");
  const [projectImage, setProjectImage] = useState(
    "https://via.placeholder.com/150"
  );

  return (
    <div className="container">
      <BoardHeader boardTitle={boardTitle} projectImage={projectImage} />
    </div>
  );
}

export default BoardPage;
