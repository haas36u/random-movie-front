import React, {Component} from "react";
import { Grid, Cell, DialogContainer } from 'react-md';
import axios from 'axios';

export default class RegistrationFavoriteMovies extends Component{

    constructor(props) {
        super(props);
        this.state = {
            favoriteMovies : [],
            notMoviesSelectedModalVisible: false
        };
    }

    selectMovie = (movieId, e) => {
        var moviesId = this.state.favoriteMovies;

        if(e.target.parentElement.classList.contains('active')) {
            moviesId.splice(moviesId.indexOf(movieId, 1));
            this.setState({favoriteMovies: moviesId});
            e.target.parentElement.classList.remove('active');
        } else {
            moviesId.push(movieId);
            this.setState({favoriteMovies: moviesId});
            e.target.parentElement.classList.add('active');
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/populars`)
        .then((response) => {
            let self = this;

            const moviesList = response.data.map(function(item){
                return(
                    <Cell className="p-1 movies_gallery" key={item.id}>
                        <i className="material-icons">check_circle</i>
                        <img src={item.cover} alt={item.cover} onClick={(e) => self.selectMovie(item.id, e)}/>
                    </Cell>
                );
            });

            this.setState({moviesPopularList : moviesList});
        })
        .catch(error => {
            console.log(error)
        });
    }


    hideMoviesSelectedModal = () => {
        this.setState({notMoviesSelectedModalVisible : false});
    }

    showMoviesSelectedModal = () => {
        this.setState({notMoviesSelectedModalVisible : true});
    }

    continueRegistrationFlow = () => {
        window.location.href = '/registration/select-movies-types';
    }

    save = () => {
        if(this.state.favoriteMovies.length === 0){
            this.showMoviesSelectedModal();
            return;
        }
        
        let moviesList = this.state.favoriteMovies.map(function(movieId){
           return 'api/movies/' + movieId;
        });

       axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/movies/favorites`, headers: {"Authorization" : localStorage.getItem('token')}, data: {movies: moviesList}})
        .then(() => {
           this.continueRegistrationFlow();
        })
        .catch(error => {
            console.log(error)
        });
    }

    render() {

        if(!this.state) return <div>Loading...</div>;
    
        return (
            <div className="container mt-4 registration__selectMovies">
                <Grid>
                    <Cell size={4} className="description">
                        <h3>Bonjour USERNAME</h3>
                        <p>Sélectionnez les titres que vous avez aimés</p>
                        <p>Cela nous aidera à trouver des films que vous allez adorer !</p>
                        <div className="btn" onClick={this.save}>Continuer</div>
                    </Cell>
        
                    <Cell size={8} className="m-0">
                        <Grid className="p-0">
                            {this.state.moviesPopularList}
                        </Grid>
                    </Cell>
                </Grid>
                <DialogContainer id="no-movies-selected" visible={this.state.notMoviesSelectedModalVisible} onHide={this.hideMoviesSelectedModal} title="Etez-vous sur?" focusOnMount={false}>
                    <p>Vous n'avez pas sélectionnez de film, êtez-vous sûr de vouloir continuer ?</p>
                    <div className="text-center">
                        <div className="btn mr-1" onClick={this.hideMoviesSelectedModal}>Non</div>
                        <div className="btn" onClick={this.continueRegistrationFlow}>Oui</div>
                    </div>
                </DialogContainer>
            </div>
        )
    }
}