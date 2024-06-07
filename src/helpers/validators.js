const emailValidator = (email) => {
   const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   return pattern.test(email);
};


const dateValidator = (date) => {
   const AppointmentDate = new Date(date);
   const CurrentDate = new Date();
   if (AppointmentDate < CurrentDate) {
      return false;
   }
   return true;
};


module.exports = {
   emailValidator,
   dateValidator
};
