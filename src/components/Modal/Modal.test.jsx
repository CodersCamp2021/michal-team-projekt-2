import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('should be render', () => {
    const closeBtnHandler = jest.fn();
    const confirmBtnHandler = jest.fn();
    render(
      <Modal
        isOpenModal={true}
        confirmBtnTxt="Button 1"
        closeBtnTxt="Close"
        confirmBtnHandler={confirmBtnHandler}
        closeBtnHandler={closeBtnHandler}
      >
        Test
      </Modal>,
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /button 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(closeBtnHandler).toBeCalledTimes(1);
    userEvent.click(screen.getByRole('button', { name: /button 1/i }));
    expect(confirmBtnHandler).toBeCalledTimes(1);
  });
});
