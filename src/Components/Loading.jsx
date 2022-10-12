import React from 'react';
import style from './CSS/Loading.module.css';

export default class Loading extends React.Component {
  render() {
    return (
      <div className={ style.loading }>
        <div className={ style.loading__container }>
          <div className={ style.loading__spinner } />
        </div>
      </div>
    );
  }
}
