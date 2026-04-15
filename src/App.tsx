import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CollectionsPage } from "./pages/CollectionsPage";
import { GalleryPage } from "./pages/GalleryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionsPage />} />
        <Route path="/gallery/:folderId" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
