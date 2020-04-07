//META{"name":"videoBackground"}*//

var videoBackground = function () {};

videoBackground.prototype.load = function() {
};

videoBackground.prototype.unload = function() {
};

videoBackground.prototype.settingsVersion = "1";

videoBackground.prototype.defaultSettings = function() {
  console.log("calling default settings");
  return{
    version: this.settingsVersion,
      video: "https://thumbs.gfycat.com/AdventurousQuickIggypops-mobile.mp4",
  }
}

videoBackground.prototype.loadSettings = function() {
	return this.defaultSettings();
};

videoBackground.prototype.saveSettings = function(button) {

    var settings = this.loadSettings();
    settings.video = $("#vbsettings #video").val();
    BdApi.setData("videoBackground", "videoBackground", JSON.stringify(settings));
    this.stop();
    this.start();
    button.innerHTML = "Saved";
    setTimeout(function(){button.innerHTML = "Save";},1000);
	console.log("saved new link!");
};


videoBackground.prototype.start = function() {

	$(".da-appMount").after("<div class='fullscreen-bg'><video loop muted autoplay class='fullscreen-bg-video'></video></div>");
    $(".da-appMount").css('background', 'transparent');
    
    var settings = this.loadSettings();
    
    var source = document.createElement('source');
    $(source).attr('src', settings.video);
    $(".fullscreen-bg-video").append(source);
    
};

videoBackground.prototype.stop = function() {
    $(".fullscreen-bg").remove();
    $(".da-appMount").removeAttr('style');
};

videoBackground.prototype.update = function() {
};

videoBackground.prototype.getSettingsPanel = function () {
};

videoBackground.prototype.getName = function() {
    return "Video Background";
};

videoBackground.prototype.getDescription = function() {
    return "Set a WebM/MP4/Ogg as a background. Manual CSS required";
};

videoBackground.prototype.getVersion = function() {
    return "1.0";
};

videoBackground.prototype.getAuthor = function() {
    return "Fuguzors";
};
