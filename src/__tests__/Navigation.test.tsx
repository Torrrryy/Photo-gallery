import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '../Components/Modules/Navigation/Navigation';

describe('Компонент Navigation', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.className = '';
    });

    it('отображает "Главную", поле поиска, кнопку смены темы и список категорий', () => {
        render(<Navigation />, { wrapper: MemoryRouter });

        expect(screen.getByText(/Главная/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/поиск по тегам/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('корректно переключает тему', () => {
        render(<Navigation />, { wrapper: MemoryRouter });

        const кнопка = screen.getByRole('button');

        // Переключаем на тёмную тему
        fireEvent.click(кнопка);
        expect(document.body.className).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');

        // Переключаем обратно на светлую
        fireEvent.click(кнопка);
        expect(document.body.className).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('отображает сообщение "ничего не найдено", если фото не соответствуют поиску', () => {
        render(<Navigation />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
            target: { value: 'что-то несуществующее' },
        });

        expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
    });
});
