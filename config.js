module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    //replace <username> and <password> with that of your mongoDB atlas
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://<username>:<pwd>@cluster0.ywixww1.mongodb.net/?retryWrites=true&w=majority'
}
