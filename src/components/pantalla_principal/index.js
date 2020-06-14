import React from 'react';
import './styles.css';

class Aggregate extends React.Component {
    render() {
        return (
            <div className="aggregate">
                <h2 className="aggregate__titulo">Aggregate Number Text</h2>
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
    render() {
        return (
            <div className='contendor'>
                <h1 className="contendor__titulo">Titulo Dentro de pantalla_principal</h1>
                <Aggregate />
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