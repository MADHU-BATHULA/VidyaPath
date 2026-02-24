import { useRef, useEffect, useState } from "react";

export default function OhmsLawLab() {
    const canvasRef = useRef(null);
    const [voltage, setVoltage] = useState(5);
    const [resistance, setResistance] = useState(10);

    const current = (voltage / resistance).toFixed(2);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Wire
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(350, 100);
        ctx.stroke();

        // Battery
        ctx.fillStyle = "#ff6b35";
        ctx.fillRect(40, 70, 10, 60);

        // Current dots
        for (let i = 0; i < current * 10; i++) {
            ctx.beginPath();
            ctx.arc(70 + i * 10, 100, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#00e676";
            ctx.fill();
        }
    }, [voltage, resistance]);

    return (
        <div>
            <h3>⚡ Ohm’s Law Virtual Lab</h3>

            <canvas
                ref={canvasRef}
                width={400}
                height={200}
                style={{ background: "#060a14", borderRadius: "10px" }}
            />

            <div>
                <label>Voltage (V): {voltage}</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                />
            </div>

            <div>
                <label>Resistance (Ω): {resistance}</label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                />
            </div>

            <p>
                <strong>Current (I):</strong> {current} A
            </p>
        </div>
    );
}