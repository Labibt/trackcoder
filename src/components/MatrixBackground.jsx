import React from "react";

const MatrixBackground = () => {
  return (
    <div className="fixed inset-0 opacity-5 pointer-events-none">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-500/20 whitespace-nowrap text-sm animate-matrix"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                top: "-100%",
              }}
            >
              {Array.from({ length: 50 }).map((_, j) => (
                <div key={j} className="my-2">
                  {Math.random().toString(2).substring(2, 10)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixBackground;
