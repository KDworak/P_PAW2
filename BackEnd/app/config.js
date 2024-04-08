const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://pawl1:BUTFobwW5sdV4MGt@cluster0.uzeknrw.mongodb.net/PAW?retryWrites=true&w=majority',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
