import { ReactNode } from "react";

interface IAlertWrapperProps {
    children: ReactNode;
    className ?: string;
}

export const AlertWrapper = ({ children, className }: IAlertWrapperProps) => {
    const alertStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top : 0,
        left : 0,
        right : 0,
        bottom : 0,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    }

    const alertBox = {
        backgroundColor: "#fff",
        padding: '10px',
        borderRadius: '10px',
        zIndex : 100,
        maxWidth : '80%',
        overflow : 'scroll',
        minHeight : '300px',
    }
    return (
        <div style={{position : 'absolute', ...alertStyle}} >
            <div style={alertBox} >
                {children}
            </div>
        </div>
    );
}