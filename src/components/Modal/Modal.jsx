import React from 'react';
import FocusLock from 'react-focus-lock';
import style from './Modal.module.scss';

export const Modal = ({ children, confirmBtnTxt, confirmBtnHandler, isOpenModal, closeBtnHandler, closeBtnTxt }) => {
  return (
    <div data-testid="modal" className={isOpenModal ? `${style.modal} ${style.modalShow}` : style.modal}>
      <FocusLock>
        <div className={style.modalContainer}>
          {children}
          <div className={style.modalControls}>
            <button type="button" className={style.modalBtn} onClick={confirmBtnHandler}>
              {confirmBtnTxt}
            </button>
            <button type="button" className={style.modalBtn} onClick={closeBtnHandler}>
              {closeBtnTxt}
            </button>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};
