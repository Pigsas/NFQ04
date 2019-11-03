import React from 'react';
import Card from './Card';
import Meniu from "./Meniu";
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
class  App extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    //
    // componentDidMount() {
    //     console.log('Mounted');
    // }
    //
    // componentWillUnmount() {
    //     console.log('Unmount')
    // }
    //
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log()
    // }

    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
            toogledGenre: '',
            toogledHeart: [],
        };
    }

    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });
        axios
            .get(endpoints.genres())
            .then((data) => {
                this.setState({
                    genres: data.data.genres,
                });
            });

    }

    getCardsByGenre = (id) => {

        axios
            .get(endpoints.genreMovies((id)))
            .then((data) => {
                this.setState({
                    list:data.data.results
                });
            });
        this.setState({
            toogledGenre: id,
        })
    }

    toogleHeart = (id) => {
        if(this.state.toogledHeart.indexOf(id) === -1)
        {
            let heart = this.state.toogledHeart;
            heart.push(id);
            this.setState({
                toogledHeart: heart
            });
        }
        else{
            this.setState({
                toogledHeart: this.state.toogledHeart.filter(i => i !== id)
            });
        }
        console.log(this.state.toogledHeart.indexOf(id));
    }

    isHeartToogled = (id) => {
        if(this.state.toogledHeart.indexOf(id) === -1)
        {
            return false;
        }
        else{
            return true;
        }
    }


    render() {
        return (
            <div>
                <div>
                    <ul className="meniu">
                        {this.state.genres.map((genre) => (
                            <Meniu
                                key={genre.id}
                                id={genre.id}
                                name={genre.name}
                                onGetGenre={this.getCardsByGenre}
                                toogle={genre.id === this.state.toogledGenre?'toogle':''}
                            />
                        ))}
                    </ul>
                </div>
              {this.state.list.map((card) => (
                  <Card
                      key={card.id}
                      id={card.id}
                      title={card.original_title}
                      backgroundImage={getImageUrl(card.backdrop_path)}
                      data={card.release_date}
                      voteAverage={card.vote_average}
                      voteCount={card.vote_count}
                      description={card.overview}
                      onToogleHeart={this.toogleHeart}
                      heart={this.isHeartToogled(card.id)}
                  />
              ))}
            </div>
        );
    }
}

export default App;