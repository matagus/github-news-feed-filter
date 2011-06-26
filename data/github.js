self.port.on('filter', function(visibleClasses) {
  $("#dashboard .news .alert").each(function(i, item) {
    var alert = $(item);
    var visible = false;
    $(visibleClasses).each(function(n, className) {
      visible = visible || alert.hasClass(className);
    });
    if (visible) { 
      alert.show(); 
    } else {
      alert.hide(); 
    };
  }); 
});
