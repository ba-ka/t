import { RouteComponentProps } from "react-router-dom";

export interface Prop extends RouteComponentProps {
    checkAuth: any;
}

export interface State {
    username: string;
    password: string;
}