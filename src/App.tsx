import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SLIDE_DECKS } from './data/decks'

function App() {
    const [showLanding, setShowLanding] = useState(true);
    const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const currentDeck = SLIDE_DECKS[currentDeckIndex];
    const currentSlide = currentDeck.slides[currentSlideIndex];

    const nextSlide = () => {
        if (currentSlideIndex < currentDeck.slides.length - 1) {
            setDirection(1);
            setCurrentSlideIndex(s => s + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) {
            setDirection(-1);
            setCurrentSlideIndex(s => s - 1);
        }
    };

    if (showLanding) {
        return (
            <div className="slide-container landing-bg">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="slide-card landing-card"
                >
                    <div className="landing-content">
                        <h2 className="landing-meta">Mastering Foundations</h2>
                        <h1 className="landing-title">Data Structures<br />Slide Series</h1>
                        <p className="landing-description">
                            A professionally crafted visual guide to core computer science concepts.
                            Designed for clarity, efficiency, and engineering excellence.
                        </p>
                        <div className="landing-author">
                            Made by <span className="author-name">Reda HEDDAD</span>
                        </div>
                        <button className="start-btn" onClick={() => setShowLanding(false)}>
                            Start Exploration <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="slide-container">
            <div className="deck-selector">
                <button className="home-btn" onClick={() => setShowLanding(true)}>Home</button>
                <select
                    value={currentDeckIndex}
                    onChange={(e) => {
                        setCurrentDeckIndex(parseInt(e.target.value));
                        setCurrentSlideIndex(0);
                        setDirection(0);
                    }}
                >
                    {SLIDE_DECKS.map((deck, i) => (
                        <option key={deck.id} value={i}>{deck.title}</option>
                    ))}
                </select>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={`${currentDeckIndex}-${currentSlideIndex}`}
                    custom={direction}
                    initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`slide-card slide-${currentSlide.color}`}
                >
                    <div className="slide-header">
                        <div className="slide-subtitle">{currentSlide.name}</div>
                        <h1 className="slide-title">{currentSlide.title}</h1>
                    </div>

                    <div className="slide-content">
                        <div className={`responsive-grid ${currentSlide.visual ? 'has-visual' : ''}`}>
                            <div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ fontSize: '1.25rem' }}
                                >
                                    {currentSlide.content}
                                </motion.div>
                            </div>
                            {currentSlide.visual && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    className="slide-visual"
                                >
                                    {currentSlide.visual}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="slide-footer">
                        <div>Data Structures: {currentDeck.title} | By Reda HEDDAD</div>
                        <div>Slide {currentSlide.number} of 10</div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="nav-buttons">
                <button className="nav-btn" onClick={prevSlide} disabled={currentSlideIndex === 0}>
                    <ChevronLeft />
                </button>
                <div style={{ background: 'white', padding: '0 1rem', borderRadius: '25px', display: 'flex', alignItems: 'center', fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
                    {currentSlideIndex + 1} / 10
                </div>
                <button className="nav-btn" onClick={nextSlide} disabled={currentSlideIndex === 9}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}

export default App
