import React, { useState } from 'react';

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'is-open' : ''} accordion`}>
      <div className="accordion__header" onClick={() => {setIsOpen(!isOpen)}}>
        <div>
          <p>{props.heading}</p>
          <p className="disclaimer">
            {props.disclaimer}
          </p>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      </div>
      <div className="accordion__body">
        {props.children}
      </div>
    </div>
  );
}

export default Accordion;