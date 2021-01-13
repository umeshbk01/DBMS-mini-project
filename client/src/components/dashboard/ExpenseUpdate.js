import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import { updateExpense, deleteTransaction } from '../../actions/expense';



let date = new Date();

const initialState = {
    _id:'',
    category: '',
    amount: '',
    comment: '',
    createdAt: date.getTime()
};

const ExpenseUpdate = ({
    updateExpense,
    deleteTransaction,
    auth,
    expense,
}) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(()=>{
        const profileData = { ...initialState };
        profileData._id = expense._id
        profileData.category = expense.category;
        profileData.amount = expense.amount;
        profileData.comment = expense.comment;

        setFormData(profileData)
    },[]);

    const {
       // _id,
        category,
        amount,
        comment,
        createdAt
    } = formData;
    const onChange = e => 
            setFormData({...formData, [e.target.name]: e.target.value });
    
            const onSubmit = e => {
               // e.preventDefault();
                updateExpense(formData._id, formData);
                
            };

    return (
        <Fragment>
            {!auth.loading && expense.user === auth.user._id && 
            ( <div>
            <form onSubmit={onSubmit}>
              <div>
              <select name="category" value={category} onChange={onChange}>
                          <option>Please select the type of your expense</option>
                          <option value="Food">Food</option>
                          <option value="Loan/Emi">Loan or EMI</option>
                          <option value="Travel">Travel</option>
                          <option value="Investment">Investment</option>
                          <option value="Bills & Utilities">Bills & Utilities</option>
                          <option value="Others">Others</option>
                      </select>
                <br/>
                <TextField label="Amount" className={'textField'} name="amount" value={amount} onChange={onChange} margin="normal" type="number"/>
              </div>
              <input
            type="date"
            name="createdAt"
            value={createdAt}
            onChange={onChange}
          />
          <br/>
              <textarea 
                        placeholder="Comment"
                        name="comment"
                        value={comment}
                        onChange={onChange}
                    />
                    <br/>
              <input type="submit" className="btn btn-primary my-1" />
              {!auth.loading && expense.user === auth.user._id && (
            <button
              onClick={() => deleteTransaction(expense._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
            </form>
        </div>)}
        </Fragment>
        
    )
}

ExpenseUpdate.propTypes = {
expense: PropTypes.object.isRequired,
updateExpense: PropTypes.func.isRequired,
deleteTransaction: PropTypes.func.isRequired
}

 const mapStateToProps = (state) => ({
auth: state.auth
})
export default connect(mapStateToProps, { updateExpense, deleteTransaction })(ExpenseUpdate)
