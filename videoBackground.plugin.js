//META{"name":"videoBackground"}*//

var videoBackground = function () {};

videoBackground.prototype.load = function() {
};

videoBackground.prototype.unload = function() {
};

videoBackground.prototype.settingsVersion = "1";

videoBackground.prototype.defaultSettings = function() {
  return{
    version: this.settingsVersion,
      video: "https://zippy.gfycat.com/AdventurousQuickIggypops.webm",
  }
}

videoBackground.prototype.loadSettings = function() {
	var vB = bdPluginStorage.get("videoBackground", "videoBackground");
	var settings;
	if(vB == null){
		settings = {version:"0"};
	}else{
	settings = JSON.parse(vB);
	}
  
	if(settings.version != this.settingsVersion){
		settings = this.defaultSettings();
		bdPluginStorage.set("videoBackground", "videoBackground", JSON.stringify(settings));
	}
	return settings;
};

videoBackground.prototype.saveSettings = function(button) {

    var settings = this.loadSettings();
    settings.video = $("#vbsettings #video").val();
    bdPluginStorage.set("videoBackground", "videoBackground", JSON.stringify(settings));
    this.stop();
    this.start();
    button.innerHTML = "Saved";
    setTimeout(function(){button.innerHTML = "Save";},1000);
};


videoBackground.prototype.start = function() {

	$(".app").after("<div class='fullscreen-bg'><video loop muted autoplay class='fullscreen-bg-video'></video></div>");
    $(".app").css('background', 'transparent');
    
    var settings = this.loadSettings();
    
    var source = document.createElement('source');
    $(source).attr('src', settings.video);
    $(".fullscreen-bg-video").append(source);

    
};

videoBackground.prototype.stop = function() {
    $(".fullscreen-bg").remove();
    $(".app").removeAttr('style');
};

videoBackground.prototype.update = function() {
};

videoBackground.prototype.getSettingsPanel = function () {
    var settings = this.loadSettings();
    var html = "<div id='vbsettings'><h1>Video Background</h1><h2>Settings</h2>"
    html += "Video Link (must be https://):<br>"
    html += "<input id='video' type='text' size='60' value='"+settings.video+"'><br><br>";
    html +="<button id ='save' onclick='videoBackground.prototype.saveSettings(this)'>Save</button> ";
    html += "</div>"
    return html;
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

