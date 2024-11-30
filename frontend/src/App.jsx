import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allroutes from "./routes/Allroutes";
import Footer from "./components/Footer";

function App() {
  return (
    // <AuthContextProvider>
      <div className="min-h-screen flex flex-col"> 
        <Router>
          <div className="flex-grow"> 
            <Allroutes />
          </div>
          <Footer />
        </Router>
      </div>
    // </AuthContextProvider>
  );
}

export default App;
