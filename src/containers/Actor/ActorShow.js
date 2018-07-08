import React, { Component } from 'react';
import { Grid, Cell } from 'react-md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';

export default class ActorShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actor : {},
            castings: []
        };
    }

    componentDidMount() {
        this.getActor();
    }

    /*ACTOR*/
    getActor = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/actors/${this.props.match.params.id}`)
        .then((response) => {
            let actor = response.data;
            actor = {
                name: actor.name,
                profile: actor.profile,
                birthday: actor.birthday,
                place_of_birth: actor.place_of_birth,
                deathday: actor.deathday,
                biography: actor.biography,
                also_know_as: actor.also_know_as,
                castings: [
                    {
                        "id": 1,
                        "role": "Trevor Anderson",
                        movie: {
                            "id": 11,
                            "title": "La Guerre des étoiles",
                            "cover": "https://image.tmdb.org/t/p/w500/yVaQ34IvVDAZAWxScNdeIkaepDq.jpg",
                            "releasedAt": "1977-05-25T00:00:00+01:00"
                        }
                    },
                    {
                        "id": 2,
                        "role": "Sean Anderson",
                        movie: {
                            "id": 11,
                            "title": "La Guerre des étoiles",
                            "cover": "https://image.tmdb.org/t/p/w500/yVaQ34IvVDAZAWxScNdeIkaepDq.jpg",
                            "releasedAt": "1977-05-25T00:00:00+01:00"
                        }
                    }
                ]
            };

            if(actor.deathday) actor.deathday = <p><span className="text-bold">Date de décès : </span>{moment(actor.deathday).format("L")}</p>;
            if(actor.place_of_birth) actor.place_of_birth = <p><span className="text-bold">Lieu de naissance : </span>{actor.place_of_birth}</p>;

            if(actor.also_know_as){
                actor.also_know_as.map(function(item, key){
                    return (
                        <li key={key}>{item}</li>
                    )
                });
            }

            let castings = actor.castings.map(function(item, key) {
                return (
                    <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item.movie}/>
                </Cell>
                );
            });

            this.setState({actor: actor});
            this.setState({castings: castings});
        })
        .catch(error => {
            console.log(error)
        });
    }
    
    render() {

        if(!this.state ) return <div>Loading...</div>

        return (
            <div id="actorShow">
                <div id="actor-container">
                    <div className="container">
                        <Grid>
                            <Cell size={4}><img src={this.state.actor.profile} alt={this.state.actor.name}/></Cell>
                            <Cell size={8} id="actor-container_infos">
                                <h1>{this.state.actor.name}</h1>
                                <p><span className="text-bold">Date de naissance : </span>{moment(this.state.actor.birthday).format("L")}</p>
                                {this.state.actor.deathday}
                                {this.state.actor.place_of_birth}
                                <ul>
                                    {this.state.actor.also_know_as}
                                </ul>
                                <h5>Synopsis et détails</h5>
                                <p>{this.state.actor.biography}</p>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <div className="container pb-4 pt-4" id="movies-suggestion-container">
                    <h5 className="pb-1">Ses films</h5>
                    <div className="movies-suggestion--movies">
                        {this.state.castings}
                    </div>
                </div>
            </div>
        );
    }
}