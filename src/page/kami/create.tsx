import React from "react";
import { withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami/create";
import ReactMarkdown from "react-markdown";
import { getAuth } from '../../lib/auth';
import { base_api } from '../../config.json';

class KamiCreate extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            status: 'public'
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
            auth: authcode
        }
        fetch(`${base_api}/kami`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(
            async (result) => {
                const data: any = await result.json();
                console.log(data);
                if (result.status === 200) {
                    alert('kami created');
                } else {
                    alert(data.error.message);
                }
            }
        )
        event.preventDefault();
    }

    render() {
        return (
            <div className="kami-create-section">
                <div className="editor">
                    <h3>kami create</h3>
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
                        <input type="submit" value="create" />
                    </form>
                </div>
                <div className="preview">
                    <h3>{this.state.title || 'no title'}</h3>
                    <ReactMarkdown>
                        {this.state.content || 'no content'}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }
}

export default withRouter(KamiCreate);