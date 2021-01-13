import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExpense } from '../../actions/expense';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

let date = new Date();

const initialState = {
    category: '',
    amount: '',
    createdAt: date.getDate(),
    comment: '',

};

const AddExpense = ({ addExpense }) => {
    const [formData, setFormData] = useState(initialState);

    const {
    category,
    amount,
    comment
    } = formData;

    const onChange = e =>
            setFormData({ ...formData, [e.target.name]: e.target.value });
    // const handleDateChange = date => {
    //     setFormData({...formData, incurred_on: date });
    // }
    console.log(formData);
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        addExpense(formData);
    }

  return (
      <Card className="card2">
          <CardContent>
          <div className='dash2'>
              Add Expense
              </div>
              <br />
              <form className="form-group-ADDEXP" onSubmit={onSubmit}>
                  <div className="ADDEXP-select">
                      <select name="category" value={category} onChange={onChange}>
                      <option>Please select the type of your expense</option>
                          <option value="Food">Food</option>
                          <option value="Loan/Emi">Loan or EMI</option>
                          <option value="Travel">Travel</option>
                          <option value="Investment">Investment</option>
                          <option value="Bills & Utilities">Bills & Utilities</option>
                          <option value="Others">Others</option>
                      </select>
                  </div>
                  <div className="form-group">
                      
                      <input type="number" placeholder="Amount" name="amount" value={amount} onChange={onChange} />
                  </div>
                  <br/>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    label="Incurred on"
                    className="textField"
                    views={["year", "month", "date"]}
                    name="incurred_on"
                    value={incurred_on}
                    onChange={handleDateChange}
                    showTodayButton
                />
          </MuiPickersUtilsProvider> */}
                  <br/>
                  <br/>
                  {/* <TextField
                    id="multiline-flexible"
                    label="Comment"
                    multiline
                    rows="2"
                    name="comment"
                    value={comment}
                    onChange={onChange}
                    className="textField"
                    margin="normal"
                    /> */}
                    <textarea 
                        placeholder="Comment"
                        name="comment"
                        value={comment}
                        onChange={onChange}
                    />
                    <br/>
                    <br/>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link> 
              </form>
          </CardContent>
      </Card>
  )  
}

AddExpense.propTypes = {
addExpense: PropTypes.func.isRequired,
}

export default connect(null,
                    { addExpense })(AddExpense);