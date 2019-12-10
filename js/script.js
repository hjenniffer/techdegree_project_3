

//When the page first loads, the first text field should be in focus by default.

$('#name').focus();

	


/*target the ‘Other’ input field, and hide it initially,
it will display if JavaScript is disabled hidden initially with JS.*/
 
$('#other-title').attr('hidden', true);

//shows the other input if "other " is selected in the menu add 
$('#title').change(function(){
if ($('#title option:selected').text()==="Other"){

    $('#other-title').show();
}else{
    $('#other-title').hide();

}

});


/*Until a theme is selected from the “Design” menu, no color options appear in the
“Color” drop down and the “Color” field reads “Please select a T-shirt theme”*/

$('#color').prepend('<option>Please select a T-shirt theme</option>');
$('#color option').eq(1).attr('selected', true);

$('#color').each(function(){
    $('#colors-js-puns').hide();
});

/*When a new theme is selected from the "Design" menu, the "Color" field and drop
down menu is updated*/

$('#design').change(function(event){
$('#color').each(function (){
    if ($(event.target).val() === "js puns"){
        $('#colors-js-puns').show();
        $("#color option:contains('Please select')").hide();
        $("#color option:contains('I ♥ JS')").hide();     
        $("#color option:contains('JS Puns')").show(); 
    } else if ($(event.target).val() === "heart js"){
        $('#color option').eq(4).attr('selected', true);
        $('#colors-js-puns').show();
        $("#color option:contains('Please select')").hide();        
        $("#color option:contains('JS Puns')").hide();
        $("#color option:contains('I ♥ JS')").show();           
    }
    else {
        $('#colors-js-puns').hide();
    }
});
});

//User cannot select two activities that are at the same time//

//create a span tag to hold the total cost amount append to activities class using append() method
var totalCost = 0;
const totalCostSpan = $('<span> </span>');
$('.activities').append(totalCostSpan);
totalCostSpan.hide();


// Variable for checkboxes input
const activCheckboxes = $('.activities input');

// Clicking on activities will disable competitive activities and add costs to Total Costs
$('.activities').change(function(event){
    $(".error").remove();
    const clicked = event.target;
    const clickedTime = $(clicked).attr('data-day-and-time');

      //Cost of chosen activity
    const clickedCost = parseInt($(clicked).attr('data-cost').match(/\d+/g));

    //Unable selection of a workshop at the same day and time
    for(let i = 0; i<activCheckboxes.length; i++){
        const activCheckboxesTime = $(activCheckboxes[i]).attr('data-day-and-time');
        if (clickedTime === activCheckboxesTime && clicked !== activCheckboxes[i]){
            if ($(clicked).prop('checked')){
                $(activCheckboxes[i]).prop('disabled', true);
            } else {
                $(activCheckboxes[i]).prop('disabled', false);
            }
        }
    }
   
    if ($(clicked).prop('checked')){
        totalCost += clickedCost;
    }  else {
        totalCost -= clickedCost;
    }

    totalCostSpan.show();
    totalCostSpan.html('<p>Total:  $' + totalCost + '</p>');

    if (totalCost === 0){
        totalCostSpan.hide();
    }
});

//Payment section
$('#payment option:contains("Select Payment Method")').prop('disabled', true);
$('#payment option:contains("Credit Card")').prop('selected', true);

$('#paypal').hide();
$('#bitcoin').hide();

$('#payment').change(function(event){
    
    if ($(event.target).val() === 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
    else if ($(event.target).val() === 'PayPal'){
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    }
    else if ($(event.target).val() === 'Bitcoin'){
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
});

//Validation of inputs

//Types of messages
const blankMessage = '<span class="error">This field cannot be blank</span>';
const mailMessage = '<span class="error">Enter a valid e-mail address</span>';
const activitiesMessage = '<span class="error">Select at least one activity</span>';
const creditCardNumMessage = '<span class="error">This field should contain between 13 and 16 digits</span>';
const creditCardZipMessage = '<span class="error">This field should contain 5 digits</span>';
const creditCardCVVMessage = '<span class="error">This field should contain 3 digits</span>';

// Error message 
function errorMessage (section, message){  
        $(section).after(message);  
}

// Functions for validation
function validName (){
    // Name field cannot  be blank
    if ($('#name').val().length < 1) {
        return false; 
    }
}

function validEmail () {   
    const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const validEmailVar = regEx.test($('#mail').val());
    
    // E-mail field cannot  be blank
    if ($('#mail').val().length < 1) {
        return 1;
    } 
    // E-mail address must be valid
    else if (!validEmailVar){
        return 2;        
    }
}

function validActivities () {
    // At least one checkbox under the 
    //"Register for Activities" should be checked
    if ($('.activities input:checked').length === 0 ){
        return false;
    }
}

// Validation section of credit card
function validCCNumber () {
    // Credit card number field should contain from 13 to 16 numbers
    const regExccNum = /^\d{13,16}$/;
    const validccNum = regExccNum.test($('#cc-num').val());
    if (!validccNum) {
        return false;
    }
}

function validCCZip () {
    // Credit card ZIP code field should contain 5 numbers
    const regExzip = /^\d{5}$/;
    const validZip = regExzip.test($('#zip').val());
    if (!validZip) {
        return false;
    }
}

function validCvv () {
    // Credit card ZIP code field should contain 5 numbers
    const regExCvv = /^\d{3}$/;
    const validCvv = regExCvv.test($('#cvv').val());
    if (!validCvv) {
        return false;
    }
}

// Validation on submit button
$('form').submit(function(event) {
   
    $(".error").remove();

    if (validName() === false){
        event.preventDefault(); 
        errorMessage('#name', blankMessage);
    }

    if (validEmail() === 1){
        event.preventDefault();
        errorMessage('#mail', blankMessage);       
    } else if (validEmail() === 2){
        event.preventDefault();
        errorMessage('#mail', mailMessage); 
    }

    if (validActivities() === false){
        event.preventDefault(); 
        errorMessage('.activities', activitiesMessage);
    }

    // Validation of Credit Card fields only if Credit Card is chosen as payment method
    if ($('#payment').val() === 'Credit Card'){

        if (validCCNumber() === false){
            event.preventDefault(); 
            errorMessage('#cc-num', creditCardNumMessage);
        }

        if (validCCZip() === false){
            event.preventDefault(); 
            errorMessage('#zip', creditCardZipMessage);
        }

        if (validCvv() === false){
            event.preventDefault();
            errorMessage('#cvv', creditCardCVVMessage);
        }
    }
});

// E-mail address must be valid
// This validation is separated, as example of Real-Time Error Message
$('#mail').on('input', function(event) {
    const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const validEmail = regEx.test($('#mail').val());

    $(".error").remove();

    if (!validEmail){
        $('#mail').after('<span class="error">Enter a valid email</span>');
    } 
});