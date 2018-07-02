import React, {Component} from "react";
import { TextField } from 'react-md';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';

class Registration extends Component{

    register = () => {
        this.props.register({username: this.state.username, email: this.state.email, password: this.state.password});
    };

    handleChangeEmail = (value) => {
        this.setState({email: value});
    }
    handleChangeUsername = (value) => {
        this.setState({username: value});
    }
    handleChangePassword = (value) => {
        this.setState({password: value});
    }
    handleChangePasswordRepeat = (value) => {
        if(this.state.password === value) console.log('not the same password');
    }

    render() {
    
        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Inscription</h5>
                    <TextField id="email" label="Adresse e-mail" lineDirection="center" className="md-cell--bottom" type="email" onChange={this.handleChangeEmail}/>
                    <TextField id="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom" onChange={this.handleChangeUsername}/>
                    <TextField id="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePassword}/>
                    <TextField id="repeat-password" label="Répéter le mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePasswordRepeat}/>
                    <div className="mt-3">
                        <span className="btn" onClick={this.register}>Créer un compte</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: ({username, email, password}) => dispatch(register({username, email, password}))
});

export default connect(undefined, mapDispatchToProps)(Registration);