import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami/view";
import ReactMarkdown from "react-markdown";
import { getUserId, getAuth } from '../../lib/auth';

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
        fetch(`https://c-datoyacx.vercel.app/api/v1/kami?id=${this.state.kamiId}&auth=${authcode}`)
          .then((res) => res.json())
          .then((res) => {
            this.setState({
                title: res.title,
                excerpt: res.excerpt,
                content: res.content,
                status: res.status,
                author: res.author.id,
                loading: false,
                error: false
            });
        })
    }

    render() {
        const { loading, error } = this.state;
        return (
            <div className="kami-list-section">
                {loading && <div>Loading...</div>}
                {this.state.author == getUserId() &&
                    <Link className="button-main" to={`/kami/${this.state.kamiId}/edit`}>edit</Link>
                }
                {!loading && !error && 
                <div className="kami-list">
                <h3>{this.state.title || 'no title'}</h3>
                <ReactMarkdown>
                    {this.state.content || 'no content'}
                </ReactMarkdown>
                </div>
                }
                {error && <div>Error message</div>}
            </div>
        )
    }
}

export default withRouter(KamiView);