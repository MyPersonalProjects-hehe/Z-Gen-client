export const validateUsername = async (username, model) => {
  const userExists = await model.findOne({ username: username });
  if (userExists) {
    return 'Username already exists!';
  }
  if (username.length < 4) {
    return 'Username must be more than 4 characters long!';
  }

  return true;
};

export const validateEmail = async (email, model) => {
  const emailExists = await model.findOne({ email: email });
  if (emailExists) {
    return 'Email already exists!';
  }
  if (!email.includes('@')) {
    return 'Please provide a valid email!';
  }

  return true;
};
