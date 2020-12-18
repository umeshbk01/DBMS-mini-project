import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getExpenses } from '../../actions/expense';
import ExpenseUpdate from './ExpenseUpdate';

const Expenses = ({ getExpenses, expense: { expenses }}) => {
    useEffect(() => {
        getExpenses();
    }, [getExpenses]);
    
    return (
        <div>
        {expenses.map((exp, index) => {
            return <span key={index}>
            <ExpansionPanel className='epanel'>
                    <ExpansionPanelSummary expandIcon={<Edit />}>
                        <div className="einfo">
                        <Typography className="eamount">₹ {exp.amount}</Typography><Divider style={{marginTop: 4, marginBottom: 4}}/>
                        <Typography>
                                {exp.category}
                            </Typography>
                            <Typography>
                                { new Date(exp.createdAt).toLocaleDateString()}
                            </Typography>
                        </div>
                            
                            <div>
                            <Typography className='eheading'>{exp.category}</Typography>
                                <Typography className='ecomment'>
                                    {exp.comment}
                                </Typography>
                            </div>
                    </ExpansionPanelSummary>
            
            <Divider />
            <ExpansionPanelDetails style={{display: 'block'}}>
                <ExpenseUpdate key={exp._id} expense={exp} />
            </ExpansionPanelDetails>
            </ExpansionPanel>
            </span>
        })}
        </div>
    )
            
}

Expenses.propTypes = {
getExpenses: PropTypes.func.isRequired,
expense: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    expense: state.expense
});

export default connect(mapStateToProps, { getExpenses })(Expenses);
