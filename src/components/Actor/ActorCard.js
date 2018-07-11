import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'react-md';                                                                              

export default class ActorCard extends Component {

    render() {
    
        return (
            <Link to={`/actors/${this.props.character.id}`}>
                <Card className="actor_container cursor">
                    <img src={this.props.character.actor.profile} alt={this.props.character.actor.name} />
                    <CardText>
                        <p className="actor_name">{this.props.character.actor.name}</p>
                        <p className="actor_role">{this.props.character.role}</p>
                    </CardText>
                </Card>
            </Link>
        );
    }
}