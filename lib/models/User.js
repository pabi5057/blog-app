import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    image: String,
  });

  export const User = mongoose.models?.User || mongoose.model('User', userSchema);