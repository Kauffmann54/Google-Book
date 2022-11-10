import React, { useEffect, useRef } from 'react'
import './Button.css';

export enum ButtonTypes {
    Primary,
    Secondary,
    Tertiary,
}

export enum ButtonTextAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

interface ButtonProps {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    type?: ButtonTypes,
    text: string,
    enabled?: boolean,
    backgroundColor?: string,
    border?: string,
    borderRadius?: string,
    textAlign?: ButtonTextAlign,
    style?: React.CSSProperties,
}

export default function Button(props: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if ((props.enabled == null || props.enabled === true)) {
            props.onClick(e)
        }
    };

    useEffect(() => {
        if (props.borderRadius) {
            if (buttonRef.current) {
                buttonRef.current.style.borderRadius = props.borderRadius;
            }
        }
    }, [props.borderRadius]);

    return (
        <div 
            style={{
                ...props.style,
            }}>
            <button 
            {...(props.enabled === undefined || props.enabled === true) && (props.backgroundColor || props.border) && {style: {
                backgroundColor: props.backgroundColor,
                border: props.border,
            }}}
            className={
                'buttonBackground ' +
                (props.type == null || props.type === ButtonTypes.Primary ? 
                "buttonBackgroundPrimary" + ((props.enabled == null || props.enabled === true) ? ' primaryColor_background' : '-disabled') : 
    
                props.type === ButtonTypes.Secondary ? 
                'buttonBackgroundSecondary' + ((props.enabled == null || props.enabled === true) ? '' : '-disabled') : 
    
                'buttonBackgroundTertiary' + ((props.enabled == null || props.enabled === true) ? '' : '-disabled'))}
             style={{
                    ...props.style,
             }}    
            type='button'
            ref={buttonRef}
            onClick={(e) => onClick(e)}>
                <label 
                    className={props.type == null || props.type === ButtonTypes.Primary ? 
                    "primaryTextDark buttonText buttonText" + ((props.enabled == null || props.enabled === true) ? '-enabled' : '-disabled') : 

                    props.type === ButtonTypes.Secondary ? 
                    'buttonText buttonText' + ((props.enabled == null || props.enabled === true) ? '-enabled primaryColor' : '-disabled secondaryTextLight'): 

                    'buttonText buttonText' + ((props.enabled == null || props.enabled === true) ? '-enabled primaryColor' : '-disabled secondaryTextLight')}
                    style={{textAlign: props.textAlign ? props.textAlign : ButtonTextAlign.Center}}>
                        {props.text}
                </label>
            </button>
        </div>
    )
}
