import bcrypt from "bcryptjs";

const hashedPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export default hashedPassword;
