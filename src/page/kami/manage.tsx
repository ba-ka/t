import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami";
import { getAuth, getUserId } from "../../lib/auth";
import { base_api } from '../../config.json';

class KamiManage extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            loading: true,
            error: false
        };
    }

    componentDidMount () {
        const authcode = getAuth();
        const userid = getUserId();
        fetch(`${base_api}/kami?userid=${userid}&auth=${authcode}`)
          .then((res) => res.json())
          .then((res) => {
            let isEmpty = false;
            if (res.row && res.row.length === 0) {
                isEmpty = true;
            }
            this.setState({
                list: res,
                loading: false,
                error: isEmpty
            });
        })
    }

    render() {
        const { list, loading, error } = this.state;
        
        return (
            <div className="kami-list-section">
                <h3>kami manage</h3>
                <ul className="mini-menu-section">
                    <Link className="button-main" to="/kami/create">create</Link>
                    <Link className="button-main" to="/kami">public kami</Link>
                </ul>
                {loading && <div className="loading-section">loading...</div>}
                <div className="kami-list">
                {!loading && !error && 
                list.row.map((x: any) => (
                    <Link to={`/kami/${x.id}`} key={x.id}>
                        <div className="title">{x.title} <span className="status">{x.status}</span></div>
                        <div className="author">by {x.author.username}, created at {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(x.created_at)}, updated at {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(x.update_at)}</div>
                        <p className="excerpt">{x.excerpt}</p>
                    </Link>
                ))}
                </div>
                {error && <div>you don't have kami, lets go create new one yo!</div>}
            </div>
        )
    }
}

export default withRouter(KamiManage);