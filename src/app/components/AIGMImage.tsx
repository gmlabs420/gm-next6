"use client"
import { useState, useEffect } from "react";

export default function AIImageGenerator() {
  const [complexityLevel, setComplexityLevel] = useState(50);
  const [imageSize, setImageSize] = useState(1080); // default to 1080
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    const prompt = `Generate an image with complexity level ${complexityLevel} and size ${imageSize}x${imageSize}`;
    
    const response = await fetch('/api/openai-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, complexityLevel, imageSize }),
    });

    const data = await response.json();
    setResult(data.imageUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('Image URL copied to clipboard!');
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

    const percentage = value / 100;

    const startColor = mixColor(white, middle1, percentage <= 0.25 ? percentage * 4 : 1);
    const midColor1 = mixColor(middle1, middle2, percentage <= 0.5 ? (percentage - 0.25) * 4 : 1);
    const midColor2 = mixColor(middle2, middle3, percentage <= 0.75 ? (percentage - 0.5) * 4 : 1);
    const endColor = mixColor(middle3, right, percentage > 0.75 ? (percentage - 0.75) * 4 : 0);

    return `linear-gradient(90deg, ${startColor} 0%, ${midColor1} 25%, ${midColor2} 50%, ${endColor} 100%)`;
  };

  useEffect(() => {
    const complexitySlider = document.getElementById('complexityLevel');
    if (complexitySlider) {
      const background = getSliderBackground(complexityLevel);
      console.log('Applying background:', background); // Debugging line
      complexitySlider.style.background = background;
    }
  }, [complexityLevel]);

  useEffect(() => {
    const sizeSlider = document.getElementById('imageSize');
    if (sizeSlider) {
      const background = getSliderBackground(imageSize / 20); // Adjust scale for size slider
      sizeSlider.style.background = background;
    }
  }, [imageSize]);

  return (
    <div className="machine">
      <span><h2>AI GM Image Generator</h2></span>
      <div>
        <p>Generate AI images! Adjust the complexity and size with the sliders.</p>
        <div className="slider-container">
          <input 
            type="range" 
            id="complexityLevel" 
            name="complexityLevel" 
            min="0" 
            max="100" 
            value={complexityLevel} 
            onChange={(e) => setComplexityLevel(e.target.value)} 
          />
          <label htmlFor="complexityLevel">Complexity Level: {complexityLevel}</label>
        </div>
        <div className="slider-container">
          <input 
            type="range" 
            id="imageSize" 
            name="imageSize" 
            min="512" 
            max="2048" 
            step="128" 
            value={imageSize} 
            onChange={(e) => setImageSize(e.target.value)} 
          />
          <label htmlFor="imageSize">Image Size: {imageSize}x{imageSize}</label>
        </div>
      </div>
      <div className="recessed-field3">
        {result ? <img src={result} alt="Generated AI" id="aiGeneratedImage" /> : <p>Your generated image will appear here...</p>}
      </div>
      <button onClick={handleGenerate} className="action-button">
        Generate
      </button>
      <button onClick={handleCopy} className="action-button">
        Copy
      </button>
    </div>
  );
}
