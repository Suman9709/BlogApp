import React, { useState } from "react";
import Card from "./Card";

const OwnerPage = () => {
  const [blogs, setBlog] = useState("");

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-amber-200 py-10 mt-18 ">
      <Card />
    </div>
  );
};

export default OwnerPage;
