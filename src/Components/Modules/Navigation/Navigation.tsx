import {  Outlet, useNavigate } from "react-router-dom";
import { Categories, Photos } from "../../../Data/Data";
import { useEffect, useState } from "react";
import "./Navigation.css";

export const Navigation = () => {
    const [category, setCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const navigate = useNavigate();

    // Эффект для загрузки сохраненной темы из localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme); 
            document.body.className = savedTheme; 
        }
    }, []);

    // Функция для переключения темы
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"; 
        setTheme(newTheme); 
        document.body.className = newTheme; 
        localStorage.setItem("theme", newTheme); 
    };

    // Функция для обработки клика по категории
    const handleCategoryClick = (id: number, link: string) => {
        setCategory(id); 
        navigate(link); 
    };

    // Фильтрация фотографий по категории или тегам на основе поискового запроса
    const filteredPhotos = Photos.filter(photo =>
        photo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.tags ?? []).some(tag =>
            (tag ?? "").toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <>
            {/* Навигационное меню */}
            <div className="nav-container">
                {/* Ссылка на главную страницу */}
                <div
                    className="nav-home"
                    onClick={() => {
                        setCategory(null); 
                        navigate("/"); 
                    }}
                >
                    Главная
                </div>

                {/* Поле ввода для поиска по тегам или категориям */}
                <input
                    type="text"
                    placeholder="🔍 Поиск по тегам (например: спорткар, природа)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="search-input"
                />

                {/* Список категорий */}
                {Categories.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${category === item.id ? "active" : ""}`} 
                        onClick={() => handleCategoryClick(item.id, item.link)} 
                    >
                        {item.category}
                    </div>
                ))}

                {/* Кнопка переключения темы */}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
                </button>
            </div>

            {/* Отображение результатов поиска, если есть поисковый запрос */}
            {searchQuery && (
                <div className="photo-grid">
                    {filteredPhotos.length > 0 ? (
                        // Отображаем найденные фотографии
                        filteredPhotos.map((photo) => (
                            <img
                                key={photo.id}
                                src={photo.photo}
                                alt={photo.category}
                                className="photo-item"
                            />
                        ))
                    ) : (
                        <p className="no-results">😞 Ничего не найдено</p>
                    )}
                </div>
            )}

            {/* Место для рендеринга вложенных маршрутов */}
            <Outlet />
        </>
    );
};