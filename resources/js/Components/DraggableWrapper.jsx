import React, { useState } from "react";

const DraggableWrapper = ({ children }) => {
    const [position, setPosition] = useState({ x: 300, y: 200 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        setDragging(true);
        setStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const onMouseMove = (e) => {
        if (dragging) {
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: "grab",
                zIndex: 10
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {children}
        </div>
    );
};

export default DraggableWrapper;
