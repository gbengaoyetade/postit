const validateInput = (request, requiredFields) => {
  for (let counter = 0; counter < requiredFields.length; counter += 1) {

    if (!request.hasOwnProperty(requiredFields[counter])) {
      return `${requiredFields[counter]} field not provided`;
    }
  }
}
export default validateInput;
