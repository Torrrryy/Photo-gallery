import React, { FC, useState, MouseEvent } from "react";
import "../../../styles/global.css";

// Интерфейс пропсов для компонента Modal
interface modalProps {
  photo: string | undefined; 
  openPhoto: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}

// Функциональный компонент Modal
export const Modal: FC<modalProps> = (props) => {
  const { photo, children, openPhoto, onClose } = props;

  // Состояние для управления зумированием изображения
  const [zoomed, setZoomed] = useState(false);
  // Состояние для хранения координат точки зумирования
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 });

  // Обработчик двойного клика по изображению
  const handleDoubleClick = (e: MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect(); 
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    setZoomOrigin({ x, y }); 
    setZoomed(!zoomed); 
  };

  return (
    <>
      {/* Модальное окно отображается, только если openPhoto === true */}
      {openPhoto && (
        <div className="modal">
          {/* Кнопка закрытия модального окна */}
          <span className="close-btn" onClick={onClose}>
            x
          </span>
          {/* Изображение в модальном окне */}
          <img
            src={photo || undefined} // URL изображения
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