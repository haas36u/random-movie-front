import React, {Component} from "react";
import { TextField } from 'react-md';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Registration extends Component{

    constructor(props){
        super(props);
        this.state = {
            cgu: false
        }
    }

    register = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value.trim();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value.trim();

        if (!this.state.cgu) this.setState({error: 'Vous devez accepter les Conditions Générales d\'Utilisation du site'});
        else if (username.length < 4) this.setState({error: 'Le nom d\'utilisateur doit être supérieur à 3 caractères'});
        else if (password !== this.state.passwordRepeat) this.setState({error: 'Le mot de passe n\'est pas identique'});
        else if (email && username && password && this.state.passwordRepeat) this.props.register({username: username, email: email, password: password});
        else this.setState({error: 'Vous n\'avez pas rempli tous les champs'});
    };

    handleChangePassword = (value) => {
        this.setState({password: value});
    }

    handleChangePasswordRepeat = (value) => {
        this.setState({passwordRepeat: value});
        if (this.state.password !== value) this.setState({error: 'Le mot de passe n\'est pas identique'});
        else this.setState({error : null});
    }

    handleChangeCgu = (e) => {
        this.setState({cgu: e.target.checked});
    }

    render() {

        return (
            <div id="registration-login">
                <div className="registration-login_container-box">
                    <h5>Inscription</h5>
                    <form onSubmit={this.register}>
                        <TextField id="email" name="email" label="Adresse e-mail" lineDirection="center" className="md-cell--bottom" type="email"/>
                        <TextField id="username" name="username" label="Nom d'utilisateur" lineDirection="center" className="md-cell--bottom"/>
                        <TextField id="password" name="password" label="Mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePassword}/>
                        <TextField id="repeat-password" name="repeat-password" label="Répéter le mot de passe" lineDirection="center" className="md-cell--bottom" type="password" onChange={this.handleChangePasswordRepeat}/>
                        <p className="error">{this.state.error}</p>
                        {this.props.error && this.props.error.map((current, loop) => <p className="error" key={loop}>{current.message}</p>)}

                        <input type="checkbox" name="cgu" id="cgu" onChange={this.handleChangeCgu}/><label htmlFor="cgu" className="cursor cgu">J'accepte les <Link to="/cgu">Conditions Générales d'Utilisation</Link> du site Random Movie</label>
                        <div className="mt-3">
                            <button className="btn">Créer un compte</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: ({username, email, password}) => dispatch(register({username, email, password}))
});

const mapStateToProps = (state) => {
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
