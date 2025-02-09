import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Upload from './components/Upload';
import Result from './components/Result';
import GenerateContainer from './components/Form.';
import ModifyConfig from './components/config';
import { FileProvider } from './components/FileContext';

function App() {
  return (
  <>
  <Navbar/>
  <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/process-file" element={<GenerateContainer />} />
          <Route path="/config" element={<ModifyConfig />} />
          <Route path="/download" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </FileProvider>
  </>
  );
}

export default App;
