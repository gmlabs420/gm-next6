"use client"
import { useState, useEffect } from "react";

export default function AIGMMachine() {
  const [prefix, setPrefix] = useState('Good Morning');
  const [selectedTags, setSelectedTags] = useState([]);
  const [numCharacters, setNumCharacters] = useState(280); // default to 280 characters
  const [result, setResult] = useState('');

  const tags = ['Inspiration', 'Motivation', 'Wisdom', 'Happiness', 'Love', 'Friendship', 'Success', 'Life', 'Hope'];

  const handleTagClick = (tag) => {
    setSelectedTags(prevSelectedTags => 
      prevSelectedTags.includes(tag) 
        ? prevSelectedTags.filter(t => t !== tag) 
        : [...prevSelectedTags, tag]
    );
  };

  const handleGenerate = async () => {
    const prompt = `${prefix} ${selectedTags.length > 0 ? selectedTags.join(', ') + ' ' : ''}quote`;
    
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type: 'text', numCharacters }),
    });

    const data = await response.json();
    setResult(data.choices[0].text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('Text copied to clipboard!');
  };

  const getSliderBackground = (value) => {
    const white = { r: 255, g: 255, b: 255 };
    const middle1 = { r: 235, g: 235, b: 235 }; // Intermediate color between white and #c4ff72
    const middle2 = { r: 196, g: 255, b: 114 }; // #c4ff72
    const middle3 = { r: 225, g: 223, b: 67 }; // Intermediate color between #c4ff72 and #ffc014
    const right = { r: 255, g: 192, b: 20 }; // #ffc014

    const mixColor = (start, end, percentage) => {
      const r = start.r + percentage * (end.r - start.r);
      const g = start.g + percentage * (end.g - start.g);
      const b = start.b + percentage * (end.b - start.b);
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    const percentage = value / 1000;

    const startColor = mixColor(white, middle1, percentage <= 0.25 ? percentage * 4 : 1);
    const midColor1 = mixColor(middle1, middle2, percentage <= 0.5 ? (percentage - 0.25) * 4 : 1);
    const midColor2 = mixColor(middle2, middle3, percentage <= 0.75 ? (percentage - 0.5) * 4 : 1);
    const endColor = mixColor(middle3, right, percentage > 0.75 ? (percentage - 0.75) * 4 : 0);

    return `linear-gradient(90deg, ${startColor} 0%, ${midColor1} 25%, ${midColor2} 50%, ${endColor} 100%)`;
  };

  useEffect(() => {
    const numCharactersSlider = document.getElementById('numCharacters');
    if (numCharactersSlider) {
      const background = getSliderBackground(numCharacters);
      console.log('Applying background:', background); // Debugging line
      numCharactersSlider.style.background = background;
    }
  }, [numCharacters]);

  return (
    <div className="machine">
      <span><h2>AI GM Quote Generator</h2></span>
      <div>
        <p>AI generated GM quotes! Add a tag or generate randomly.</p>
        <div className="tags-container-wrapper">
          <div className="tags-container">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`action-button2 ${selectedTags.includes(tag) ? 'selected' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="slider-container">
        <input 
          type="range" 
          id="numCharacters" 
          name="numCharacters" 
          min="10" 
          max="1000" 
          step="10" 
          value={numCharacters} 
          onChange={(e) => setNumCharacters(e.target.value)} 
        />
        <label htmlFor="numCharacters">Number of Characters: {numCharacters}/1000</label>
      </div>
      <div className="recessed-field2">
        <p id="aiGeneratedText">{result || 'Your inspirational quote will appear here...'}</p>
      </div>
      <button
        onClick={handleGenerate}
        className={`action-button ${selectedTags.length > 0 ? 'selected-generate' : ''}`}
      >
        Generate
      </button>
      <button onClick={handleCopy} className="action-button">
        Copy
      </button>
    </div>
  );
}
