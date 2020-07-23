const bcrypt = require('bcrypt');

exports.generateHash = async (plainPassword) => {
  if (!plainPassword) return null;
  const saltRound = 12;
  const hash = await bcrypt.hash(plainPassword, saltRound);
  return hash;
};

exports.check = async (plainPassword, hash) => {
  return await bcrypt.compare(plainPassword, hash);
};
