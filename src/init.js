import express from "express";
//import expressWs from "express-ws";
import {config} from 'dotenv';
config();

const init = express();
//expressWs(app);

export default init;