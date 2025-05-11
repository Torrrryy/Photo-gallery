import { Photos } from '../Data/Data';
import { Home } from '../Pages/Home/Home';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeEach(() => {
    localStorage.clear();
});

test('Страница Home > отображает все изображения из массива Photos', () => {
    render(<Home />);
    Photos.forEach((photo) => {
        const img = screen.getByAltText(`Gallery image ${photo.id}`);
        expect(img).toBeInTheDocument();
    });
});

test('Страница Home > открывает модальное окно при клике на изображение', () => {
    render(<Home />);
    const firstImage = screen.getByAltText('Gallery image 1');
    fireEvent.click(firstImage);

    const modal = screen.getByRole('img', { name: 'preview' });
    expect(modal).toBeInTheDocument();
});



