import React from "react";
import KanbanDetail from "./detail";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kanban";
import { Link, withRouter } from "react-router-dom";
import { getUserId } from '../../lib/auth';

class Kanban extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            kanbanList: []
        };
    }

    componentDidMount() {
        const userId = getUserId();
        fetch(`http://localhost:5000/api/user/${userId}/kanban`)
          .then(async (result) => {
            const data: any = await result.json();
            if (data) {
                const newState = {
                    ...this.state,
                    kanbanList: data
                }

                this.setState(newState);
            }
          });
    };

    render() {
        const listKanban = this.state.kanbanList.map((v) => {
            return (<div className="box" key={v._id}><Link to={`/kanban/${v._id}`}><div className="title">{v.title}</div><div className="description">{v.description.slice(0, 100)}{v.description.length > 100 && '...'}</div></Link></div>)
        });
        return (
            <div>
                <h3>kanban</h3>
                <div className="kanban">
                    {listKanban}
                </div>
            </div>
        )
    }
}

export default withRouter(Kanban);
export { KanbanDetail };