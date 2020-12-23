import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { monthPreview } from '../../actions/expense';
import Spinner from '../layout/Spinner'


const ExpenseOverview = ({ monthPreview, expense: { month, loading } }) => {
    
    useEffect(()=>{
        monthPreview();
    }, [monthPreview]);

    
    return (
        loading || month === null ? (<Spinner />) : (
            <div className="OVERtab">   
        <Card className="class">
            
            <Typography variant="h4" className="title2" color="textPrimary" style={{textAlign: 'center'}}>Overview</Typography>
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Typography variant="h3" className="totalSpent" color="primary">${month.month ? month.month.totalSpent : '0' } <span className="day">This month</span> </Typography>
                <div style={{ margin: '20px 20px 20px 30px' }}>
                    <Typography variant="h5" className="spent" color="primary">${month.today ? month.today.totalSpent : '0'} <span className="day">today</span> </Typography>
                    <p></p>
                    <Link to="/expenses/all"><Typography variant="h7">See more</Typography> </Link>
                </div>
            </div>
            
            <Divider />
        </Card>
        </div>
    ))
}

ExpenseOverview.propTypes = {
monthPreview: PropTypes.func.isRequired,
expense: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
expense: state.expense
});

export default connect(mapStateToProps, {monthPreview})(ExpenseOverview)