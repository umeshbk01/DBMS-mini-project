const express = require('express');
const router = express.Router();
const Expense = require('./../../models/Expense');
const User = require('./../../models/User');
const auth = require('./../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require('mongoose');
const Profile = require('../../models/Profile');


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

router.get('/all', auth, async (req, res) => {
  try {
     const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    
     return res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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

router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
  const {
    category,
    comment,
    amount,
    createdAt,
  } = req.body;

  const expenseFields = {
    user: req.user.id,
    category: category,
    comment: comment,
    amount: amount,
    createdAt: createdAt,
  };
  try {
  //  console.log(req.body._id); 
    let expense = await Expense.findOneAndUpdate(
      {_id: req.body._id},
      { $set: expenseFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    //console.log(expense);
    return res.json(expense);


  } catch (err) {
    console.error(err.message);
      return res.status(500).send('Server Error');
  }
})

router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
try {
    const expense = await Expense.findById(req.params.id);
    // console.log(expense);
    // console.log(req.user.id);
    if(!expense){
        return res.status(404).json({ msg: 'Expense not found' });
    }

    if(expense.user.toString() !== req.user.id.toString()){
        return res.status(401).json({ msg: 'User not authorized' });
    }

    await expense.remove();
    res.json({ msg: 'Expense deleted' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
})
router.get('/yearlyExpense', auth, async (req, res) => {
  const date = new Date(), y = date.getFullYear();
  const firstDay = new Date(y, 0, 1);
  const lastDay = new Date(y, 12, 0);
  try {
      let monthlyExpense = await Expense.aggregate( [
        { $match: { createdAt: { $gte: firstDay, $lt: lastDay }, user: mongoose.Types.ObjectId(req.user.id) }},
        { $group: { _id: {$month: "$createdAt"}, totalSpent: {$sum: "$amount"} } },
        { $project: {x: '$_id', y: '$totalSpent'}}
      ]).exec();
      res.json({ monthExp : monthlyExpense });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
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