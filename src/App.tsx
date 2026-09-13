import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CollectionsPage } from "./pages/CollectionsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <div className="flex min-h-screen flex-col ">
    
    <Header />

    <main className="flex-1">
      <Routes>
        <Route path="/" element={<CollectionsPage />} />
        <Route path="/gallery/:folderId" element={<GalleryPage />} />
      </Routes>
    </main>
    </div>
    
    <Footer />
    </BrowserRouter>
  );
}

export default App;
