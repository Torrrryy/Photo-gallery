import { useEffect, useState } from "react";
import { Photos, Photo } from "../../Data/Data"; // Импортируем необходимые данные
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

    const openPhoto = (photo: string) => {
        setSelectedPhoto(photo);
        setOpen(true)
      };

    const closePhoto = () => {
        setSelectedPhoto(""); // Закрыть модальное окно
        setOpen(false)
      };

    const downloadPhoto = (photo: string) => {
        const link = document.createElement("a");
        link.href = photo;
        link.download = photo.split("/").pop() || "dog_photo.jpg";  // Название файла
        link.click();
    };

    const handleSetFav = () => {
        let existingFavs = JSON.parse(localStorage.getItem("Fav") || "[]");
      
        if (!existingFavs.includes(selectedPhoto)) {
          existingFavs.push(selectedPhoto);
          localStorage.setItem("Fav", JSON.stringify(existingFavs));
          setFav(true);
        } else {
          // Удаление из избранного
          existingFavs = existingFavs.filter((item: string) => item !== selectedPhoto);
          localStorage.setItem("Fav", JSON.stringify(existingFavs));
          setFav(false);
        }
      }
        useEffect(() => {
          const favs = JSON.parse(localStorage.getItem("Fav") || "[]");
          setFav(favs.includes(selectedPhoto));
        }, [selectedPhoto]);
        
      ;

    return (
        <div className="gallery-container">
            {/* Галерея: отображаем фото по выбранной категории */}
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

            {/* Модальное окно */}
            <Modal photo={selectedPhoto} openPhoto={open} onClose={closePhoto} >
      <div className="modalContent">
         
          <button className="download-btn" onClick={() => downloadPhoto(selectedPhoto)}>
            Скачать
          </button>
          <img src={fav === true ? heartActive : heart} onClick={handleSetFav} alt="" />
      </div>
  </Modal>
            
        </div>
    );
};
