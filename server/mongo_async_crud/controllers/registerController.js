const User = require("../model/User.js");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, roles } = req.body;
  console.log(roles);
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    if (roles) {
      const result = await User.create({
        username: user,
        password: hashedPwd,
        roles,
      });
    } else {
      const result = await User.create({
        username: user,
        password: hashedPwd,
      });
    }

    console.log("User:", user);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
