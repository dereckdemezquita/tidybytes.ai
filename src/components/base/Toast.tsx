import React from 'react';
import { Toaster, ToastProps } from "@blueprintjs/core";

let toaster: Toaster;

export const AppToaster = {
    create: () => {
        toaster = Toaster.create();
    },
    show: (toast: ToastProps) => {
        toaster.show(toast);
    },
};
