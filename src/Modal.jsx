import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom'

const Modal = (props) => { // can also do ({ children })
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")
        modalRoot.appendChild(elRef.current);
        return () => { // Cleanup function to remove the element when the component unmounts
            // This ensures that the element is removed from the modal root when the component is unmounted
            modalRoot.removeChild(elRef.current);
        }
    }, []);

    return createPortal(<div>{props.children}</div>, elRef.current) // and here just {children} (Destructuring)
}

export default Modal;