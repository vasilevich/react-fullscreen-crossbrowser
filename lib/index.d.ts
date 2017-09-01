/// <reference types="react" />
import * as React from 'react';
export declare type IFullScreenProps = {
    onClose?: () => void;
    onOpen?: () => void;
    onChange?: (state: boolean) => void;
    enabled?: boolean;
};
export default class FullScreen extends React.Component<IFullScreenProps, never> {
    static defaultProps: {
        enabled: boolean;
    };
    node: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    handleProps(props: any): void;
    detectFullScreen: () => void;
    enterFullScreen: () => void;
    leaveFullScreen: () => void;
    render(): JSX.Element;
}
