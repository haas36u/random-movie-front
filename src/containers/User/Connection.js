import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { TextField } from 'react-md';


import { login } from '../../actions/auth';
import { connect } from 'react-redux';

class Connection extends Component{

    login = () => {
        this.props.login({username: 'junior', password: 'root'});
     };

    render() {
    
        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Se connecter</h5>
                    <TextField id="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom"/>
                    <TextField id="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password"/>
                    <a id="password-forgotten">Mot de passe oublié ?</a>
                    <div className="mt-3 login-btn">
                        <div className="btn" onClick={this.login}>Connexion</div>
                        <Link to="/registration">Créer un compte</Link>
                    </div>
                </div>
            </div>
        )
    }
 }

const mapDispatchToProps = (dispatch) => ({
    login: ({username, password}) => dispatch(login({username, password}))
});

export default connect(undefined, mapDispatchToProps)(Connection);