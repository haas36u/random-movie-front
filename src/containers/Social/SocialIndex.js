import React, { Component } from 'react';
import axios from 'axios';
import { Avatar } from 'react-md';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
    
    render() {

        let avatar = require('../../images/avatar_default.jpg');

        if(!this.state) return <div>Loading...</div>
    
        return (
            <div id="social">
                <div className="container">
                    <div className="social__item userFollow">
                        <h2>Vous suivez...</h2>
                        <div>
                            <i class="fas fa-plus-circle"></i>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>

                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}