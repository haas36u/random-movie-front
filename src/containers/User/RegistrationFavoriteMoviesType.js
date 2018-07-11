import React, {Component} from "react";
import { Grid, Cell, DialogContainer } from 'react-md';
import axios from 'axios';

export default class RegistrationFavoriteMoviesTypes extends Component{

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            favoriteTypes : [],
            types : [],
            noTypesSelectedModalVisible: false
        };
    }

    selectType = (typeId, e) => {
        var typesId = this.state.favoriteTypes;

        if(e.target.parentElement.classList.contains('active')) {
            typesId.splice(typesId.indexOf(typeId, 1));
            this.setState({favoriteTypes: typesId});
            e.target.parentElement.classList.remove('active');
        } else {
            typesId.push(typeId);
            this.setState({favoriteTypes: typesId});
            e.target.parentElement.classList.add('active');
        }
    }

    getGenres = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/genres`)
        .then((response) => {
            let self = this;

            const types = response.data.map(function(item, key){
                return(
                    <Cell size={3} className="p-1 movies_genres_gallery" key={key}>
                        <i className="material-icons">check_circle</i>
                        <p className="likeGenre" onClick={(e) => self.selectType(item.id, e)}>{ item.name }</p>
                    </Cell>
                );
            });

            this.setState({types : types});
        })
        .catch(error => {
            console.log(error)
        });
    }

    componentDidMount() {
       this.getGenres();
    }

    hideModal = () => {
        this.setState({noTypesSelectedModalVisible : false});
    }

    showModal = () => {
        this.setState({noTypesSelectedModalVisible : true});
    }

    finishRegistration = () => {
        window.location.href = '/profile';
    }

    save = () => {
        if(this.state.favoriteTypes.length === 0){
            this.showModal();
            return;
        }
        
        let genresList = this.state.favoriteTypes.map(function(genreId){
           return 'api/genres/' + genreId;
        });

       axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/genres/favorites`, headers: {"Authorization" : localStorage.getItem('token')}, data: {genres: genresList}})
        .then(() => {
           this.finishRegistration();
        })
        .catch(error => {
            console.log(error)
        });
    }

    render() {

        if(!this.state) return <div>Loading...</div>;
    
        return (
            <div className="container">
                <Grid className="registration__selectTypes">
                    <Cell size={4} className="description">
                        <p className="title">Sélectionnez vos genres préférés</p>
                        <p>Cela nous aidera à trouver des films que vous allez adorer !</p>
                        <div className="btn" onClick={this.save}>Continuer</div>
                    </Cell>
                    <Cell size={8}>
                        <Grid>
                            {this.state.types}
                        </Grid>
                    </Cell>

                    <DialogContainer id="no-types-selected" visible={this.state.noTypesSelectedModalVisible} onHide={this.hideModal} title="Etez-vous sur?" focusOnMount={false}>
                        <p>Vous n'avez pas sélectionnez de genre, êtez-vous sûr de vouloir continuer ?</p>
                        <div className="text-center">
                            <div className="btn mr-1" onClick={this.hideModal}>Non</div>
                            <div className="btn" onClick={this.finishRegistration}>Oui</div>
                        </div>
                    </DialogContainer>
                </Grid>
            </div>
        )
    }
}