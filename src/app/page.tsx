'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Image paths
const imagePaths = [
  '/images/photo1.jpeg',
  '/images/photo2.jpeg', 
  '/images/photo3.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg',
  '/images/photo6.jpeg',
  '/images/photo7.jpeg',
  '/images/photo8.jpeg',
  '/images/photo10.jpeg'
];

export default function BirthdayPage() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'quiz' | 'final'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const questions = [
    { question: "What name do I love calling you?", answer: "abike" },
    { question: "When exactly did we start talking? 😊", answer: "june" },
    { question: "What's that one thing I don't go a day without saying to you?", answer: "i love you" }
  ];

  const startEndlessCarousel = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) {
      setTimeout(startEndlessCarousel, 100);
      return;
    }
    track.style.animation = 'none';
    setTimeout(() => {
      track.style.animation = 'scroll 40s linear infinite';
    }, 10);
  }, []);

  const startParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; radius: number; speed: number; opacity: number }> = [];
    
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startTypeWriter = useCallback(() => {
    const finalMessageText = `Happy Birthday, Abike ❤️  Omotoriola, Omojadesola, Abike, Imoleayo - The love of my life! I know you might be teary reading this but I am sure it is definitely tears of joy. Every time I think about us, my heart goes back to the very first day we started talking. And in all those days, you've become more than just someone I talk to… you've become the center of my thoughts, the peace in my heart, and the light in my days. Your name Imoleayo 'light of joy.' Mine is Ayo 'joy', I just know your parents knew it all from start you were going to meet an Ayo definitely and be his Imole. Funny to say my mum actually brought me to the world but you actually gave me my world (you). I can't believe how perfectly Allah arranged it, that light and joy would meet, and somehow fit so naturally together.<br />
Calling you Abike isn't just me being playful; it's me speaking from a place of love, reminding you that you are someone to be cared for, to be treasured, to be protected forever and always. We love the same things, laugh at the same things, and dream in the same direction. That's not coincidence, Abike. That's connection!<br />
And it's why I can say with all my heart: you mean everything to me. If my words make you teary, it's only because they're true. You are my everyday blessing and I thank God every single day I wake for bringing you into my life, Abike the one I don't ever want to lose. 💕`;

    let i = 0;
    let currentText = '';
    const speed = 32;
    
    const typeWriter = () => {
      if (i < finalMessageText.length) {
        currentText += finalMessageText.charAt(i);
        setFinalMessage(currentText);
        i++;
        const delay = finalMessageText.charAt(i-1) === ' ' ? speed / 2 : speed;
        setTimeout(typeWriter, delay);
      }
    };
    
    setTimeout(typeWriter, 500);
  }, []);

  useEffect(() => {
    if (currentPage === 'final') {
      startParticles();
      setTimeout(() => startEndlessCarousel(), 100);
      startTypeWriter();
    }
  }, [currentPage, startParticles, startEndlessCarousel, startTypeWriter]);

  const startQuiz = () => setCurrentPage('quiz');

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === questions[currentQuestion].answer) {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
      } else {
        setCurrentPage('final');
      }
    } else {
      alert("You are so smart baby girl,😅 Try again, my love!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') checkAnswer();
  };

  return (
    <div className="birthday-container">
      <canvas ref={canvasRef} className="particles"></canvas>

      <AnimatePresence mode="wait">
        {/* Landing Page */}
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page landing active"
          >
            {/* Landing content here */}
            <div className="landing-content">
              <motion.div className="quiz bounce-in">
                <motion.div className="cake-icon" animate={{ scale: [1,1.1,1], rotate: [0,-5,0,5,0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>🎂</motion.div>
                <h1>Happy Birthday My Love</h1>
                <p>I have a fun little game for you 💕</p>
                <p className="instruction-note">💡 Mind you, passing this game may cause uncontrollable smiling, blushing like never before, and maybe tears of joy. Proceed with caution! 💖</p>
                <div className="instructions">
                  <h3>✨ Instructions ✨</h3>
                  <ul>
                    <li><span>1</span>Answer all questions correctly 😜</li>
                    <li><span>2</span>If you get stuck, think of me (I always drop hints 😉)</li>
                    <li><span>3</span>Complete all 3 questions to unlock your surprise 🎉</li>
                  </ul>
                </div>
                <motion.button onClick={startQuiz} className="cta-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Start 🎁</motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Quiz Page */}
        {currentPage === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="page quiz-page active">
            <div className="quiz" id="quiz-container">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fade-in-step">
                <h2>Question {currentQuestion + 1}</h2>
                <p>{questions[currentQuestion].question}</p>
                <input type="text" placeholder="Type your answer..." value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyPress={handleKeyPress} autoFocus />
                <br />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={checkAnswer}>Submit</motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Final Page */}
        {currentPage === 'final' && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="page final-page active">
            <div className="slideshow-container">
              <div className="carousel-track" ref={carouselTrackRef}>
                {imagePaths.map((img, index) => (
                  <div key={index} className="carousel-item">
                    <div className="image-placeholder">
                      <Image src={img} alt={`Memory ${index + 1}`} width={400} height={600} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div className="fallback-text">Image {index + 1}</div>
                    </div>
                  </div>
                ))}
                {imagePaths.map((img, index) => (
                  <div key={`dup-${index}`} className="carousel-item">
                    <div className="image-placeholder">
                      <Image src={img} alt={`Memory ${index + 1}`} width={400} height={600} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div className="fallback-text">Image {index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-overlay"></div>
            </div>
            <div className="final-content">
              <div className="final-message-container">
                <h2 className="final-title">Happy Birthday, My Love! 🎂</h2>
                <div className="final-message" dangerouslySetInnerHTML={{ __html: finalMessage }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .birthday-container {
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
          color: #333333;
          background: transparent !important;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          background: transparent;
        }
        
        .page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          flex-direction: column;
          text-align: center;
          padding: 1rem;
          background: transparent !important;
        }
        
        .landing-content {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .quiz {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 85%;
          max-width: 500px;
          position: relative;
        }
        
        .cake-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        h1, h2 {
          color: #d6336c;
          font-family: 'Playfair Display', serif;
        }
        
        h1 {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }
        
        h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        
        h3 {
          color: #d6336c;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        
        p {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #666666;
        }
        
        .instruction-note {
          font-style: italic;
          color: #555;
          margin: 10px 0;
          line-height: 1.5;
        }
        
        .instructions {
          text-align: left;
          margin-top: 15px;
          font-size: 16px;
          color: #444;
        }
        
        .instructions ul {
          list-style: none;
          padding: 0;
        }
        
        .instructions li {
          padding: 0.5rem 0;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
        }
        
        .instructions li span {
          display: inline-block;
          width: 25px;
          height: 25px;
          background: #d6336c;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 25px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        button {
          background: #d6336c;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          font-size: 16px;
          margin-top: 15px;
          cursor: pointer;
          transition: 0.3s;
        }
        
        button:hover { 
          background: #a61e4d; 
        }
        
        .cta-button {
          padding: 15px 30px;
          font-size: 1.2rem;
        }
        
        input {
          padding: 10px;
          width: 85%;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-top: 10px;
          font-size: 16px;
        }
        
        /* Final Page Styles */
        .final-page {
          position: relative;
          padding: 0;
          justify-content: flex-end;
          background: transparent !important;
        }
        
        .slideshow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
          display: block !important;
        }
        
        .carousel-track {
          display: flex !important;
          width: max-content;
          height: 100%;
          animation: scroll 40s linear infinite;
        }
        
        .carousel-item {
          width: 33.33vw;
          height: 100vh;
          flex-shrink: 0;
          box-sizing: border-box;
          padding: 10px;
          display: block !important;
        }
        
        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #ff6b6b, #d6336c);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          border-radius: 12px;
          position: relative;
        }
        
        .image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .fallback-text {
          display: none;
        }
        
        .image-placeholder img:not([src]) + .fallback-text,
        .image-placeholder img[src=""] + .fallback-text {
          display: flex;
        }
        
        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
          z-index: 2;
        }
        
        .final-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 800px;
          z-index: 3;
          padding: 20px;
          margin-bottom: 40px;
        }
        
        .final-message-container {
          background: rgba(0, 0, 0, 0.7);
          border-radius: 15px;
          padding: 25px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .final-title {
          color: #ff6b6b;
          font-size: 2rem;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .final-message {
          color: white;
          font-size: 1.1rem;
          line-height: 1.6;
          text-align: left;
          max-height: 50vh;
          overflow-y: auto;
          padding: 10px;
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { transform: scale(1); }
        }
        
        .bounce-in {
          animation: bounceIn 0.8s cubic-bezier(.22,.61,.36,1);
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Scrollbar styling */
        .final-message::-webkit-scrollbar {
          width: 6px;
        }
        
        .final-message::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .final-message::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 107, 0.7);
          border-radius: 10px;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .quiz {
            padding: 20px;
            border-radius: 15px;
          }
          
          h1 { font-size: 1.5rem; }
          h2 { font-size: 1.2rem; }
          h3 { font-size: 1.3rem; }
          
          p { font-size: 16px; }
          
          .final-title {
            font-size: 1.5rem;
          }
          
          .final-message {
            font-size: 1rem;
          }
          
          button {
            font-size: 14px;
            padding: 10px 20px;
          }
          
          input {
            width: 100%;
            font-size: 14px;
          }
          
          .carousel-item {
            width: 100vw;
          }
        }
        
        @media (max-width: 480px) {
          .quiz {
            padding: 15px;
            width: 95%;
          }
          
          h1 { font-size: 1.6rem; }
          
          .cake-icon {
            font-size: 3rem;
          }
          
          .final-message-container {
            padding: 15px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}