import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Prop as PropInterface } from '../../../interface/page/kanban/detail/task';

let timer: any;

export default class Task extends React.Component<PropInterface, {}> {
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

    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div className="task-detail"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        aria-roledescription="Press space bar to lift the task"
                        onClick={this.onClickHandler}
                    >
                        {this.props.task.content}
                    </div>
                )}
            </Draggable>
        );
    }
}
