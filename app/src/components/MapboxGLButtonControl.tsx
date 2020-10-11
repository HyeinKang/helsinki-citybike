import React from 'react';

/* Idea from Stack Overflow https://stackoverflow.com/a/51683226  */
class MapboxGLButtonControl extends React.Component {
  onAdd(map) {
    this._btn = document.createElement("button");
    this._btn.className = `mapboxgl-ctrl-icon ${this.props.className}`;
    this._btn.type = "button";
    this._btn.innerHTML = this.props.innerHTML || "";
    this._btn.title = this.props.title;
    this._btn.onclick = this.props.eventHandler;

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export default MapboxGLButtonControl;