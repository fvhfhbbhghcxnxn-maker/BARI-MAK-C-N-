/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, HeartPulse } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  const maxNoClicks = 3;

  // Generate floating hearts in the background
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 110,
          size: Math.random() * 20 + 10,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    if (noClickCount < maxNoClicks) {
      setNoClickCount((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  const getQuestionText = () => {
    if (noClickCount === 0) return "Barışalım mı? 🥺";
    if (noClickCount === 1) return "Sanırım yanlışlıkla oldu... 🤨";
    if (noClickCount === 2) return "Bak sinirleniyorum! 😤";
    return "LAN BASMA DEDİM! 🔫";
  };

  const getCatGif = () => {
    const gifs = [
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Vzems3cmdrM3cyNjI5bzBibG11dWl1MGljYzd0eWI4YmRqNHk0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10GN73YGycPXQk/giphy.gif", // Initial
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2x1a2JlY3FqdjBnejkwNms2ZnpkZ2M5NTdxNHAwam9lYzI4d3QzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3MwLGbvFjwhHvXJNVM/giphy.gif", // 1st No
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDhycHJhZjlmanJrcWN6YWxhM2U4eXVoemI0OTdjZWVpcHBybzJpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GAXXHdS0zXawVLOJLY/giphy.gif", // 2nd No
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWk4YWM2eXhlMHZob3ByNGJsbmI5dTQ2dnVnZmt6cHRnaGY5cXpzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/901mxGLGQN2PyCQpoc/giphy.gif", // 3rd No
    ];
    return gifs[Math.min(noClickCount, maxNoClicks)];
  };

  const happyGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/MDJ9IbxxvDUQM/giphy.gif";

  return (
    <div className="relative min-h-screen w-full bg-pink-50 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Love Meter / Aşk Göstergesi */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-64">
        <div className="flex items-center justify-between mb-2">
          <span className="text-pink-600 font-bold text-sm flex items-center gap-1">
            <HeartPulse size={16} className="animate-pulse" /> Aşk Seviyesi
          </span>
          <span className="text-pink-600 font-bold text-sm">
            {isAccepted ? "100%" : `${Math.max(100 - noClickCount * 33, 1)}%`}
          </span>
        </div>
        <div className="h-4 w-full bg-pink-200 rounded-full overflow-hidden border-2 border-pink-300">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: isAccepted ? "100%" : `${Math.max(100 - noClickCount * 33, 1)}%` }}
            className="h-full bg-pink-500"
          />
        </div>
      </div>

      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute text-pink-300"
              style={{ fontSize: heart.size }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-pink-200 text-center max-w-md mx-4"
      >
        {!isAccepted ? (
          <>
            <motion.div
              key={noClickCount}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 relative"
            >
              <img
                src={getCatGif()}
                alt="Cute Cat"
                className="w-64 h-64 object-cover rounded-2xl mx-auto shadow-lg"
                referrerPolicy="no-referrer"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-4 -right-4 text-pink-500"
              >
                <Sparkles size={32} />
              </motion.div>
            </motion.div>

            <motion.h1 
              key={getQuestionText()}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-pink-600 mb-8 tracking-tight"
            >
              {getQuestionText()}
            </motion.h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYesClick}
                className="px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-xl shadow-lg transition-colors cursor-pointer"
              >
                Evet! ❤️
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNoClick}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium text-sm transition-all cursor-pointer"
              >
                Hayır
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <img
              src={happyGif}
              alt="Happy Cat"
              className="w-64 h-64 object-cover rounded-2xl mb-6 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-3xl font-bold text-pink-600 mb-4">
              Biliyodum barışacağımızı 😆 ❤️
            </h2>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ delay: i * 0.1, repeat: Infinity, duration: 1 }}
                  className="text-pink-500"
                >
                  <Heart fill="currentColor" size={24} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Gifs in corners */}
      <div className="absolute top-4 left-4 opacity-50 hidden md:block">
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/L95W4wv8nnb9K/giphy.gif" className="w-32 rounded-lg" referrerPolicy="no-referrer" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-50 hidden md:block">
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/117P9MlBvxqSBi/giphy.gif" className="w-32 rounded-lg" referrerPolicy="no-referrer" />
      </div>

      <Analytics />
    </div>
  );
}



