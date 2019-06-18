import React from 'react';
import CSB from '../../img/csb.svg';
import ESV from '../../img/esv.svg';
import NKJV from '../../img/nkjv.svg';
import KJV from '../../img/kjv.svg';
import NASB from '../../img/nasb.svg';
import NIV from '../../img/niv.svg';
import NLT from '../../img/nlt.svg';

const Tribe = ({versions, selectedVersion, clickHandler}) => {
  return (
    <div className="setup__selection">
      <div className="setup__header">Select your Version</div>
      <div className="setup__subheader">Join a community and beat the other tribes!</div>
      {
        versions.map(version => {
          let uri = '';
          switch (version.initials) {
            case 'CSB':
              uri = CSB;
              break;
            case 'ESV':
              uri = ESV;
              break;
            case 'NKJV':
              uri = NKJV;
              break;
            case 'KJV':
              uri = KJV;
              break;
            case 'NASB':
              uri = NASB;
              break;
            case 'NIV':
              uri = NIV;
              break;
            case 'NLT':
              uri = NLT;
              break;
            default:
              uri = '#';
          }
          const modifiedClassName = selectedVersion === version.initials
            ? 'setup__version setup__version--active'
            : 'setup__version'
          return <div className={modifiedClassName}
            onClick={clickHandler}
            data-version={version.initials}
            key={version.initials}>
            <div className="setup__graphic">
              <img className="setup__logo" src={uri} alt={version.title} />
            </div>
            <div className="setup__label">
              <div className="setup__initials">{version.initials}</div>
              <div className="setup__title">{version.title}</div>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Tribe
