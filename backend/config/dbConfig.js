// const MONGO_PASS='novomak2020';
// const MONGODB_URL=`mongodb+srv://novomak:${MONGO_PASS}@cluster0.ivtbn.mongodb.net/?retryWrites=true&w=majority`;
const MONGO_PASS=`Dedabodja01`;
const MONGODB_URL=`mongodb+srv://admin:${MONGO_PASS}@cluster0.ase3li4.mongodb.net/?retryWrites=true&w=majority`;
const mongooseOptions={
    useNextUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
};

module.exports={
    MONGO_PASS:MONGO_PASS,
    MONGODB_URL:MONGODB_URL,
    mongooseOptions:mongooseOptions
};