import React, { useState } from 'react';

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`is-open accordion`}>
      <div className="accordion__header" onClick={() => {setIsOpen(!isOpen)}}>
        <div>
          <p>{props.heading}</p>
          <p className="disclaimer">
            {props.disclaimer}
          </p>
        </div>
      </div>
      <div className="accordion__body">
        {props.children}
      </div>
    </div>
  );
}

export default Accordion;