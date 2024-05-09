import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
