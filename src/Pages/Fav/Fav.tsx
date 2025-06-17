import { useEffect, useState } from "react";
import { Modal } from "../../Components/Layouts/Modal/Modal";
import heart from "../../assets/Img/heart.svg";
import heartActive from "../../assets/Img/heartActive.svg";

export const Fav = () => {
  const [favs, setFavs] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);

  useEffect(() => {
    fetchFav();
  }, []);

// Эффект для проверки, находится ли текущая фотография в избранном
useEffect(() => {
  const storedFavs = JSON.parse(localStorage.getItem("Fav") || "[]"); 
  setFav(storedFavs.includes(selectedPhoto)); 
}, [selectedPhoto]); 

// Функция для загрузки избранных фотографий из localStorage
const fetchFav = () => {
  const storedFavs = JSON.parse(localStorage.getItem("Fav") || "[]");
  setFavs(storedFavs); 
};

// Функция для открытия модального окна с выбранной фотографией
const openPhoto = (photo: string) => {
  setSelectedPhoto(photo);
  setOpen(true);
};

// Функция для закрытия модального окна
const closePhoto = () => {
  setSelectedPhoto(""); 
  setOpen(false); 
};

// Функция для скачивания фотографии
const downloadPhoto = (photo: string) => {
  const link = document.createElement("a"); 
  link.href = photo; 
  link.download = photo.split("/").pop() || "photo.jpg"; 
  link.click(); 
};

// Функция для добавления/удаления фотографии из избранного
const handleSetFav = () => {
  let existingFavs = JSON.parse(localStorage.getItem("Fav") || "[]"); 

  if (!existingFavs.includes(selectedPhoto)) {
    // Если фотография не в избранном, добавляем её
    existingFavs.push(selectedPhoto);
    localStorage.setItem("Fav", JSON.stringify(existingFavs));
    setFav(true);
  } else {
    // Если фотография в избранном, удаляем её
    existingFavs = existingFavs.filter((item: string) => item !== selectedPhoto);
    localStorage.setItem("Fav", JSON.stringify(existingFavs));
    setFav(false);
    fetchFav(); 
    closePhoto(); 
  }
};

return (
  <div className="fav-gallery">
    {/* Проверяем, есть ли избранные фотографии */}
    {favs.length === 0 ? (
      <p>Нет избранных фото😕</p> 
    ) : (
      // Отображаем галерею избранных фотографий
      favs.map((photo, index) => (
        <div className="gallery-item" key={index}>
          <img
            src={photo} // URL изображения
            alt={`Избранное фото ${index}`} 
            className="gallery-image" 
            onClick={() => openPhoto(photo)} 
          />
        </div>
      ))
    )}

    {/* Модальное окно для просмотра выбранной фотографии */}
    <Modal photo={selectedPhoto} openPhoto={open} onClose={closePhoto}>
      <div className="modalContent">
        {/* Кнопка для скачивания фотографии */}
        <button className="download-btn" onClick={() => downloadPhoto(selectedPhoto)}>
          Скачать
        </button>
        {/* Иконка избранного, меняется в зависимости от состояния fav */}
        <img
          src={fav ? heartActive : heart}
          onClick={handleSetFav} 
          alt="favorite toggle" 
          style={{ cursor: "pointer" }} 
        />
      </div>
    </Modal>
  </div>
);
};