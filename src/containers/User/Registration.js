import React, {Component} from "react";
import { TextField } from 'react-md';

export default class Registration extends Component{
    render() {
    
        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Inscription</h5>
                    <TextField id="email" label="Adresse e-mail" lineDirection="center" className="md-cell--bottom" type="email"/>
                    <TextField id="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom"/>
                    <TextField id="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password"/>
                    <TextField id="repeat-password" label="Répéter le mot de passe" lineDirection="center" className="md-cell--bottom" type="password"/>
                    <div className="mt-3">
                        <span className="btn">Créer un compte</span>
                    </div>
                </div>
            </div>
        )
    }
 }