import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateSubredditPage from './pages/CreateSubredditPage';
import SubredditDetailPage from './pages/SubredditDetailPage';
import CreatePostPage from './pages/CreatePostPage';


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className='container max-w-7xl mx-auto h-full pt-12'>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/r/create" element={<CreateSubredditPage />} />
            <Route path="/r/:slug" element={<SubredditDetailPage />} />
            <Route path="/r/:slug/submit" element={<CreatePostPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
