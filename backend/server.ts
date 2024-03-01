import mongoose from 'mongoose';
import app from './app';
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_HOST as string)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Listenting at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
