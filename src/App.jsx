import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./components/form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="h-screen w-full bg-[#f0f0f0] flex items-center justify-center">
      <Form />
    </main>
  );
}

export default App;
