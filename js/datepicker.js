/*
 * Allows multiple date selection
 * 
 * Reference: http://stackoverflow.com/questions/1452066/jquery-ui-datepicker-multiple-date-selections
 */

 // Maintain array of dates
var dates = new Array();

function addDate(date) {
    if (jQuery.inArray(date, dates) < 0) 
        dates.push(date);
}

function removeDate(index) {
    dates.splice(index, 1);
}

// Adds a date if we don't have it yet, else remove it
function addOrRemoveDate(date, inst) {
    //console.log(inst);
    var index = jQuery.inArray(date, dates);
    if (index >= 0) 
        removeDate(index);
    else 
        addDate(date);
    console.log(dates);
}

// Takes a 1-digit number and inserts a zero before it
function padNumber(number) {
    var ret = new String(number);
    if (ret.length == 1) 
        ret = "0" + ret;
    return ret;
}

/*
 * Initializes the date picker
 */
$("#datepicker").datepicker({
    onSelect: function (dateText, inst) {
        addOrRemoveDate(dateText, inst);
        var month = dateText.split('/')[0];
    },
    beforeShowDay: function (date) {
        var year = date.getFullYear();
        // months and days are inserted into the array in the form, e.g "01/01/2009", but here the format is "1/1/2009"
        var month = padNumber(date.getMonth() + 1);
        var day = padNumber(date.getDate());
        // This depends on the datepicker's date format
        var dateString = month + "/" + day + "/" + year;

        var gotDate = jQuery.inArray(dateString, dates);
        if (gotDate >= 0) {
            // Enable date so it can be deselected. Set style to be highlighted
            return [true, "ui-state-highlight"];
        }
        // Dates not in the array are left enabled, but with no extra style
        return [true, ""];
    },
    nextText: '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
    prevText: '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
});
