$("#ok").click(function(event) {
  // Intercept the click, passing it to the addon, which will load it in a tab.
  event.stopPropagation();
  event.preventDefault();
  var visibleClasses = new Array();
  $('input[type="checkbox"]:checked').each(function(i, checkbox) {
    visibleClasses.push(checkbox.id);
  });
  self.port.emit('ok.click', visibleClasses);
});

$("#cancel").click(function(event) {
  // Intercept the click, passing it to the addon, which will load it in a tab.
  event.stopPropagation();
  event.preventDefault();
  self.port.emit('cancel.click');
});

$("#forkme").click(function(event) {
  // Intercept the click, passing it to the addon, which will load it in a tab.
  event.stopPropagation();
  event.preventDefault();
  self.port.emit('forkme.click', event.target.href);
});

$("#all").click(function(event) {
  $('#options input[type="checkbox"]').attr('checked', 'checked');
});

$("#none").click(function(event) {
  $('#options input[type="checkbox"]').removeAttr('checked');
});

$("#invert").click(function(event) {
  $('#options input[type="checkbox"]').each(function(i, elem) {
    var checkbox = $(elem);
    if (checkbox.attr('checked')) {
      checkbox.removeAttr('checked');
    } else {
      checkbox.attr('checked', 'checked');
    }
  });
});
