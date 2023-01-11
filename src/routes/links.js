const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
  res.render('tasks/add');
});

router.post('/add', isLoggedIn,  async (req, res)=>{
  const {title, task, description} = req.body;
  const newtask = {
    title,
    task,
    description,
    user_id: req.user.id
  };
   await pool.query('INSERT INTO tasks set ?', [newtask]);
   req.flash('success', 'task Saved Successfully');
  res.redirect('/tasks');
});

router.get('/', isLoggedIn,  async (req, res)=>{
  const links = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
  
  res.render('tasks/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
  const {id} = req.params;
  await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
  res.redirect('/tasks/');
});

router.get('/edit/:id', isLoggedIn,  async (req, res)=>{
  const {id} = req.params;
  const links = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  console.log(links[0]);
  res.render('tasks/edit', {links: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
  const {id} = req.params;
  const {title, description, task} = req.body;
  const newLink = {
    title,
    description,
    task
  };
  await pool.query('UPDATE tasks set ? WHERE id = ?', [newLink, id]);
  res.redirect('/tasks');
});


module.exports = router;