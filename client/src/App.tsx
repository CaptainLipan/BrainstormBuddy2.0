import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Landing from "./components/routes/landing/Landing";
import CreatePostPage from "./components/routes/createPost/CreatePost"; // Import your create post page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/create-post" element={<CreatePostPage />} /> {/* Use element prop */}
                <Route path="/" element={<Landing />} /> {/* Use element prop */}
            </Routes>
        </Router>
    );
}

export default App;
