import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '../Components/Layouts/Modal/Modal';

describe('Компонент Modal', () => {
  const mockOnClose = vi.fn();
  const testPhoto = 'test-photo.jpg';

  it('отображается, когда openPhoto равно true', () => {
    render(
        <Modal photo={testPhoto} openPhoto={true} onClose={mockOnClose}>
          <div>Тестовый контент</div>
        </Modal>
    );

    expect(screen.getByAltText('preview')).toBeInTheDocument();
    expect(screen.getByText('Тестовый контент')).toBeInTheDocument();
  });

  it('не отображается, когда openPhoto равно false', () => {
    render(
        <Modal photo={testPhoto} openPhoto={false} onClose={mockOnClose}>
          <div>Тестовый контент</div>
        </Modal>
    );

    expect(screen.queryByAltText('preview')).not.toBeInTheDocument();
    expect(screen.queryByText('Тестовый контент')).not.toBeInTheDocument();
  });

  it('вызывает onClose при нажатии на кнопку закрытия', () => {
    render(
        <Modal photo={testPhoto} openPhoto={true} onClose={mockOnClose}>
          <div>Тестовый контент</div>
        </Modal>
    );

    fireEvent.click(screen.getByText('x'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('переключает зум по двойному клику на изображении', () => {
    render(
        <Modal photo={testPhoto} openPhoto={true} onClose={mockOnClose}>
          <div>Тестовый контент</div>
        </Modal>
    );

    const image = screen.getByAltText('preview');
    expect(image).not.toHaveClass('zoomed');

    fireEvent.doubleClick(image, { clientX: 100, clientY: 100 });
    expect(image).toHaveClass('zoomed');

    fireEvent.doubleClick(image, { clientX: 100, clientY: 100 });
    expect(image).not.toHaveClass('zoomed');
  });

  it('отображает изображение с правильными атрибутами', () => {
    render(
        <Modal photo={testPhoto} openPhoto={true} onClose={mockOnClose}>
          <div>Тестовый контент</div>
        </Modal>
    );

    const image = screen.getByAltText('preview');
    expect(image).toHaveAttribute('src', testPhoto);
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '500');
  });
});
