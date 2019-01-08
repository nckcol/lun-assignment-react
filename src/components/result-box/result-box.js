import React, {Component} from 'react';
import './result-box.scss';

class ResultBox extends Component {
  state = {};
  render() {
    const {firstName, email, city, country, social, confirmation} = this.props;
    return (
      <div className="ResultBox">
        <div className="ResultBox-infoColumn">
          <div className="ResultBox-personal">
            <h2 className="ResultBox-name">{firstName}</h2>
            <div className="ResultBox-email">{email}</div>
          </div>
          <div className="ResultBox-location">
            <span className="ResultBox-city">{city}</span>,{' '}
            <span className="ResultBox-country">{country}</span>
          </div>
          <div className="ResultBox-social">
            {social.facebook && (
              <div className="ResultBox-socialItem">
                <span className="ResultBox-socialItemTitle">Facebook:</span>{' '}
                <a href={social.facebook} className="ResultBox-socialItemLink">
                  {social.facebook}
                </a>
              </div>
            )}
            {social.vk && (
              <div className="ResultBox-socialItem">
                <span className="ResultBox-socialItemTitle">Вконтакте:</span>{' '}
                <a href={social.vk} className="ResultBox-socialItemLink">
                  {social.vk}
                </a>
              </div>
            )}
            {social.twitter && (
              <div className="ResultBox-socialItem">
                <span className="ResultBox-socialItemTitle">Twitter:</span>{' '}
                <a href={social.twitter} className="ResultBox-socialItemLink">
                  {social.twitter}
                </a>
              </div>
            )}
            {social.odnoklassniki && (
              <div className="ResultBox-socialItem">
                <span className="ResultBox-socialItemTitle">
                  Одноклассники:
                </span>{' '}
                <a
                  href={social.odnoklassniki}
                  className="ResultBox-socialItemLink"
                >
                  {social.odnoklassniki}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="ResultBox-imageColumn">
          <div className="ResultBox-imageHolder">
            <img
              className="ResultBox-image"
              src={confirmation.animal.normal}
              srcSet={`${confirmation.animal.double} 2x`}
              alt={confirmation.animal.alt}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ResultBox;
