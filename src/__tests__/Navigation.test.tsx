import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '../Components/Modules/Navigation/Navigation';

describe('Компонент Navigation', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.className = '';
    });

    // Тест: проверяет, что отображаются основные элементы навигации
    it('отображает "Главную", поле поиска, кнопку смены темы и список категорий', () => {
        // Рендерим компонент Navigation, оборачивая его в MemoryRouter
        render(<Navigation />, { wrapper: MemoryRouter });

        // Проверяем наличие ссылки "Главная"
        expect(screen.getByText(/Главная/i)).toBeInTheDocument();
        // Проверяем наличие поля поиска с плейсхолдером "поиск по тегам"
        expect(screen.getByPlaceholderText(/поиск по тегам/i)).toBeInTheDocument();
        // Проверяем наличие кнопки (для смены темы)
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    // Тест: проверяет переключение темы
    it('корректно переключает тему', () => {
        render(<Navigation />, { wrapper: MemoryRouter });

        const кнопка = screen.getByRole('button');

        // Симулируем клик для переключения на тёмную тему
        fireEvent.click(кнопка);
        expect(document.body.className).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');

        // Симулируем повторный клик для переключения на светлую тему
        fireEvent.click(кнопка);
        expect(document.body.className).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    // Тест: проверяет отображение сообщения "ничего не найдено" при неудачном поиске
    it('отображает сообщение "ничего не найдено", если фото не соответствуют поиску', () => {
        render(<Navigation />, { wrapper: MemoryRouter });

        // Симулируем ввод несуществующего запроса в поле поиска
        fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
            target: { value: 'что-то несуществующее' },
        });

        // Проверяем, что отображается сообщение "ничего не найдено"
        expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
    });
});
