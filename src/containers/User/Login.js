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

    login = () => {
        if (this.state.username && this.state.password) this.props.login({username: this.state.username, password: this.state.password});
        else this.setState({error: 'Vous n\'avez pas rempli tous les champs'});
    };

    handleChangeUsername = (value) => {
        this.setState({username: value});
    }
    handleChangePasssword = (value) => {
        this.setState({password: value});
    }

    render() {
    
        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Se connecter</h5>
                    <TextField id="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom" onChange={this.handleChangeUsername}/>
                    <TextField id="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePasssword}/>
                    <p className="error">{this.state.error}</p>
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

export default connect(undefined, mapDispatchToProps)(Login);