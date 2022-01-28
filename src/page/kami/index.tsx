import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami";
import { base_api } from '../../config.json';
import { isAuth } from '../../lib/auth';

class Kami extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            loading: true,
            error: false
        };
    }

    componentDidMount () {
        fetch(`${base_api}/kami`)
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
                <h3>kami</h3>
                {isAuth() &&
                <ul className="mini-menu-section">
                    <Link className="button-main" to="/kami/create">create</Link>
                    <Link className="button-main" to="/kami/manage">my kami</Link>
                </ul>
                }
                {loading && <div className="loading-section">loading...</div>}
                <div className="kami-list">
                {!loading && !error && 
                list.row.map((x: any) => (
                    <Link to={`/kami/${x.id}`} key={x.id}>
                        <div className="title">{x.title}</div>
                        <div className="author">by {x.author.username}</div>
                        <p className="excerpt">{x.excerpt}</p>
                    </Link>
                ))}
                </div>
                {error && <div>Error message</div>}
            </div>
        )
    }
}

export default withRouter(Kami);