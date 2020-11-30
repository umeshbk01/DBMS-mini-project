const express = require('express');
const router = express.Router();
const Expense = require('./../../models/Expense');
const User = require('./../../models/User');
const auth = require('./../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require('mongoose');


router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json({
            success: true,
            data: expenses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
})

router.post('/', auth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        const newExpense = new Expense({
            category: req.body.category,
            amount: req.body.amount,
            comment: req.body.comment,
            user: req.user.id
          });

          const expense = await newExpense.save();
          res.json(expense);
      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e });
      }
})


router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
try {
    const expense = await Expense.findById(req.params.id);

    if(!expense){
        return res.status(404).json({ msg: 'Expense not found' });
    }

    if(expense.user.toSring() !== req.user.id){
        return res.status(401).json({ msg: 'User not authorized' });
    }

    await expense.remove();
    res.json({ msg: 'Expense deleted' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
})

router.get('/monthPreview', auth, async (req, res) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  const today = new Date()
  today.setUTCHours(0,0,0,0)
  
  const tomorrow = new Date()
  tomorrow.setUTCHours(0,0,0,0)
  tomorrow.setDate(tomorrow.getDate()+1)
  
  
  try {
    let currentPreview = await Expense.aggregate([
      {
          $facet: { month: [
                              { $match : { createdAt : { $gte : firstDay, $lt: lastDay }, user: mongoose.Types.ObjectId(req.user.id)}},
                              { $group : { _id : "currentMonth" , totalSpent:  {$sum: "$amount"} } },
                            ],
                    today: [
                      { $match : { createdAt : { $gte : today, $lt: tomorrow }, user: mongoose.Types.ObjectId(req.user.id) }},
                      { $group : { _id : "today" , totalSpent:  {$sum: "$amount"} } },
                    ]
                  }
      }])
    let expensePreview = {month: currentPreview[0].month[0], today: currentPreview[0].today[0] }
  //console.log(expensePreview);
    res.json(expensePreview)
  } catch (err){
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
})

module.exports = router;