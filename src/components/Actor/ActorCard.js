import React, { Component } from 'react';
import { Card, CardText } from 'react-md';

export default class ActorCard extends Component {

    render() {
    
        return (
            <Card className="actor_container">
                <img src={this.props.actor.img} alt="Acteur deadpool" />
                <CardText>
                    <p className="actor_name">{this.props.actor.name}</p>
                    <p className="actor_role">{this.props.actor.role}</p>
                </CardText>
            </Card>
        );
    }
}