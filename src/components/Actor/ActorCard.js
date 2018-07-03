import React, { Component } from 'react';
import { Card, CardText } from 'react-md';

export default class ActorCard extends Component {

    render() {
    
        return (
            <Card className="actor_container">
                <img src={this.props.character.actor.profile} alt={this.props.character.actor.name} />
                <CardText>
                    <p className="actor_name">{this.props.character.actor.name}</p>
                    <p className="actor_role">{this.props.character.role}</p>
                </CardText>
            </Card>
        );
    }
}