import React, {Component} from "react";
import { Grid, Cell } from 'react-md';

export default class Footer extends Component{
    render() {
    
        return (
            <footer className="page-footer">
                <div className="container">
                    <Grid className="grid-example">
                    <Cell size={2}>
                        <h6 className="white-text"><a href="">A propos</a></h6>
                    </Cell>
                    <Cell size={2}>
                        <h6 className="white-text"><a href="">Contact</a></h6>
                    </Cell>
                    <Cell size={2}>
                        <h6 className="white-text"><a href="">Conditions d'utilisation</a></h6>
                    </Cell>
                    <Cell size={2}>
                        <h6 className="white-text"><a href="">Conditions d'utilisation</a></h6>
                    </Cell>
                    <Cell size={2}>
                        <h6 className="white-text"><a href="">Mentions légales</a></h6>
                    </Cell>
                    </Grid>
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