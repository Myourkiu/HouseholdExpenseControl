import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { PeoplePage } from './pages/PeoplePage';
import { TransactionsPage } from './pages/TransactionsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TotalsPage } from './pages/TotalsPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/pessoa" replace />} />
          <Route path="/pessoa" element={<PeoplePage />} />
          <Route path="/categoria" element={<CategoriesPage />} />
          <Route path="/transacao" element={<TransactionsPage />} />
          <Route path="/total" element={<TotalsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
