//*var express = require('express');
//*var router = express.Router();

/* GET users listing. */
//*router.get('/', function(req, res, next) {
//*  res.send('respond with a resource');
//*});

//*module.exports = router;

const express = require("express");
const fs = require("fs");
const router = express.Router();

// Carica gli utenti dal file JSON
function getUsers() {
    return JSON.parse(fs.readFileSync("users.json", "utf-8"));
}

// Route per ottenere tutti gli utenti
router.get("/users", (req, res) => {
    res.json(getUsers());
});

// Route per ottenere un utente specifico per email
router.get("/users/:email", (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.email === req.params.email);

    if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
    }
    
    res.json(user);
});

module.exports = router;
