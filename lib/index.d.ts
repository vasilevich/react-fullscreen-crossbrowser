import * as React from 'react';
export declare type IFullScreenProps = {
    onClose?: () => void;
    onOpen?: () => void;
    onChange?: (state: boolean) => void;
    enabled?: boolean;
};
export declare const getFullScreenEnabled: () => boolean;
export default class FullScreen extends React.Component<React.PropsWithChildren<IFullScreenProps>, never> {
    static defaultProps: {
        enabled: boolean;
    };
    node: any;
    constructor(props: IFullScreenProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    handleProps(props: IFullScreenProps): void;
    detectFullScreen: () => void;
    enterFullScreen: () => void;
    leaveFullScreen: () => void;
    render(): JSX.Element;
}
