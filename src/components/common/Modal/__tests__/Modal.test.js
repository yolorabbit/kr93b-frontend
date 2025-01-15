import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../index';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockContent = 'Test Modal Content';
  
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  const renderModal = async (props) => {
    const utils = render(
      <Modal {...props}>
        <div>{mockContent}</div>
      </Modal>
    );
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
    
    return utils;
  };

  it('should not render when isOpen is false', async () => {
    await renderModal({ isOpen: false, onClose: mockOnClose });
    expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
  });

  it('should render content when isOpen is true', async () => {
    await renderModal({ isOpen: true, onClose: mockOnClose });
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button', async () => {
    const user = userEvent.setup();
    await renderModal({ isOpen: true, onClose: mockOnClose });
    
    await user.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 