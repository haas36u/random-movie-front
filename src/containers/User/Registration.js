import React, {Component} from "react";
import { TextField } from 'react-md';

export default class Registration extends Component{

    register = () => {
        console.log('register')
    };

    handleChangeUsername(value) {
        this.setState({username: value});
    }
    handleChangePasssword(value) {
        this.setState({password: value});
    }
    handleChangePassswordRepeat(value) {
        if(this.state.password === value) console.log('not the same password');
    }

    render() {
    
        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Inscription</h5>
                    <TextField id="email" label="Adresse e-mail" lineDirection="center" className="md-cell--bottom" type="email"/>
                    <TextField id="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom" onChange={this.handleChangeUsername.bind(this)}/>
                    <TextField id="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePasssword.bind(this)}/>
                    <TextField id="repeat-password" label="Répéter le mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePassswordRepeat.bind(this)}/>
                    <div className="mt-3">
                        <span className="btn" onClick="register">Créer un compte</span>
                    </div>
                </div>
            </div>
        )
    }
 }