const addLocataireValidation = () =>  {
       
       return{
          nom : {
          isUppercase: {
            // To negate a validator
            negated: true,
          },
          rtrim: {
            // Options as an array
            options: [[' ', '-']],
          }
        }
       }
}

module.exports = {addLocataireValidation} 