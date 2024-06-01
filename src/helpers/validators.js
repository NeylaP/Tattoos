const emailValidator = (email) => {
   const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   return pattern.test(email);
};



module.exports = {
   emailValidator,
};
