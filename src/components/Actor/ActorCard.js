import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'react-md';                                                                              

export default class ActorCard extends Component {

    render() {

        const link = this.props.character.actor.name.replace(/(?:_| |\b)(\w)/g, function($1){return $1.toUpperCase().replace(' ','_');});
    
        return (
            <a href={`https://fr.wikipedia.org/wiki/${link}`} target="_blank">
                <Card className="actor_container cursor">
                    <img src={this.props.character.actor.profile} alt={this.props.character.actor.name} />
                    <CardText>
                        <p className="actor_name">{this.props.character.actor.name}</p>
                        <p className="actor_role">{this.props.character.role}</p>
                    </CardText>
                </Card>
            </a>
        );
    }
}