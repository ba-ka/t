import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami";

class Kami extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            loading: true,
            error: false
        };
    }

    componentDidMount () {
        fetch('https://c-datoyacx.vercel.app/api/v1/kami')
          .then((res) => res.json())
          .then((res) => {
            this.setState({
                list: res,
                loading: false,
                error: false
            });
        })
    }

    render() {
        const { list, loading, error } = this.state;
        
        return (
            <div className="kami-list-section">
                <h3>kami :)</h3>
                <Link className="button-main" to="/kami/create">create</Link>
                <Link className="button-main" to="/kami/manage">manage</Link>
                {loading && <div>Loading...</div>}
                <div className="kami-list">
                {!loading && !error && 
                list.row.map((x: any) => (
                    <Link to={`/kami/${x._id}`} key={x._id}>
                        <h4>{x.title}</h4>
                        <p>{x.excerpt}</p>
                    </Link>
                ))}
                </div>
                {error && <div>Error message</div>}
            </div>
        )
    }
}

export default withRouter(Kami);