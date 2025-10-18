import { useState, useEffect } from "react";

export const ProgressBar = ({ todos }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const target = todos.length
        ? Math.round((todos.filter((t) => t.completed).length / todos.length) * 100)
        : 0;

        let start = progress;
        if (start === target) return;

        const increment = target > start ? 1 : -1;
        const interval = setInterval(() => {
            start += increment;
            setProgress(start);
            if(start === target) clearInterval(interval);
        }, 15);

        return () => clearInterval(interval);
    }, [todos]);

    return (
        <div className="progress-section">
        <h3>Daily Progress</h3>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        {todos.length > 0 ? `${progress}% completed` : "No tasks yet"}
      </p>
        </div>
    )
}