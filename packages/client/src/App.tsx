import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [message, setMessssage] = useState();

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setMessssage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="font-bold text-3xl text-center mt-30">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
