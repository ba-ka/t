import React from "react";
import { withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../interface/page/register";

class Register extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event: any) => {
        if (event.target.name === 'username') {
            const newState = {
                ...this.state,
                username: event.target.value
            }
            this.setState(newState);
        } else if (event.target.name === 'password') {
            const newState = {
                ...this.state,
                password: event.target.value
            }
            this.setState(newState);
        }
    }

    handleSubmit = (event: any) => {
        if (!this.state.username || !this.state.password) { alert('username or password cannot be null'); event.preventDefault(); return; }
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(
            async (result) => {
                const data: any = await result.json();
                if (result.status === 200) {
                    this.props.history.push('/login');
                    alert('register success');
                } else {
                    alert(data.error.message);
                }
            }
        )
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h3>register</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="register" />
                </form>
            </div>
        )
    }
}

export default withRouter(Register);