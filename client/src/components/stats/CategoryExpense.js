import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { categoryExpense } from '../../actions/expense';
import Spinner from '../layout/Spinner';
import {VictoryTheme, VictoryPie, VictoryLabel} from 'victory';


const CategoryExpense = ({ categoryExpense, expense: { ecategory, loading } }) => {
    
    useEffect(()=>{
        categoryExpense();
    }, [categoryExpense]);

    
    return (
        loading || ecategory === null ? (<Spinner />) : (
            <div>
            <Typography variant="h5" className="title2">Your Annual Expense By Category</Typography>
                <div style={{width: 550, margin: 'auto'}}>
                <svg viewBox="0 0 320 320">
                
            <VictoryPie standalone={false} data={ecategory.categoryExp} innerRadius={50} theme={VictoryTheme.material} 
                labelRadius={({ innerRadius }) => innerRadius + 14 }
                labelComponent={<VictoryLabel angle={0} style={[{
                    fontSize: '11px',
                    fill: '#0f0f0f'
                },
                {
                    fontSize: '10px',
                    fill: '#013157'
                }]} text={( {datum} ) => `${datum.x}\n ₹${datum.y}`}/>}
                 />
                 <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={175} y={170}
          text={`Expense \nBy category`}
        />
        </svg>
                 </div>
        
                
        </div>
    ))
}

CategoryExpense.propTypes = {
categoryExpense: PropTypes.func.isRequired,
expense: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
expense: state.expense
});

export default connect(mapStateToProps, {categoryExpense})(CategoryExpense);
