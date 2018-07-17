import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { TextField } from 'react-md';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            error : null
        }
    }

    login = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value.trim();
        const password = e.target.elements.password.value.trim();

        if (username && password) this.props.login({username: username, password: password});
        else this.setState({error: 'Vous n\'avez pas rempli tous les champs'});
    };

    render() {

        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Se connecter</h5>
                  {this.props.error && <p className="error">Mauvais mot de passe / nom d'utilisateur</p>}
                    <form onSubmit={this.login}>
                        <TextField id="username" name="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom" />
                        <TextField id="password" name="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password" />
                        <p className="error">{this.state.error}</p>
                        <div className="mt-3 login-btn">
                            <button className="btn">Connexion</button>
                            <Link to="/registration">Créer un compte</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
 }

const mapDispatchToProps = (dispatch) => ({
    login: ({username, password}) => dispatch(login({username, password}))
});

const mapStateToProps = (state) => {
    return {
        error: state.auth.errorLogin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
