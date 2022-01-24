import { RouteComponentProps } from "react-router-dom";

export interface Prop extends RouteComponentProps {
}

export interface State {
    list?: any;
    loading?: boolean;
    error?: boolean;
}