import React, { useEffect } from "react";

const Modal = (props) => {

  return (
    <>
    { props.show 
        ?   
            <div className="modal">
                <div className="modal__content">
                    <div className="modal__header">
                        <h4 className="modal__title">{props.title}</h4>
                    </div>
                    <div className="modal__body">
                        <button className="button__yes modal__button" onClick={() => {props.deleteElement(props.id); props.setShow(false); document.body.style.overflow='scroll'}}>Да</button>
                        <button className="button__no modal__button" onClick={props.onClose}>Нет</button>
                    </div>
                </div>
            </div>
            
        : null }
    </>
  );
};

export default Modal;
