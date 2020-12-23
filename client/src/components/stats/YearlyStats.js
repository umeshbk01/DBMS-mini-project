import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { yearlyExpense } from '../../actions/expense';
import Spinner from '../layout/Spinner';
import {VictoryTheme, VictoryAxis, VictoryBar, VictoryChart} from 'victory';



const YearlyStats = ({ yearlyExpense, expense: { year, loading } }) => {
    
    useEffect(()=>{
        yearlyExpense();
    }, [yearlyExpense]);

    const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        loading || year === null ? (<Spinner />) : (
        <div>
            <Typography variant="h5" className="title2">Your Annual Expenditure</Typography>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={250}
                width={450}>
                <VictoryAxis/>
                <VictoryBar
                    categories={{
                        x: monthStrings
                    }}
                    style={{ data: { fill: "#69f0ae", width: 15 }, labels: {fontSize: 10, fill: "#01579b", width: 10} }}
                    data={year.monthExp}
                    x={monthStrings['x']}
                    domain={{x: [0, 13]}}
                    labels={({ datum }) => `₹${datum.y}`}
                />
          </VictoryChart>

        </div>
    ))
}

YearlyStats.propTypes = {
yearlyExpense: PropTypes.func.isRequired,
expense: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
expense: state.expense
});

export default connect(mapStateToProps, {yearlyExpense})(YearlyStats);
