import React from "react";

export const BoardCard = () => {
  return (
    <div className="col-md-6 my-2 px-2">
      <div className="bg-light  rounded p-4">
        <h4>Board title</h4>
        <hr />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">See</button>
        </div>
      </div>
    </div>
  );
};
