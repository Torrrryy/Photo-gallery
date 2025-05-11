import {  Outlet, useNavigate } from "react-router-dom";
import { Categories, Photos } from "../../../Data/Data";
import { useEffect, useState } from "react";
import "./Navigation.css";

export const Navigation = () => {
    const [category, setCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme;
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
    };

    const handleCategoryClick = (id: number, link: string) => {
        setCategory(id);
        navigate(link);
    };

    const filteredPhotos = Photos.filter(photo =>
        photo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.tags ?? []).some(tag =>
            (tag ?? "").toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <>
            <div className="nav-container">
                <div
                    className="nav-home"
                    onClick={() => {
                        setCategory(null);
                        navigate("/");
                    }}
                >
                    Главная
                </div>

                <input
                    type="text"
                    placeholder="🔍 Поиск по тегам (например: спорткар, природа)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                {Categories.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${category === item.id ? "active" : ""}`}
                        onClick={() => handleCategoryClick(item.id, item.link)}
                    >
                        {item.category}
                    </div>
                ))}

                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
                </button>
            </div>

            {searchQuery && (
                <div className="photo-grid">
                    {filteredPhotos.length > 0 ? (
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

            <Outlet />
        </>
    );
};
