/**
 * @name VideoBackground
 * @author Fuguu
 * @authorId 83151710654038016
 * @version 3.0
 * @description Live Video Background!
 * @source https://github.com/Fuguu/videoBackground
 */

module.exports = (_ => {
  const config = {
    "info": {
      "name": "VideoBackground",
      "author": "Fugu",
      "version": "3.0",
      "description": "Set your Discord background as a video! CSS is required, example can be found at website linked below"
    }
  };
  return !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
    getName() { return config.info.name; }
    getAuthor() { return config.info.author; }
    getVersion() { return config.info.version; }
    getDescription() { return config.info.description; }

    downloadLibrary() {
      require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
        if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", { type: "success" }));
        else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
      });
    }

    load() {
      if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, { pluginQueue: [] });
      if (!window.BDFDB_Global.downloadModal) {
        window.BDFDB_Global.downloadModal = true;
        BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
          confirmText: "Download Now",
          cancelText: "Cancel",
          onCancel: _ => { delete window.BDFDB_Global.downloadModal; },
          onConfirm: _ => {
            delete window.BDFDB_Global.downloadModal;
            this.downloadLibrary();
          }
        });
      }
      if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
    }
    start() { }
    stop() { }
  } : (([Plugin, BDFDB]) => {
    var settings = {};

    return class VideoBackground extends Plugin {
      onLoad() {
        this.defaults = {
          settings: {
            videoLink: {
              value: "video link",
              description: "Youtube video/playlist or direct MP4/WebM/OGG link"
            }
          }
        };
      }

      onStart() {
        this.runVideo();
        this.forceUpdateAll();
      }

      onStop() {
        this.deleteVideo();
        this.forceUpdateAll();
      }

      getSettingsPanel(collapseStates = {}) {
        let settingsPanel, settingsItems = [];

        for (let key in settings) if (this.defaults.settings[key].description) settingsItems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
          className: BDFDB.disCN.marginbottom8,
          type: "TextInput",
          plugin: this,
          keys: ["settings", key],
          label: this.defaults.settings[key].description,
          value: settings[key],
          onChange: (e, instance) => {
            this.deleteVideo();
            this.runVideo();
          }
        }));


        return settingsPanel = BDFDB.PluginUtils.createSettingsPanel(this, settingsItems);
      }

      onSettingsClosed() {
        if (this.SettingsUpdated) {
          delete this.SettingsUpdated;
          this.forceUpdateAll();
          this.runVideo();
        }
      }

      forceUpdateAll() {
        settings = BDFDB.DataUtils.get(this, "settings");
        BDFDB.PatchUtils.forceAllUpdates(this);
      }

      runVideo() {
        let check = BDFDB.DataUtils.get(this, "settings", "videoLink");
        if (check.search("youtube") > -1) {
          this.injectVideo();
        } else {
          this.injectOtherVideo();
        }
      }

      injectVideo() {
        console.log("Injecting youtube iframe!");
        let videolink = BDFDB.DataUtils.get(this, "settings", "videoLink");

        if (videolink.search("playlist?") > -1) {
          console.log("Youtube Background: loading playlist!");
          let videoPL = videolink.substring(videolink.search("playlist") + 14, videolink.length);
          videolink = videolink.replace("playlist?list=", "embed/videoseries?list=");
          videolink = "https://www.youtube.com/embed/videoseries?list=";
          videolink += videoPL;
          videolink += "&controls=1&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1";

        }
        if (videolink.search("watch") > -1) {
          console.log("Youtube Background: loading single video!");
          let videoID = videolink.substring(videolink.search("watch") + 8, videolink.search("watch") + 19);
          videolink = "https://www.youtube.com/embed/";
          videolink += videoID;
          videolink += "?controls=1&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=";
          videolink += videoID;
        }

        var findVideoClass = document.getElementsByClassName("fullscreen-bg");
        var findAppMount = document.getElementById("app-mount");
        if (findVideoClass.length == 0) {
          var newDiv = document.createElement("div");
          newDiv.id = "fullscreen-bg";
          newDiv.className = "fullscreen-bg";
          var newNewDiv = document.createElement("iframe");
          newNewDiv.id = "fullscreen-bg-video";
          newNewDiv.className = "fullscreen-bg-video";
          newNewDiv.src = videolink;
          newDiv.insertAdjacentElement("beforeend", newNewDiv);
          findAppMount.insertAdjacentElement("beforeend", newDiv);
        } else {
          console.log("Fullscreen-bg class already exists!");
          document.getElementById("fullscreen-bg-video").src = videolink;
        }
      }

      injectOtherVideo() {
        console.log("injecting custom video!");
        let videolink = BDFDB.DataUtils.get(this, "settings", "videoLink");
        var findVideoClass = document.getElementsByClassName("fullscreen-bg");
        var findAppMount = document.getElementById("app-mount");
        if (findVideoClass.length == 0) {
        var newDiv = document.createElement("div");
        newDiv.id = "fullscreen-bg";
        newDiv.className = "fullscreen-bg";
        var newNewDiv = document.createElement("video");
        newNewDiv.id = "fullscreen-bg-video";
        newNewDiv.className = "fullscreen-bg-video";
        newNewDiv.muted = true;
        newNewDiv.loop = true; 
        newNewDiv.autoplay = true;
        var source = document.createElement("source");
        source.src = videolink;
        newNewDiv.insertAdjacentElement("beforeend", source);
        newDiv.insertAdjacentElement("beforeend", newNewDiv);
        findAppMount.insertAdjacentElement("beforeend", newDiv);

        } else {
          console.log("Fullscreen-bg class already exists!");
        }
      }

      deleteVideo() {
        var elem = document.querySelector("#fullscreen-bg");
        elem.parentNode.removeChild(elem);
      }
 


    };
  })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
