"use client";
import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [showUnmute, setShowUnmute] = useState(false);

    useEffect(() => {
        const tryPlay = () => {
            audioRef.current?.play()
                .then(() => {
                    setShowUnmute(false);
                })
                .catch(error => {
                    console.error("Autoplay failed:", error);
                    setShowUnmute(true);
                });
        };

        tryPlay();

        // Try again when user interacts
        const handleInteraction = () => {
            tryPlay();
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    const handleUnmuteClick = () => {
        audioRef.current?.play()
            .then(() => setShowUnmute(false))
            .catch(e => console.error("Unmute failed:", e));
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                src="/audio/nepali-lofi.mp3"
                className="hidden"
            />
            {showUnmute && (
                <button
                    onClick={handleUnmuteClick}
                    className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg z-50"
                >
                    Click to Unmute
                </button>
            )}
        </>
    );
}