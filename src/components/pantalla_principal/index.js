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

class PlayListCounter extends React.Component {
    render() {
        return (
            <div className="playlistcounter">
                <h2 className="playlistcounter__titulo">{this.props.playlists.length} playlists</h2>
            </div>
        );
    }
}

class HoursCounter extends React.Component {
    render() {
        /* 
           sobre función reduce
           https://www.youtube.com/watch?v=Wl98eZpkp-c
        */
        let allSongs = this.props.playlists.reduce( 
            (songs, eachPlayList) => {
                return songs.concat(eachPlayList.songs)
            }, []);
        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return (Math.round((sum + eachSong.duration) / 60))
        }, []);
        return (
            <div className="hourcounter">
                <h2 className="hourcounter__titulo">{totalDuration} hours</h2>
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
                <h3 className="playlist__titulo">{ this.props.playlist.name }</h3>
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
    /*
    componentDidMount() {
        this.setState({serverData: fakeServerData });
    }
    */
    
    componentDidMount() {
        setTimeout(() => {
          this.setState({
            serverData: fakeServerData,
          });
        }, 1000);
    }


    render() {
        let playListElements = []
        if (this.state.serverData.user) {
            for (let i = 0; i < this.state.serverData.user.playlists.length; i++) {
                let playlist = this.state.serverData.user.playlists[i]
                playListElements.push(<Playlist playlist={playlist} />)
            }
        }

        return (
            <div className='contendor'>
                {this.state.serverData.user ?
                    <div>
                        <h1 className="contendor__titulo">{this.state.serverData.user.name}'s PlayList</h1>
                        <PlayListCounter playlists={this.state.serverData.user.playlists} />
                        <HoursCounter playlists={this.state.serverData.user.playlists} />
                        <Filter />
                        {playListElements}
                    </div>
                    :
                    <h1 className="contendor__titulo">Loading...</h1>
                }
            </div>
        );
    }
}

export default  PantallaPrincipal;