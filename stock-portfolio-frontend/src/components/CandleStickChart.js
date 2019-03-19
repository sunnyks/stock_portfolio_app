
import React from "react";
// import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { connect } from 'react-redux'

class CandleStickChart extends React.Component {
	render() {
		// const { type, width, data, ratio } = this.props;
    let data = this.props.data
    data = data.map(d => {
      let date = d.date + 'T05:00:00.000Z'
      d.date = new Date(date)
      return d
    })
    const ratio = 1
    const width = 1000
    const type = "hybrid"

    const last = (d) => d.slice(-1)[0]
		const xAccessor = d => d.date;
    // debugger
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[0])
		];
		return (
			<ChartCanvas height={400}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					xScale={scaleTime()}
					xExtents={xExtents}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={9} />
					<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
				</Chart>
			</ChartCanvas>
		);
	}
}

const mapStateToProps = state => {
  return { API: state.API}
           // data: state.detail.timeseries}
}

// CandleStickChart.propTypes = {
// 	data: PropTypes.array.isRequired,
// 	width: PropTypes.number.isRequired,
// 	ratio: PropTypes.number.isRequired,
// 	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

CandleStickChart.defaultProps = {
	type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

export default connect(mapStateToProps, null)(CandleStickChart);
