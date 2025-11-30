import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateJobPage from './pages/CreateJobPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import ChatsPage from './pages/ChatsPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MyListingsPage from './pages/MyListingsPage';
import MyBidsPage from './pages/MyBidsPage';
import AvailableJobsPage from './pages/AvailableJobsPage';
import HowItWorksPage from './pages/HowItWorksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-job" element={<CreateJobPage />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chats/:chatId" element={<ChatPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/shipper/listings" element={<MyListingsPage />} />
        <Route path="/dashboard/carrier/bids" element={<MyBidsPage />} />
        <Route path="/provider/jobs" element={<AvailableJobsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
