import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami/view";
import ReactMarkdown from "react-markdown";
import { getUserId, getAuth } from '../../lib/auth';
import { base_api } from '../../config.json';

class KamiView extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        const params: any = this.props.match.params;
        this.state = {
            loading: true,
            error: false,
            kamiId: params.kamiId
        };
    }

    componentDidMount () {
        const authcode = getAuth();
        fetch(`${base_api}/kami?id=${this.state.kamiId}&auth=${authcode}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: true
                })
            } else {
                console.log(res.author);
                this.setState({
                    ...this.state,
                    title: res.title,
                    excerpt: res.excerpt,
                    content: res.content,
                    status: res.status,
                    author: res.author,
                    create_at: res.create_at,
                    update_at: res.update_at,
                    loading: false,
                    error: false
                });
            }
        })
    }

    render() {
        const { loading, error } = this.state;
        
        return (
            <div className="kami-view-section">
                {loading && <div className="loading-section">loading...</div>}
                {!loading && !error && this.state.author.id === getUserId() &&
                    <Link className="button-main" to={`/kami/${this.state.kamiId}/edit`}>edit</Link>
                }
                {!loading && !error && 
                <div className="kami-list">
                <h3>{this.state.title || 'no title'}</h3>
                <div className="author">by {this.state.author.username}, created at {new Date(this.state.create_at!).toLocaleString("en-US", { timeZone: 'UTC' })}, updated at {new Date(this.state.update_at!).toLocaleString("en-US", { timeZone: 'UTC' })}</div>
                <ReactMarkdown>
                    {this.state.content || 'no content'}
                </ReactMarkdown>
                </div>
                }
                {error && <div className="loading-section">kami not found</div>}
            </div>
        )
    }
}

export default withRouter(KamiView);