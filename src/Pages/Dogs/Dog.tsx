import { useEffect, useState } from "react";
import { Photos, Photo } from "../../Data/Data"; 
import { Modal } from "../../Components/Layouts/Modal/Modal";
import heart from "../../assets/Img/heart.svg"
import heartActive from "../../assets/Img/heartActive.svg"


export const DogPage = () => {
    // Состояние для выбранной фотографии
    const [selectedPhoto, setSelectedPhoto] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false)
    const [fav, setFav] = useState<boolean>(false)

    // Фильтрация фотографий по категории "Dog"
    const filteredPhotos = Photos.filter((item: Photo) => item.category === 'Dog');

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
      link.download = photo.split("/").pop() || "dog_photo.jpg";
      link.click(); 
  };

  // Функция для добавления/удаления фотографии из избранного
  const handleSetFav = () => {
      let existingFavs = JSON.parse(localStorage.getItem("Fav") || "[]"); // Получаем текущий список избранного из localStorage

      if (!existingFavs.includes(selectedPhoto)) {
          // Если фотография не в избранном, добавляем её
          existingFavs.push(selectedPhoto);
          localStorage.setItem("Fav", JSON.stringify(existingFavs));
          setFav(true);
      } else {
          // Если фотография уже в избранном, удаляем её
          existingFavs = existingFavs.filter((item: string) => item !== selectedPhoto);
          localStorage.setItem("Fav", JSON.stringify(existingFavs));
          setFav(false);
      }
  };

  // Эффект для проверки, находится ли текущая фотография в избранном
  useEffect(() => {
      const favs = JSON.parse(localStorage.getItem("Fav") || "[]"); 
      setFav(favs.includes(selectedPhoto)); 
  }, [selectedPhoto]); 

  return (
      <div className="gallery-container">
          {/* Отображаем галерею фотографий категории "Dog" */}
          {filteredPhotos.map((item: Photo) => (
              <div key={item.id} className="gallery-item">
                  <img
                      src={item.photo} 
                      onClick={() => openPhoto(item.photo)} 
                      alt={item.category} 
                      width={200} 
                  />
              </div>
          ))}

          {/* Модальное окно для просмотра выбранной фотографии */}
          <Modal photo={selectedPhoto} openPhoto={open} onClose={closePhoto}>
              <div className="modalContent">
                  {/* Кнопка для скачивания фотографии */}
                  <button className="download-btn" onClick={() => downloadPhoto(selectedPhoto)}>
                      Скачать
                  </button>
                  {/* Иконка избранного, меняется в зависимости от состояния fav */}
                  <img
                      src={fav === true ? heartActive : heart}
                      onClick={handleSetFav} 
                      alt="" 
                  />
              </div>
          </Modal>
      </div>
  );
};