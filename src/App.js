import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Upload from './components/Upload';
import Result from './components/Result';
import GenerateContainer from './components/Form.';
import ModifyConfig from './components/config';
import { FileProvider } from './components/FileContext';
import { FormDataProvider } from './components/FormDataContext';
import RequireFile from './components/RequireFile';
import { StatisticsProvider } from './components/StatisticContext';

function App() {
  return (
  <>
  <Navbar/>
  <FormDataProvider>
    <StatisticsProvider>
  <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/process-file" element={
             <RequireFile>
            <GenerateContainer />
            </RequireFile>} />
          <Route path="/config" element={
            <RequireFile>
            <ModifyConfig />
            </RequireFile>
            } />
          <Route path="/download" element={
            <RequireFile>
            <Result />
            </RequireFile>
            } />
        </Routes>
      </BrowserRouter>
    </FileProvider>
    </StatisticsProvider>
    </FormDataProvider>
  </>
  );
}

export default App;
