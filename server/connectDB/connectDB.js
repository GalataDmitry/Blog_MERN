import mongoose from "mongoose"

const DBurl = process.env.DB_URL

export const mongooseConnect = () => {
    mongoose.connect(DBurl)
        .then(() => console.log('connected DB'))
        .catch((error) => console.log(error))
}