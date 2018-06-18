import React, {Component} from "react";

export default class Footer extends Component{
    render() {
    
        return (
            <footer className="page-footer">
                <div className="container">
                        <h6 className="white-text"><a href="">A propos</a></h6>
                        <h6 className="white-text"><a href="">Contact</a></h6>
                        <h6 className="white-text"><a href="">Conditions d'utilisation</a></h6>
                        <h6 className="white-text"><a href="">Mentions légales</a></h6>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2018 Random Movie. All rights reserved.
                    </div>
                </div>
            </footer>
        )
    }
 }