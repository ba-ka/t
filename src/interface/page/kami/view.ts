import { RouteComponentProps } from "react-router-dom";

export interface Prop extends RouteComponentProps {
}

export interface State {
    title?: string;
    status?: string;
    excerpt?: string;
    content?: string;
    kamiId?: string;
    loading?: boolean;
    error?: boolean;
    author?: any;
    create_at?: number;
    update_at?: number;
}