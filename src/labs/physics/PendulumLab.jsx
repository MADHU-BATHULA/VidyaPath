import { useEffect, useRef, useState } from "react";

export default function PendulumLab() {
    const canvasRef = useRef(null);
    const [length, setLength] = useState(120);
    const [angle, setAngle] = useState(30);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let t = 0;
        let id;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const ox = canvas.width / 2;
            const oy = 20;
            const rad = angle * Math.PI / 180;

            const x = ox + length * Math.sin(Math.sin(t) * rad);
            const y = oy + length * Math.cos(Math.sin(t) * rad);

            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "#00d4ff";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "#00e676";
            ctx.fill();

            t += 0.05;
            id = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(id);
    }, [length, angle]);

    return (
        <div>
            <h3>🔄 Simple Pendulum Lab</h3>

            <canvas
                ref={canvasRef}
                width={400}
                height={260}
                style={{ background: "#0d1117", borderRadius: 10 }}
            />

            <div>
                <label>Length (cm): {length}</label>
                <input
                    type="range"
                    min="50"
                    max="200"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>

            <div>
                <label>Angle (°): {angle}</label>
                <input
                    type="range"
                    min="5"
                    max="60"
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                />
            </div>

            <p>Observation: Longer length → higher time period</p>
        </div>
    );
}