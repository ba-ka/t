import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';
import { Prop as PropInterface, State as StateInterface } from '../../../interface/page/kanban/detail/board';

class InnerList extends React.Component<PropInterface, {}> {
    shouldComponentUpdate(nextProps: any) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }
    render() {
        return this.props.tasks.map((task: any, index: any) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

let timer: any;

export default class Board extends React.Component<PropInterface, StateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputTask: '',
            inputCode: this.props.board.id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange = (event: any) => {
        this.setState({
            ...this.state,
            inputTask: event.target.value
        });
    }

    onDoubleClick = () => {
        alert('change name');
    }

    onClickHandler = (event: any) => {
        clearTimeout(timer);
        if (event.detail === 1) {
            timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            this.onDoubleClick()
        }
    }

    handleSubmit = (event: any) => {
        if (!this.state.inputTask) { alert('task cannot be null'); event.preventDefault(); return; }
        this.props.addTask(this.state.inputTask, this.state.inputCode);
        this.setState({
            ...this.state,
            inputTask: ''
        });
        event.preventDefault();
    }
    
    render() {
        return (
            <Draggable draggableId={this.props.board.id} index={this.props.index ? this.props.index : 0}>
                {provided => (
                    <div className="board-box" {...provided.draggableProps} ref={provided.innerRef}>
                        <h3 className="title" {...provided.dragHandleProps} onClick={this.onClickHandler}>
                            {this.props.board.title}
                        </h3>
                        <Droppable droppableId={this.props.board.id} type="task">
                            {(provided, snapshot) => (
                                <div className="task-box"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                    <div>
                                        <form onSubmit={this.handleSubmit}>
                                            <label>
                                                add new task:<br/>
                                                <input name="inputTask" value={this.state.inputTask} type="text" onChange={this.handleInputChange} />
                                            </label>
                                            <input type="submit" value="add" />
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        );
    }
}
