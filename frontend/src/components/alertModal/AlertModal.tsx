import React, { useEffect, useRef, useState } from 'react';
import './AlertModal.css';
import { IconType } from 'react-icons';
import { ErrorResponseModel } from '../../backend/models/Error/ErrorResponseModel';
import { BiError, BiLockAlt, BiBlock } from 'react-icons/bi';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { FiUserX } from 'react-icons/fi';

export enum AlertModalTypes {
    Success,
    Error,
    Warning,
}

interface AlertModalProps {
    title?: string;
    message?: string;
    modalType?: AlertModalTypes;
    icon?: IconType;
    button1Text?: string;
    button2Text?: string;
    button1Click?: () => void;
    button2Click?: () => void;
    show?: boolean;
    error?: ErrorResponseModel;
}

export default function AlertModal(props: AlertModalProps) {
    const alertModalBackground = useRef<HTMLDivElement>(null);
    const alertModalContent = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState<string>(props.title || '');
    const [message, setMessage] = useState<string>(props.message || '');
    const [button1Text, setButton1Text] = useState<string>(props.button1Text || '');
    const [button2Text, setButton2Text] = useState<string | undefined>(props.button2Text);
    const [modalType, setModalType] = useState<AlertModalTypes>(props.modalType || AlertModalTypes.Success);
    var [oldStateShow, setOldStateShow] = useState<boolean>(false);

    useEffect(() => {
        if (props.title) {
            setTitle(props.title);
        }
        if (props.message) {
            setMessage(props.message);
        }
    }, [props.title, props.message]);

    const getIcon = () => {
        if (React.isValidElement(props.icon)) {
            return React.cloneElement(props.icon, { className: 'alert-modal-icon' });
        } else if (props.icon) {
            return React.createElement(props.icon, { className: 'alert-modal-icon' });
        } else {
            if (props.error && props.error.messages) {
                const text = props.error.messages.length > 0 ? props.error.messages[0].toLowerCase() : '';
                if (text.includes("email") || text.includes("e-mail")) {
                    return <MdOutlineMarkEmailUnread className="alert-modal-icon" />
                } else if (text.includes("senha")) {
                    return <BiLockAlt className="alert-modal-icon" />
                } else if (text.includes("bloqueado") || text.includes("desativado")) {
                    return <BiBlock className="alert-modal-icon" />
                } else if (text.includes("usuário não encontrado")) {
                    return <FiUserX className="alert-modal-icon" />
                } else {
                    return <BiError className="alert-modal-icon" />
                }
            } else {
                return <BiError className="alert-modal-icon" />
            }
        }
    };

    const getModalBackgroundColor = () => {
        switch (modalType) {
            case AlertModalTypes.Success:
                return 'alert-modal-container-success';

            case AlertModalTypes.Error:
                return 'alert-modal-container-error';

            case AlertModalTypes.Warning:
                return 'alert-modal-container-warning';

            default:
                return 'alert-modal-container-success';
        }
    };

    useEffect(() => {
        if (oldStateShow !== props.show) {
            setOldStateShow(props.show || false);
            if (props.show) {
                if (alertModalBackground.current) {
                    alertModalBackground.current.style.display = "flex";
                    alertModalBackground.current.classList.add("alert-modal-background-active");
                    alertModalBackground.current.classList.remove("alert-modal-background-disabled");
                }
        
                if (alertModalContent.current) {
                    alertModalContent.current.classList.add("alert-modal-content-active");
                    alertModalContent.current.classList.remove("alert-modal-content-disabled");
                }
            } else {
                if (alertModalBackground.current) {
                    alertModalBackground.current.classList.add("alert-modal-background-disabled");
                    alertModalBackground.current.classList.remove("alert-modal-background-active");
                
                    setTimeout(() => {
                        if (alertModalBackground.current) {
                            alertModalBackground.current.style.display = "none";
                        }
                    }, 500);
                }
        
                if (alertModalContent.current) {
                    alertModalContent.current.classList.add("alert-modal-content-disabled");
                    alertModalContent.current.classList.remove("alert-modal-content-active");
                }
            }

            if (props.error && props.error.messages) {
                if (props.error.messages.length > 1) {
                    setTitle(props.error.messages[0]);
                    setMessage(props.error.messages[1]);
                } else {
                    setMessage(props.error.messages[0]);
                }

                setButton1Text('OK');
                setButton2Text(undefined);
                setModalType(AlertModalTypes.Error);
            }
        }
    }, [props.show, props.error, oldStateShow]);

  return (
    <div ref={alertModalBackground} className="alert-modal-background">
        <div className={`alert-modal-container ${getModalBackgroundColor()}`}>
            <div ref={alertModalContent} className="alert-modal-content">
                <div className="alert-modal-content-data">
                    <div className="alert-modal-icon-div">
                        {getIcon()}
                    </div>
                    <label className="title1Bold primaryTextDark alert-modal-title">{title}</label>
                    <label className="subtitle1 primaryTextDark alert-modal-message">{message}</label>
                </div>

                <div className="alert-modal-button-div">
                    <div 
                        className="alert-modal-button-div-left"
                        onClick={props.button1Click}
                        >
                        <label className="buttonText primaryTextLight alert-modal-button-label">
                            {button1Text}
                        </label>
                    </div>
                    {button2Text &&
                        <div className='alert-modal-button-div-secondary'>
                            <div className="alert-modal-button-divider" />
                            <div 
                                className="alert-modal-button-div-right"
                                onClick={props.button2Click}
                                >
                                <label className="buttonText primaryTextLight alert-modal-button-label">
                                    {button2Text}
                                </label>
                            </div>
                        </div>
                    }
                </div>
                   
            </div>
        </div>
    </div>
  )
}
