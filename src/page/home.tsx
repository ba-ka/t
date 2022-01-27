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
                <h3>home</h3>
                <p>tanoshii is core client, tanoshii still in development but you can still use it. if you want to help us develop this client go here <a href="https://github.com/ba-ka/t" target="_blank" rel="noreferrer">tanoshii</a> and <a href="https://github.com/ba-ka/c" target="_blank" rel="noreferrer">core</a></p>
            </div>
        )
    }
}

export default withRouter(Home);