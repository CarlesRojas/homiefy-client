import React from "react";
import "./Border.scss";

export default function Border({ color, borderRadius, children }) {
    return (
        <div className="border" style={{ background: `linear-gradient(180deg, ${color} 0%, #111111; 100%)`, borderRadius: `${borderRadius}rem` }}>
            <div className="padding" style={{ borderRadius: `${borderRadius}rem` }}>
                {children}
            </div>
        </div>
    );
}
