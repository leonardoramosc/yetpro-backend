import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: './config.env' });

const SERVER_PORT = process.env.SERVER_PORT || 8001;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})