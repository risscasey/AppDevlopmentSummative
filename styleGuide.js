//***************************************************
// This is our style guide for the back end
//***************************************************

//***************************************************
// Camel casing rather than dashes
// Good
correctNamingConvention = () => {
  console.log('This is the correct naming convention');
}

// Bad
incorect-naming-convention = () => {
  console.log('This is the incorect naming convention');
}

//***************************************************
// Single quotations for strings rather than double
// Good
console.log('Correct quotations');

// Bad
console.log("Incorrect quotations");

//***************************************************
// Tabbing once (2 spaces)
// Good
goodExampleTab = () => {
  console.log('Tab two spaces');
}

// Bad
badExampleTab = () => {
    console.log('Don\'t tab more than two spaces');
}

//***************************************************
// Relevant naming abbreviations
// Good
getProducts = () {
  console.log('This is a function for getting products');
}

// Bad
function1 = () {
  console.log('What is this function doing?' );
}

//***************************************************
// Close with a semi-colon
// Good
console.log('This is closed');

// Bad
console.log('This isn\'t closed')

//***************************************************
// Put spaces between operators
// Good
const equation = 1 + 1;

// Bad
const equation=1+1;
