import { useEffect, useState } from "react";
import { Photos, Photo } from "../../Data/Data"; // Импортируем массив фотографий и интерфейс Photo
import { Modal } from "../../Components/Layouts/Modal/Modal";
import heart from "../../assets/Img/heart.svg"
import heartActive from "../../assets/Img/heartActive.svg"


export const Home = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  const [fav, setFav] = useState<boolean>(false)
  const openPhoto = (photo: string) => {
    setSelectedPhoto(photo);
    setOpen(true)
  };

  const closePhoto = () => {
    setSelectedPhoto(""); // Закрыть модальное окно
    setOpen(false)
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
  };
  
  const downloadPhoto = (photo: string) => {
    const link = document.createElement("a");
    link.href = photo;
    link.download = photo.split("/").pop() || "photo.jpg"; // Скачать фотографию
    link.click();
  };

  
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("Fav") || "[]");
    setFav(favs.includes(selectedPhoto));
  }, [selectedPhoto]);
  

  return (
    <div className="gallery-container">
      {/* Перебор всех фотографий */}
      {Photos.map((item: Photo) => (
        <div key={item.id} className="gallery-item" onClick={() => openPhoto(item.photo)}>
          <img src={item.photo} alt={`Gallery image ${item.id}`} className="gallery-image" />
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
