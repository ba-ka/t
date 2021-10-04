import { RouteComponentProps } from "react-router-dom";

export interface Prop extends RouteComponentProps {
}

export interface State {
    task: any;
    board: any;
    boardOrder: any;
    inputGroup: string;
    kanbanId: string;
    kanbanTitle: string;
    kanbanDescription: string;
}

export interface InnertList {
    board: any;
    taskMap: any;
    index: number;
    addTask: any;
}