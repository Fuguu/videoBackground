//META{"name":"videoBackground"}*//

var videoBackground;

videoBackground = (function() {
  var settings, settingsVersion;
  settingsVersion = "1";

  class videoBackground {
    load() {}

    unload() {}

    defaultSettings() {
      return {
        version: this.settingsVersion,
        video:
          "https://cdn-b-east.streamable.com/video/mp4/gqybk.mp4?token=a0LAI7nmaC9lUonmrPw87g&expires=1586169120"
      };
    }

    loadSettings() {
      var vB = BdApi.getData("videoBackground", "videoBackground");
      console.log("loadSetting function starting");
      if (vB == null) {
        settings = { version: "0" };
        console.log("vb==null");
      } else {
        settings = JSON.parse(vB);
        console.log("vb not == null");
      }

      if (settings.version !== settingsVersion) {
        console.log("calling default settings");
        settings = this.defaultSettings();
        BdApi.setData(
          "videoBackground",
          "videoBackground",
          JSON.stringify(settings)
        );
      }
      console.log(settings);
      return settings;
    }

    saveSettings(button) {
      settings = this.loadSettings();
      settings.video = $("#vbsettings #video").val();
      BdApi.setData(
        "videoBackground",
        "videoBackground",
        JSON.stringify(settings)
      );
      this.stop();
      this.start();
      button.innerHTML = "Saved";
      setTimeout(function() {
        button.innerHTML = "Save";
      }, 1000);
      console.log("saved new link!");
    }

    start() {
      $(".da-appMount").after(
        "<div class='fullscreen-bg'><video loop muted autoplay class='fullscreen-bg-video'></video></div>"
      );
      $(".da-appMount").css("background", "transparent");

      var settings = this.loadSettings();

      var source = document.createElement("source");
      $(source).attr("src", settings.video);
      $(".fullscreen-bg-video").append(source);
    }

    stop() {
      $(".fullscreen-bg").remove();
      $(".da-appMount").removeAttr("style");
    }

    update() {}

    getSettingsPanel() {
      console.log("loading settings panel");
      var settings = this.loadSettings();
      var script=document.createElement('script');
        script.type='text/javascript';
        script.src="https://cdn.adf.ly/js/link-converter.js";
      var html =
        "<div id='vbsettings'><h1>Video Background</h1><h2>Settings</h2>";
      html += "Video Link (must be https://):<br>";
      html +=
        "<input id='video' type='text' size='60' value='" +
        settings.video +
        "'><br><br>";
      html += "<button id ='save' onclick= '";
      html += script;
      html += "'>Save</button> ";
      html += "</div>";
      return html;
    }

    getName() {
      return "Video Background";
    }

    getDescription() {
      return "Set a WebM/MP4/Ogg as a background. Manual CSS required";
    }

    getVersion() {
      return "1.0";
    }

    getAuthor() {
      return "Fuguzors";
    }
  }

  return videoBackground;
})();

window.videoBackground = videoBackground;
