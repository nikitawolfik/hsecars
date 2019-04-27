import React from 'react';

import {
  carToClass,
  datasetnew,
} from 'assets/constants';

const Plots = () => {

  const volumes = (datasetnew.filter(el => el.segment === 'c').filter(el => el.Volume === '3.0'));
  console.log(volumes)

  return (
    <div>
      Plots
      <pre>
        hello
      </pre>
    </div>
  );
};

export default Plots;
