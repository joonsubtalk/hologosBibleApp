import React, {Component} from 'react';
import {differenceInHours, format} from 'date-fns';
import Loader from '../Loader/Loader';
import { connect } from 'react-redux';
import _ from 'lodash';
import {SIMPLE_BIBLE} from '../../configs/constants';
import * as actions from '../../actions';

class Group extends Component {

  render() {
    const {title, report} = this.props;
    return (
      <div className="group">
        <div className="group__container">
          <div className="group__content">
            { report &&
              report.map((blurb) => {
                var result = format(
                  new Date(blurb.timestamp),
                  'MM/DD/YYYY'
                )

                return <div key={blurb.timestamp} className="group__card">
              {result} read {SIMPLE_BIBLE.meta[blurb.bid].book} {blurb.chapter}
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}


// const mapStateToProps = ({ auth, profile, group }) => {
//   return {
//     auth,
//     profile,
//     group,
//   };
// };

export default connect(null, actions)(Group);
