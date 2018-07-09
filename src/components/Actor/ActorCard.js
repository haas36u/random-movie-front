import React, { Component } from 'react';
import { Card, CardText } from 'react-md';                                                                              

export default class ActorCard extends Component {

    render() {

        const actorLink = () => {
            window.location.href = '/actors/' + this.props.character.id;
        }
    
        return (
            <Card className="actor_container cursor" onClick={actorLink}>
                <img src={this.props.character.actor.profile} alt={this.props.character.actor.name} />
                <CardText>
                    <p className="actor_name">{this.props.character.actor.name}</p>
                    <p className="actor_role">{this.props.character.role}</p>
                </CardText>
            </Card>
        );
    }
}