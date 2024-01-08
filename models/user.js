import { Schema, model, models } from "mongoose";

//below is to create a schema, by create a function and pass in user object.
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist!"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

//the route only run when it get call
//the "models" objects is provided by the Mongoose library and stores all the registered models.
//if a model named "User" already exist in the "models" object, it assign that exiting model to the "User" variable.
//This prevents redefining the model and ensures that the existing model is resused.

//If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model
//The newly created model is than assigned to the "User" varable.

//look in the the models.User to see if it's there, only if it is not there, then create a new model. Since the route get call very time then the connect is established. So we create this additional check below.

const User = models.User || model("User", UserSchema);
export default User;
