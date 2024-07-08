import express from 'express';
import{createServer} from 'node:http';
import{Server} from "socket.io";
import mongoose from 'mongoose';
import cors from 'cors'
import { connectToSocket } from './controllers/socketManager.js';

const app = express();
const server = createServer(app)
const io = connectToSocket(server)


app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));


const start = async()=>{
    const connectionDb = await mongoose.connect('mongodb+srv://rakeshreddy:12345@cluster0.sxfqm69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MONGO Connected DB HOST:${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("LISTENING ON PORT 8000");
    })
}
start();