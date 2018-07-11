import React, {Component} from "react";
import { TextField } from 'react-md';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';

class Registration extends Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    register = () => {
        if (this.state.username.length < 4) this.setState({error: 'Le nom d\'utilisteur doit être supérieur à 3 caractères'});
        else if (this.state.password !== this.state.passwordRepeat) this.setState({error: 'Le mot de passe n\'est pas identitque'});
        else if (this.state.email && this.state.username && this.state.password && this.state.passwordRepeat) this.props.register({username: this.state.username, email: this.state.email, password: this.state.password});
        else this.setState({error: 'Vous n\'avez pas rempli tous les champs'});
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
        this.setState({passwordRepeat: value});
        if (this.state.password !== value) this.setState({error: 'Le mot de passe n\'est pas identitque'});
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
                    <p className="error">{this.state.error}</p>
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