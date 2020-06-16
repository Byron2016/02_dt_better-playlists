import React from "react";
import "./styles.css";
import queryString from "query-string";

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
        ],
      },

      {
        name: "Discover Weekly",
        songs: [
          { name: "Imagine", duration: 1345 },
          { name: "Cannelloni Makaroni", duration: 1236 },
          { name: "Rosa helikopter", duration: 70000 },
        ],
      },

      {
        name: "Another playlist - the best!",
        songs: [
          { name: "Beat It", duration: 1345 },
          { name: "Hallelujah", duration: 1236 },
          { name: "Rosa helikopter", duration: 70000 },
        ],
      },

      {
        name: "Playlist!",
        songs: [
          { name: "Beat It", duration: 1345 },
          { name: "Cannelloni Makaroni", duration: 1236 },
        ],
      },
    ],
  },
};

class PlayListCounter extends React.Component {
  render() {
    return (
      <div className="playlistcounter">
        <h2 className="playlistcounter__titulo">
          {this.props.playlists.length} playlists
        </h2>
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
    let allSongs = this.props.playlists.reduce((songs, eachPlayList) => {
      return songs.concat(eachPlayList.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      console.log(sum + " + " + eachSong.duration);

      return sum + eachSong.duration;
    }, 0);
    return (
      <div className="hourcounter">
        <h2 className="hourcounter__titulo">
          {Math.round(totalDuration / 60)} hours
        </h2>
      </div>
    );
  }
}

class Filter extends React.Component {
  render() {
    return (
      <div className="filter">
        <img />
        <input
          type="text"
          onKeyUp={(event) => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends React.Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div className="playlist">
        <img src={playlist.imageUrl} className="playlistcounter__imagesUrl" />
        <h3 className="playlist__titulo">{playlist.name}</h3>
        <ul>
          {playlist.songs.map((song) => (
            <li>{song.name}</li>
          ))}
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
    /*
        setTimeout(() => {
          this.setState({
            serverData: fakeServerData,
          });
        }, 1000);
        */

    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    /*
    //Desplegar en pantalla lo que se tiene
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    */

    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          user: {
            name: data.display_name,
          },
        })
      );

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          playlists: data.items.map((item) => {
            console.log(data.items);
            return {
              name: item.name,
              //imageUrl: item.images.find((image) => image.width == 640).url,
              imageUrl: item.images[0].url,
              songs: [],
            };
          }),
        })
      );
  }

  render() {
    let playlistToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter((playlist) =>
            playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];
    /*
    return (
      <div className="contendor">
        {this.state.user ? (
          <div>
            <h1 className="contendor__titulo">
              {this.state.user.name}'s PlayList
            </h1>
            <PlayListCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={(text) => {
                // console.log(text);
                this.setState({ filterString: text });
              }}
            />
            {playlistToRender.map((playlist) => (
              <Playlist playlist={playlist} />
            ))}
          </div>
        ) : (
          <div>
            <h1 className="contendor__titulo">Loading...</h1>
            <button
                className="contenedor__boton"
                onClick={() => {
                  window.location = window.location.href.include('localhost')
                    ? "http://localhost:8888/login"
                    : "https://dt-better-playlists-02.herokuapp.com/"
                }}
            >
              Sign in with Spotify
            </button>
          </div>
        );
      </div>
    );
    */
    return (
      <div className="contendor">
        {this.state.user ? (
          <div>
            <h1 className="contendor__titulo">
              {this.state.user.name}'s PlayList
            </h1>
            <PlayListCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter
              onTextChange={(text) => {
                // console.log(text);
                this.setState({ filterString: text });
              }}
            />
            {playlistToRender.map((playlist) => (
              <Playlist playlist={playlist} />
            ))}
          </div>
        ) : (
          <div>
            <h1 className="contendor__titulo">Loading...</h1>
            <button
              className="contenedor__boton"
              onClick={() => {
                window.location = window.location.href.includes("localhost")
                  ? "http://localhost:8888/login"
                  : "https://dt-better-playlists-02.herokuapp.com/";
              }}
            >
              Sign in with Spotify
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PantallaPrincipal;
