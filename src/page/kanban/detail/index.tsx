import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Prop as PropInterface, State as StateInterface, InnertList as InnerListInterface } from '../../../interface/page/kanban/detail';
import Board from './board';
import { withRouter } from "react-router-dom";
import { getAuth } from '../../../lib/auth';

class InnerList extends React.PureComponent<InnerListInterface> {
    render() {
        const { board, taskMap, index, addTask } = this.props;
        const tasks = board.task.map((taskId: string) => taskMap[taskId]);
        return <Board board={board} tasks={tasks} index={index} addTask={addTask} />;
    }
}

class KanbanDetail extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        const params: any = this.props.match.params;
        this.state = {
            boardOrder: [],
            board: [],
            task: [],
            inputGroup: '',
            kanbanId: params.kanbanId,
            kanbanTitle: '',
            kanbanDescription: ''
        };
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/kanban/${this.state.kanbanId}?auth=${getAuth()}`)
          .then(async (result) => {
            const data: any = await result.json();
            if (data) {
                const boardOrder = [];
                const board = [];
                const task = [];
                for (let i = 0; i < data.board.length; i++) {
                    boardOrder.push(data.board[i].id);
                }
                for (let i = 0; i < data.board.length; i++) {
                    const taskData = [];
                    for (let i2 = 0; i2 < data.board[i].task.length; i2++) {
                        taskData.push(data.board[i].task[i2].id);
                        task[data.board[i].task[i2].id] = data.board[i].task[i2];
                    }
                    board[data.board[i].id] = { 
                        id: data.board[i].id,
                        title: data.board[i].title,
                        task: taskData
                    };
                }
                const newState = {
                    ...this.state,
                    boardOrder: boardOrder,
                    board: board,
                    task: task,
                    kanbanTitle: data.title,
                    kanbanDescription: data.description
                }

                this.setState(newState);
            }
          });
    };

    onDragStart = (start: any, provided: any) => {
        const message = `You have lifted the task in position ${start.source.index + 1}`;
        provided.announce(message);
    };

    onDragUpdate = (update: any, provided: any) => {
        const message = update.destination
            ? `You have moved the task to position ${update.destination.index + 1}`
            : `You are currently not over a droppable area`;

        provided.announce(message);
    };

    onDragEnd = (result: any, provided: any) => {
        const message = result.destination
            ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
            : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

        provided.announce(message);

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'board') {
            const newBoardOrder = Array.from(this.state.boardOrder);
            newBoardOrder.splice(source.index, 1);
            newBoardOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                boardOrder: newBoardOrder,
            };

            console.log(newState);
            this.setState(newState);
            return;
        }

        const home = this.state.board[source.droppableId];
        const foreign = this.state.board[destination.droppableId];

        if (home === foreign) {
            const newtask = Array.from(home.task);
            newtask.splice(source.index, 1);
            newtask.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                task: newtask,
            };

            const newState = {
                ...this.state,
                board: {
                    ...this.state.board,
                    [newHome.id]: newHome,
                },
            };
            console.log(newState);
            this.setState(newState);
            return;
        }

        // moving from one list to another
        const hometask = Array.from(home.task);
        hometask.splice(source.index, 1);
        const newHome = {
            ...home,
            task: hometask,
        };

        const foreigntask = Array.from(foreign.task);
        foreigntask.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...foreign,
            task: foreigntask,
        };

        const newState = {
            ...this.state,
            board: {
                ...this.state.board,
                [newHome.id]: newHome,
                [newForeign.id]: newForeign,
            },
        };
        console.log(newState);
        this.setState(newState);
    };

    handleChange = (event: any) => {
        const newState = {
            ...this.state,
            inputGroup: event.target.value
        }
        this.setState(newState);
    }

    handleSubmit = (event: any) => {
        if (!this.state.inputGroup) { alert('name cannot be null'); event.preventDefault(); return; }
        const data = {
            auth: getAuth(),
            title: this.state.inputGroup
        }
        fetch(`http://localhost:5000/api/kanban/${this.state.kanbanId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(
            async (result) => {
                const data: any = await result.json();
                if (result.status === 200) {
                    const newBoardOrder = Array.from(this.state.boardOrder);
                    const newName = data.board_id;
                    newBoardOrder.push(newName);
                    const inputGroup = this.state.inputGroup;
                    const newState = {
                        ...this.state,
                        board: {
                            ...this.state.board,
                            [newName]: {
                                id: newName,
                                title: inputGroup,
                                task: []
                            },
                        },
                        boardOrder: newBoardOrder,
                        inputGroup: ''
                    };

                    this.setState(newState)
                } else {
                    alert(data.error.message);
                }
            }
        )

        event.preventDefault();
    }

    addTask = (taskName: string, boardId: string) => {
        const data = {
            auth: getAuth(),
            content: taskName
        }
        fetch(`http://localhost:5000/api/kanban/${this.state.kanbanId}/${boardId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(
            async (result) => {
                const data: any = await result.json();
                if (result.status === 200) {
                    const home = this.state.board[boardId];

                    const newtask = Array.from(home.task);
                    const generateId = data.task_id;
                    newtask.push(generateId);

                    const newHome = {
                        ...home,
                        task: newtask,
                    };

                    const newState = {
                        ...this.state,
                        board: {
                            ...this.state.board,
                            [newHome.id]: newHome,
                        },
                        task: {
                            ...this.state.task,
                            [generateId]: {
                                id: generateId,
                                content: taskName
                            }
                        }
                    };
                    
                    this.setState(newState);
                } else {
                    alert(data.error.message);
                }
            }
        )
    }

    render() {
        return (
            <div>
                <h3>kanban - {this.state.kanbanTitle}</h3>
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable
                        droppableId="all-board"
                        direction="horizontal"
                        type="board"
                    >
                        {provided => (
                            <div className="kanban-detail"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.state.boardOrder.map((boardId: string, index: number) => {
                                    const board = this.state.board[boardId];
                                    return (
                                        <InnerList
                                            key={board.id}
                                            board={board}
                                            taskMap={this.state.task}
                                            index={index}
                                            addTask={this.addTask}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                                <div className="board-box">
                                    <h3 className="title">
                                            add new list:
                                    </h3>
                                    <div className="task-box">
                                        <form onSubmit={this.handleSubmit}>
                                            <input type="text" value={this.state.inputGroup} onChange={this.handleChange} />
                                            <input type="submit" value="Add" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default withRouter(KanbanDetail);