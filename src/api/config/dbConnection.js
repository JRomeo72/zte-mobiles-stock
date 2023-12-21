import { connect } from 'mongoose';

const dbConnect = async () => {
    const DBURI = process.env.DB_URI;
    try {
        console.log(DBURI)
        await connect(DBURI);
        console.log("Successful DB Connection")
    } catch (error) {
        console.log("DB connection error")
        console.log(error)
    }

};

export default dbConnect;