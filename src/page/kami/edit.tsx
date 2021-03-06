import React from "react";
import { withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami/view";
import ReactMarkdown from "react-markdown";
import { getAuth } from '../../lib/auth';
import { base_api } from '../../config.json';

class KamiEdit extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        const params: any = this.props.match.params;
        this.state = {
            loading: true,
            error: false,
            kamiId: params.kamiId
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: { target: { value: any; type: string; name: string; checked?: any; }; }) { 
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({ [name]: value });
    }

    handleSubmit(event: { preventDefault: () => void; }) {
        const authcode = getAuth();
        
        if (!this.state.content || !this.state.title || !this.state.excerpt || !this.state.status) { alert('title, status, excerpt or content cannot be null'); event.preventDefault(); return; }
        const data = {
            title: this.state.title,
            content: this.state.content,
            excerpt: this.state.excerpt,
            status: this.state.status,
            id: this.state.kamiId,
            auth: authcode
        }
        fetch(`${base_api}/kami`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(
            async (result) => {
                const data: any = await result.json();
                console.log(data);
                if (result.status === 200) {
                    alert('kami updated');
                } else {
                    alert(data.error.message);
                }
            }
        )
        event.preventDefault();
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
                this.setState({
                    title: res.title,
                    excerpt: res.excerpt,
                    content: res.content,
                    status: res.status,
                    loading: false,
                    error: false
                });
            }
        })
    }

    render() {
        const { loading, error } = this.state;
        return (
            <div className="kami-create-section">
                {loading && <div className="loading-section">loading...</div>}
                {!loading && !error &&
                <div className="editor">
                    <h3>kami editor</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            title:
                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                        </label>
                        <label>
                            status:
                            <select name="status" value={this.state.status} onChange={this.handleChange}>
                                <option value="public">public</option>
                                <option value="profile">only on profile</option>
                                <option value="unlist">unlist</option>
                                <option value="private">private</option>
                            </select>
                        </label>
                        <label>
                            excerpt:
                            <textarea className="excerpt" name="excerpt" value={this.state.excerpt} onChange={this.handleChange} />
                        </label>
                        <label>
                            content:
                            <textarea className="content" name="content" value={this.state.content} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="edit" />
                    </form>
                </div>
                }
                {!loading && !error &&
                <div className="preview">
                    <h3>{this.state.title || 'no title'}</h3>
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

export default withRouter(KamiEdit);