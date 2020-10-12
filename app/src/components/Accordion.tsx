import React, { FunctionComponent, useState } from 'react';

type props = {
  heading: string;
  disclaimer: string;
}

const Accordion:FunctionComponent<props> = (props) => {
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