import React from "react";
import { withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../interface/page/home";

class Home extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>home :)</h3>
            </div>
        )
    }
}

export default withRouter(Home);