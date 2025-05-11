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

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("Fav") || "[]");
    setFav(storedFavs.includes(selectedPhoto));
  }, [selectedPhoto]);

  const fetchFav = () => {
    const storedFavs = JSON.parse(localStorage.getItem("Fav") || "[]");
    setFavs(storedFavs);
  };

  const openPhoto = (photo: string) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const closePhoto = () => {
    setSelectedPhoto("");
    setOpen(false);
  };

  const downloadPhoto = (photo: string) => {
    const link = document.createElement("a");
    link.href = photo;
    link.download = photo.split("/").pop() || "photo.jpg";
    link.click();
  };

  const handleSetFav = () => {
    let existingFavs = JSON.parse(localStorage.getItem("Fav") || "[]");

    if (!existingFavs.includes(selectedPhoto)) {
      existingFavs.push(selectedPhoto);
      localStorage.setItem("Fav", JSON.stringify(existingFavs));
      setFav(true);
    } else {
      existingFavs = existingFavs.filter((item: string) => item !== selectedPhoto);
      localStorage.setItem("Fav", JSON.stringify(existingFavs));
      setFav(false);
      fetchFav(); // обновим список после удаления
      closePhoto(); // закроем модалку
    }
  };

  return (
    <div className="fav-gallery">
      {favs.length === 0 ? (
        <p>Нет избранных фото😕</p>
      ) : (
        favs.map((photo, index) => (
          <div className="gallery-item" key={index}>
            <img
              src={photo}
              alt={`Избранное фото ${index}`}
              className="gallery-image"
              onClick={() => openPhoto(photo)}
            />
          </div>
        ))
      )}

      {/* Модальное окно */}
      <Modal photo={selectedPhoto} openPhoto={open} onClose={closePhoto}>
        <div className="modalContent">
          <button className="download-btn" onClick={() => downloadPhoto(selectedPhoto)}>
            Скачать
          </button>
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
