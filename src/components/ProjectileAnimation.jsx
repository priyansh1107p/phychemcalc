import React, { useEffect, useRef, useState } from "react";

const ProjectileAnimation = ({ result }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const initialVelocity = parseFloat(result.results.u || "0");
  const angle = parseFloat(result.results.angle || "0");
  const initialHeight = parseFloat(result.results.h || "0");
  const range = parseFloat(result.results.R || "0");
  const timeOfFlight = parseFloat(result.results.T || "0");

  const angleRad = (angle * Math.PI) / 180;

  const g = 9.8;
  const vx = initialVelocity * Math.cos(angleRad);
  const vy = initialVelocity * Math.sin(angleRad);

  const getPosition = (t) => {
    const x = vx * t;
    const y = initialHeight + vy * t - 0.5 * g * t * t;
    return { x, y };
  };

  const calculateMaxHeight = () => {
    const tMax = vy / g;
    const maxPos = getPosition(tMax);
    return Math.max(maxPos.y, initialHeight);
  };

  const maxHeight = calculateMaxHeight();

  const drawTrajectory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Scale factors to fit trajectory in canvas
    const scaleX = (width - 40) / range;
    const scaleY = (height - 40) / (maxHeight + 2);

    // Draw ground
    ctx.beginPath();
    ctx.moveTo(20, height - 20);
    ctx.lineTo(width - 20, height - 20);
    ctx.strokeStyle = "#4b5563";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the full path
    ctx.beginPath();
    ctx.moveTo(20, height - 20 - initialHeight * scaleY);

    for (let t = 0; t <= timeOfFlight; t += 0.02) {
      const pos = getPosition(t);
      if (pos.y >= 0) {
        const canvasX = 20 + pos.x * scaleX;
        const canvasY = height - 20 - pos.y * scaleY;
        ctx.lineTo(canvasX, canvasY);
      }
    }

    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the current position of the projectile if animation is playing
    if (playing) {
      const currentTime = progress * timeOfFlight;
      const currentPos = getPosition(currentTime);

      if (currentPos.y >= 0) {
        const currentX = 20 + currentPos.x * scaleX;
        const currentY = height - 20 - currentPos.y * scaleY;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "#10b981";
        ctx.fill();
      }
    }

    // Add labels
    ctx.fillStyle = "#1f2937";
    ctx.font = "12px Arial";
    ctx.fillText(`0m`, 15, height - 5);
    ctx.fillText(`${range.toFixed(1)}m`, width - 30, height - 5);
    ctx.fillText(
      `${maxHeight.toFixed(1)}m`,
      5,
      height - 20 - maxHeight * scaleY
    );
  };

  // Animation loop
  const animate = () => {
    if (progress < 1) {
      setProgress((prev) => {
        const newProgress = prev + 0.01;
        return newProgress > 1 ? 1 : newProgress;
      });
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Animation has completed
      setPlaying(false);
      // The button will show "Replay Animation" because progress is still at 1
    }
  };

  // Start or restart animation
  const startAnimation = () => {
    // Reset progress to start from the beginning
    setProgress(0);
    setPlaying(true);

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Start a new animation
    animationRef.current = requestAnimationFrame(animate);
  };

  // Draw initial state and handle animation
  useEffect(() => {
    drawTrajectory();
  }, [progress, playing]);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    drawTrajectory();
  }, [result]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl">
      <div className="mb-4 w-full flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">Initial Velocity:</span>{" "}
            {initialVelocity} m/s
          </div>
          <div>
            <span className="font-medium">Angle:</span> {angle}°
          </div>
          <div>
            <span className="font-medium">Initial Height:</span> {initialHeight}{" "}
            m
          </div>
          <div>
            <span className="font-medium">Range:</span> {range} m
          </div>
          <div>
            <span className="font-medium">Time of Flight:</span> {timeOfFlight}{" "}
            s
          </div>
          <div>
            <span className="font-medium">Current Time:</span>{" "}
            {(progress * timeOfFlight).toFixed(2)} s
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
        <canvas ref={canvasRef} width={600} height={300} className="bg-white" />
      </div>

      <div className="flex space-x-4 w-full max-w-md">
        <button
          onClick={startAnimation}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:bg-blue-400"
        >
          {playing
            ? "Replay Animation"
            : progress >= 1
            ? "Replay Animation"
            : "Play Animation"}
        </button>
      </div>

      <div className="w-full max-w-md bg-gray-200 h-2 mt-4 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProjectileAnimation;
