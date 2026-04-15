import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CollectionsPage } from "./pages/CollectionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
