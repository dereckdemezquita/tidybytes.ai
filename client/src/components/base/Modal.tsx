import React from 'react';
import { Dialog, DialogProps } from "@blueprintjs/core";

interface Props extends DialogProps { }

export const Modal: React.FC<Props> = ({ children, ...props }) => {
    return <Dialog {...props}>{children}</Dialog>;
};
