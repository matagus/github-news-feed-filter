const widgets = require("widget");
const pageMod = require("page-mod");
const data = require("self").data;
const tabs = require("tabs");
const toolbarbutton = require("toolbarbutton");

var ss = require("simple-storage");
var addon_title = "Github News Feed Filter";
var pageWorker = null;

var selector = pageMod.PageMod({
  include: ['*.github.com'],
  contentScriptFile: [data.url('jquery-1.6.1.min.js'), data.url('github.js')],
  onAttach: function onAttach(worker) {
    pageWorker = worker;
  }
});

var panel = require("panel").Panel({
  width: 320, height: 500,
  contentScriptFile: [data.url('jquery-1.6.1.min.js'), data.url('panel.js')],
  contentURL: data.url("panel.html")
});

panel.port.on("ok.click", function(visibleClasses) {
  if (pageWorker) {
    pageWorker.port.emit("filter", visibleClasses);
  }
  panel.hide();
});

panel.port.on("cancel.click", function() {
  panel.hide();
});

panel.port.on("save.click", function(filters) {
  ss.storage.filters = filters;
});

panel.port.on("forkme.click", function(url) {
  tabs.open(url);
  panel.hide();
});

var options = {id: "gnff-tbb", label: addon_title,
  toolbarID: "nav-bar", forceMove: true,
  image: data.url("icons/logo.png"), panel: panel};
var tbb = toolbarbutton.ToolbarButton(options);
    tbb.moveTo(options);

var widget = widgets.Widget({
  id: "github-news-feed-filter",
  label: addon_title,
  tooltip: addon_title,
  contentURL: data.url("icons/logo16.png"),
  panel: panel
});

exports.main = function(options, callbacks) {
  panel.port.emit("set-filters", ss.storage.filters);
  // If you run cfx with --static-args='{"quitWhenDone":true}' this program
  // will automatically quit Firefox when it's done.
  if (options.staticArgs.quitWhenDone)
    callbacks.quit();
};

exports.onUnload = function(reason) {
};
