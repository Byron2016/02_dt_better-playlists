import React from 'react';
import './styles.css';

let fakeServerData = {
    user: {
      name: "acuario2020",
      playlists: [
        {
          name: "My favorites",
          songs: [
            { name: "Beat It", duration: 1345 },
            { name: "Cannelloni Makaroni", duration: 1236 },
            { name: "Rosa helikopter", duration: 70000 },
          ]
        },
  
        {
          name: "Discover Weekly",
          songs: [
            { name: "Beat It", duration: 1345 },
            { name: "Cannelloni Makaroni", duration: 1236 },
            { name: "Rosa helikopter", duration: 70000 },
          ]
        },
  
        {
          name: "Another playlist - the best!",
          songs: [
            { name: "Beat It", duration: 1345 },
            { name: "Cannelloni Makaroni", duration: 1236 },
            { name: "Rosa helikopter", duration: 70000 },
          ]
        },
  
        {
          name: "Playlist - yeah!",
          songs: [
            { name: "Beat It", duration: 1345 },
            { name: "Cannelloni Makaroni", duration: 1236 },
            { name: "Rosa helikopter", duration: 70000 },
          ]
        },
      ],
    },
  };

class Aggregate extends React.Component {
    render() {
        return (
            <div className="aggregate">
                <h2 className="aggregate__titulo">{this.props.playlists && this.props.playlists.length}</h2>
            </div>
        );
    }
}

class Filter extends React.Component {
    render() {
        return (
            <div className="filter">
                <img />
                <input type='text' />
            </div>
        );
    }
}

class Playlist extends React.Component {
    render() {
        return (
            <div className="playlist">
                <img />
                <h3 className="playlist__titulo">Playlist Name</h3>
                <ul>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ul>
            </div>
        );
    }
}

class PantallaPrincipal extends React.Component {

    constructor() {
        super();
        this.state = {
          serverData: {},
          filterString: "",
        };
    }

    componentDidMount() {
        this.setState({serverData: fakeServerData });
    }
    
    /*
    componentDidMount() {
        setTimeout(() => {
          this.setState({
            serverData: fakeServerData,
          });
        }, 1000);
    }
    */

    render() {
        return (
            <div className='contendor'>
                <h1 className="contendor__titulo">{
                    this.state.serverData.user &&
                    this.state.serverData.user.name}'s PlayList
                </h1>
                <Aggregate playlists={
                    this.state.serverData.user &&
                    this.state.serverData.user.playlists} />
                <Aggregate />
                <Filter />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
            </div>
        );
    }
}

export default  PantallaPrincipal;