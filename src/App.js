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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Carousel images
  const carouselImages = [
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2232&auto=format&fit=crop'
  ];

  // Fetch news data or use fallback
  useEffect(() => {
    // Use fallback news since we're focusing on fixing the image
    setNews([
      "Global markets show signs of recovery as inflation rates stabilize",
      "Scientists discover breakthrough in renewable energy storage technology",
      "New health study links morning routines to improved mental wellbeing",
      "Tech companies announce collaboration on AI ethics standards",
      "Environmental report highlights progress in conservation efforts"
    ]);
    setIsLoading(false);
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

  // Image carousel auto-scroll
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(carouselInterval);
  }, [carouselImages.length]);

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
            {/* Image carousel */}
            <div className="carousel-container">
              <div className="carousel-slides">
                {carouselImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="image-overlay"></div>
                  </div>
                ))}
              </div>
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <span 
                    key={index} 
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></span>
                ))}
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