

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






//Total cost of selected activities is calculated and displayed below the list of activities.

