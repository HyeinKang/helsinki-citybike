import React from 'react';

type State = {
  className?: string;
  innerHTML: string;
  title: string;
  eventHandler: void;
}

/* Idea from Stack Overflow https://stackoverflow.com/a/51683226  */
const MapboxGLButtonControl: React.FunctionComponent<State> = (props) => {
  return (
    <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
      <button className={`mapboxgl-ctrl-icon ${props.className}`} title={props.title} onClick={()=>{props.eventHandler}}>
        {props.innerHTML || ""}
      </button>
    </div>
  );
}

export default MapboxGLButtonControl;