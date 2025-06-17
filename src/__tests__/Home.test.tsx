import { Photos } from '../Data/Data';
import { Home } from '../Pages/Home/Home';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Очистка localStorage перед каждым тестом для чистого состояния
beforeEach(() => {
    localStorage.clear();
});

// проверяет, что все изображения из массива Photos отображаются на странице
test('Страница Home > отображает все изображения из массива Photos', () => {
    // Рендерим компонент Home
    render(<Home />);
    Photos.forEach((photo) => {
        const img = screen.getByAltText(`Gallery image ${photo.id}`);
        // Проверяем, что изображение присутствует в DOM
        expect(img).toBeInTheDocument();
    });
});

// проверяет, что при клике на изображение открывается модальное окно
test('Страница Home > открывает модальное окно при клике на изображение', () => {
    // Рендерим компонент Home
    render(<Home />);
    const firstImage = screen.getByAltText('Gallery image 1');
    // Симулируем клик по изображению
    fireEvent.click(firstImage);
    const modal = screen.getByRole('img', { name: 'preview' });
    // Проверяем, что модальное окно отображается в DOM
    expect(modal).toBeInTheDocument();
});


