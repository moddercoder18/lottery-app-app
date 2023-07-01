import * as React from 'react';
import {
    createNavigationContainerRef,
    DrawerActions,
    StackActions,
} from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export function navigate(
    name,
    params,
) {
    navigationRef?.navigate(name, params);
}

export function replace(
    name,
    params,
) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function reset(
    name,
    params,
) {
    navigationRef.current?.reset(name, params);
}
export function push(name, params) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function toggleDrawer() {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
export function closeDrawer() {
    navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

export function goBack() {
    navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
export function popToTop() {
    navigationRef.current?.dispatch(StackActions.popToTop());
}
