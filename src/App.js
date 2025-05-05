import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [goals, setGoals] = useState('');
  const [savedGoals, setSavedGoals] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [quote, setQuote] = useState({
    text: "The morning steals upon the night, melting the darkness.",
    author: "William Shakespeare"
  });
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample quotes for morning inspiration
  const morningQuotes = [
    {
      text: "The morning steals upon the night, melting the darkness.",
      author: "William Shakespeare"
    },
    {
      text: "With the new day comes new strength and new thoughts.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "Each morning we are born again. What we do today is what matters most.",
      author: "Buddha"
    },
    {
      text: "The breeze at dawn has secrets to tell you. Don't go back to sleep.",
      author: "Rumi"
    },
    {
      text: "Every morning is a beautiful morning.",
      author: "Terri Guillemets"
    }
  ];

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using News API - you'll need to replace YOUR_API_KEY with an actual API key
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=03b3ccba6b0142a09d922450b32ded27');
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles.map(article => article.title));
        } else {
          // Fallback news if API fails or returns empty
          setNews([
            "Global markets show signs of recovery as inflation rates stabilize",
            "Scientists discover breakthrough in renewable energy storage technology",
            "New health study links morning routines to improved mental wellbeing",
            "Tech companies announce collaboration on AI ethics standards",
            "Environmental report highlights progress in conservation efforts"
          ]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback news if API fails
        setNews([
          "Global markets show signs of recovery as inflation rates stabilize",
          "Scientists discover breakthrough in renewable energy storage technology",
          "New health study links morning routines to improved mental wellbeing",
          "Tech companies announce collaboration on AI ethics standards",
          "Environmental report highlights progress in conservation efforts"
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const dateString = now.toLocaleDateString(undefined, dateOptions);
      
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    }, 1000);
    
    // Choose a random quote on load
    const randomQuote = morningQuotes[Math.floor(Math.random() * morningQuotes.length)];
    setQuote(randomQuote);
    
    // Clean up timer
    return () => clearInterval(timer);
  }, []);

  // Handle goal input
  const handleGoalChange = (e) => {
    setGoals(e.target.value);
  };

  // Add a goal to the list
  const addGoal = () => {
    if (goals.trim() !== '') {
      setSavedGoals([...savedGoals, goals]);
      setGoals('');
    }
  };

  // Handle key press for goal input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addGoal();
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="time-date">
            <h1 className="time">{currentTime}</h1>
            <h2 className="date">{currentDate}</h2>
          </div>
          <div className="quote-content">
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">— {quote.author}</p>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-left">
            <div className="goals-section">
              <h2>Today's Goals</h2>
              <div className="goal-input-container">
                <input
                  type="text"
                  value={goals}
                  onChange={handleGoalChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Add your goal for today..."
                  className="goal-input"
                />
                <button onClick={addGoal} className="add-btn">+</button>
              </div>
              <div className="goals-list">
                {savedGoals.map((goal, index) => (
                  <div key={index} className="goal-item">
                    <span className="goal-dot">•</span> {goal}
                  </div>
                ))}
                {savedGoals.length === 0 && (
                  <div className="no-goals-message">Your daily intentions will appear here...</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="dashboard-right">
            <div className="inspiration-image">
              <div className="image-overlay">
              </div>
            </div>
            
            <div className="news-section">
              <h2>Morning Briefing</h2>
              <div className="news-list">
                {isLoading ? (
                  <div className="loading-message">Loading latest news...</div>
                ) : (
                  news.map((item, index) => (
                    <div key={index} className="news-item">
                      <span className="news-dot">•</span> {item}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;




//03b3ccba6b0142a09d922450b32ded27