import React, {Component} from "react";
import { Grid, Cell, TextField } from 'react-md';

export default class UserLoginFavoriteMovies extends Component{

    render() {
    
        return (
            <div className="container mt-4 registration__select-movie">
                <Grid>
                    <Cell size={4} className="description">
                        <h3>Bonjour USERNAME</h3>
                        <p>Sélectionnez les titres que vous avez aimés</p>
                        <p>Cela nous aidera à trouver des films que vous allez adorer !</p>
                        <div className="btn">Continuer</div>
                    </Cell>
        
                    <Cell size={8} className="m-0">
                        <Grid className="p-0">
                            <Cell className="p-1 movies_gallery">
                                <i className="material-icons">check_circle</i>
                                <img src="https://vignette.wikia.nocookie.net/batman/images/b/bb/TDKR_Batman_poster-1.jpg/revision/latest?cb=20120523032614" alt="Poster" className="likeMovie" data-movieId=""/>
                            </Cell>
                        </Grid>
                    </Cell>
                </Grid>
            </div>
        )
    }
}