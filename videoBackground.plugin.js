//META{"name":"videoBackground","authorId":"83151710654038016", "website":"https://github.com/Fuguu/videoBackground/"}*//

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
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return config.info.description;}
		
        load() {
			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue:[]});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
							if (!e && b && b.indexOf(`//META{"name":"`) > -1) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => {});
							else BdApi.alert("Error", "Could not download BDFDB library plugin, try again some time later.");
						});
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
        }
        start() {}
        stop() {}
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

			getSettingsPanel (collapseStates = {}) {
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

			onSettingsClosed () {
				if (this.SettingsUpdated) {
					delete this.SettingsUpdated;
					this.forceUpdateAll();
				}
			}
			
			forceUpdateAll () {
				settings = BDFDB.DataUtils.get(this, "settings");
				
				BDFDB.PatchUtils.forceAllUpdates(this);
			}
            
            runVideo(){
      let check = BDFDB.DataUtils.get(this, "settings", "videoLink");
      if(check.search("youtube")>-1){
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
        videolink += "&controls=0&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1";

      }
      if (videolink.search("watch") > -1) {
        console.log("Youtube Background: loading single video!");
        let videoID = videolink.substring(videolink.search("watch") + 8, videolink.search("watch") + 19);
        videolink = "https://www.youtube.com/embed/";
        videolink += videoID;
        videolink += "?controls=0&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=";
        videolink += videoID;
      }

      var findVideoClass = document.getElementsByClassName("fullscreen-bg");
      if (findVideoClass.length == 0) {
        $(".da-appMount").after(
          "<div class='fullscreen-bg'><iframe class='fullscreen-bg-video'></iframe></div>"
        );
        $(".da-appMount").css("background", "transparent");

        $(".fullscreen-bg-video").attr("src", videolink);
      } else {
        console.log("Fullscreen-bg class already exists!");
      }
    }

    injectOtherVideo(){
      console.log("injecting custom video!");
      let videolink = BDFDB.DataUtils.get(this, "settings", "videoLink");
      var findVideoClass = document.getElementsByClassName("fullscreen-bg");
      if (findVideoClass.length == 0) {
        $(".da-appMount").after(
          "<div class='fullscreen-bg'><video loop muted autoplay class='fullscreen-bg-video'></video></div>"
        );
        $(".da-appMount").css("background", "transparent");

        var source = document.createElement("source");
        $(source).attr("src", videolink);
        $(".fullscreen-bg-video").append(source);
      } else {
        console.log("Fullscreen-bg class already exists!");
      }
    }

    deleteVideo() {
      $(".fullscreen-bg").remove();
      $(".da-appMount").removeAttr("style");
    }
		
			
			
		};
    })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
