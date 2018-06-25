import React, {Component} from "react";
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component{
    render() {
        return (
            <div className="error-container">
                <h1>404</h1>
                <h2>Page non trouvée</h2>
        
                <p>Nous n'avons pas trouvé la page que vous avez demandé.</p>
                <p><Link to="/">Retour à la page d'accueil</Link></p>
            </div>
        )
    }
 }