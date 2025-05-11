import React, { FC, useState, MouseEvent } from "react";
import "../../../styles/global.css";

interface modalProps {
  photo: string | undefined;
  openPhoto: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<modalProps> = ({ photo, children, openPhoto, onClose }) => {
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 });

  const handleDoubleClick = (e: MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomOrigin({ x, y });
    setZoomed(!zoomed);
  };

  return (
    <>
      {openPhoto && (
        <div className="modal">
          <span className="close-btn" onClick={onClose}>
            x
          </span>
          <img
            src={photo || undefined}
            className={`modal-image ${zoomed ? "zoomed" : ""}`}
            onDoubleClick={handleDoubleClick}
            style={{
              transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
            }}
            width={500}
            height={500}
            alt="preview"
          />
          {children}
        </div>
      )}
    </>
  );
};
