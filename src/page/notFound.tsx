import React from "react";
import { withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../interface/page/home";

class NotFound extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>404 not found</h3>
            </div>
        )
    }
}

export default withRouter(NotFound);