const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/game");
const checkAuth = require("../middleware/checkAuth");

