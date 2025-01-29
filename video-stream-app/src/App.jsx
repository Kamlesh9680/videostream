import React, { useEffect }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TagManager from 'react-gtm-module';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PreviewPage from "./pages/PreviewPage";
import VideoPlayer from "./pages/VideoPage";
import UploadPage from "./pages/UploadPage";
import ContactPage from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

const App = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-KRL8S2GL" }); 
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />
            <Route path="/video-preview/:videoId" element={<PreviewPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
