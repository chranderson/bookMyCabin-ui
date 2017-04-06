import React, { Component, PropTypes } from 'react';

// import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import './cabinReviewCard.scss'

import {
  OccupancySelectField,
} from '../../components';

const sortDates = (date1, date2) => new Date(date1).getTime() < new Date(date2).getTime() ? -1 : 1;

// const chipStyle = {
//   margin: 4,
//   fontSize: 10
// };

export default class CabinReviewCard extends Component {

  static propTypes = {
    cabin: PropTypes.object,
    fees: PropTypes.object,
    reservation: PropTypes.object,
    review: PropTypes.bool,
    updateGuestCount: PropTypes.func,
  }

  static defaultProps = {
    fees: {
      base: 0,
      extra: 0,
      total: 0
    },
    review: false
  }

  render() {

    const {
      cabin,
      fees,
      reservation,
      review
    } = this.props;

    const savedDates = reservation.dates.sort(sortDates);
    const lastDate = new Date(savedDates[savedDates.length - 1]);
    const checkoutDate = new Date(lastDate.setDate((lastDate.getDate() + 1))).toLocaleDateString();
    const nightCount = savedDates.length;
    const extraGuests = reservation.guests > 2
                      ? reservation.guests - 2
                      : 0;

    const nightLabel = `Night${nightCount > 1 ? 's' : ''}`;
    const extraGuestLabel = `Extra Guest${extraGuests !== 1 ? 's' : ''}`;
    console.log('cabin: ', cabin);
    const extraFeeMetric = `detailMetric ${extraGuests < 1 ? 'dim' : ''}`;
    const dollarSign = <div className="dollarSign">$</div>;
    return (
      <Paper className="cabinReviewCard" zDepth={1}>

        <div className="cabinReviewHeader">
          <a className="detailTitle"
             href={cabin.url}
             target="_blank"
             title={`Link to ${cabin.name} details`}>
            { cabin.name }
          </a>
          <OccupancySelectField
            defaultValue={reservation.guests}
            id={cabin.id}
            onChange={this.props.updateGuestCount}
            options={cabin.sleeps} />
          <span>{`${fees.total.toFixed(2)}`}</span>
        </div>

        <div ref="baseFee" className="cabinReviewBodyRow">
          <div className="detailWrap">
            <div className="detailMetric">
              {dollarSign}{cabin.price}
            </div>
            <span className="detailLabel">Per Night</span>
          </div>
          <span className="multiplySymbol">x</span>
          <div className="detailWrap">
            <span className="detailMetric">{nightCount}</span>
            <span className="detailLabel">{nightLabel}</span>
          </div>
          <div className="detailTotal">
            <span className="detailMetric">{dollarSign}{(cabin.price * nightCount).toFixed(2)}</span>
            <span className="detailLabel">Base Fee</span>
          </div>
        </div>

        <div ref="extraFee" className="cabinReviewBodyRow">
          <div className="detailWrap">
            <span className={extraFeeMetric}>{dollarSign}25</span>
            <span className="detailLabel">Per Extra Guest</span>
          </div>
          <span className="multiplySymbol">x</span>
          <div className="detailWrap">
            <span className={extraFeeMetric}>{extraGuests}</span>
            <span className="detailLabel">{extraGuestLabel}</span>
          </div>
          <span className="multiplySymbol">x</span>
          <div className="detailWrap">
            <span className={extraFeeMetric}>{nightCount}</span>
            <span className="detailLabel">{nightLabel}</span>
          </div>
          <div className="detailTotal">
            <span className={extraFeeMetric}>{dollarSign}{(fees.extra).toFixed(2)}</span>
            <span className="detailLabel">Extra Guests Fee</span>
          </div>
        </div>
        <div className="savedDates">
          <Subheader>
            {
              !review
              ? `Reserve the Night${savedDates.length > 1 ? 's' : ''} of`
              : 'Selected Dates'
            }
          </Subheader>

          <div className="datesList">
            {
              savedDates.map((date, index) => {

                return (
                  <div className="dateItem" key={index}>
                    <span className="dateItemDate">{date.slice(0, -3)}</span>
                    <span className="dateItemDay">{new Date(date).toDateString().slice(0, 3)}</span>
                  </div>
                );
              })
            }
          </div>
          {
            !review
            ? <div className="cabinHelpText">
                Check Out By <strong>11AM</strong> on the morning of <strong>{checkoutDate}</strong>
              </div>
            : null
          }
        </div>
      </Paper>
    );
  }
}
