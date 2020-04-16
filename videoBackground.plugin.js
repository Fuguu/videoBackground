//META{"name":"videoBackground","authorId":"83151710654038016", "website":"https://github.com/Fuguu/videoBackground/"}*//

var videoBackground = (_ => {
  return class videoBackground {
    getName() {
      return "VideoBackground";
    }

    getVersion() {
      return "3.0";
    }

    getAuthor() {
      return "Fugu";
    }

    getDescription() {
      return "Set your Discord background as a video! CSS is required, example can be found at website linked below";
    }

    initConstructor() {
      this.defaults = {
        settings: {
          videoLink: {
            value: "video link",
            description: "Youtube video/playlist or direct MP4/WebM/OGG link"
          }
        }
      };
    }

    getSettingsPanel(collapseStates = {}) {
      if (
        !window.BDFDB ||
        typeof BDFDB != "object" ||
        !BDFDB.loaded ||
        !this.started
      )
        return;
      let settings = BDFDB.DataUtils.get(this, "settings");
      let settingsPanel,
        settingsItems = [],
        innerItems = [];

      for (let key in settings)
        settingsItems.push(
          BDFDB.ReactUtils.createElement(
            BDFDB.LibraryComponents.SettingsSaveItem,
            {
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
            }
          )
        );

      innerItems = [];

      return (settingsPanel = BDFDB.PluginUtils.createSettingsPanel(
        this,
        settingsItems
      ));
    }

    //legacy
    load() { }

    start() {
      if (!window.BDFDB) window.BDFDB = { myPlugins: {} };
      if (
        window.BDFDB &&
        window.BDFDB.myPlugins &&
        typeof window.BDFDB.myPlugins == "object"
      )
        window.BDFDB.myPlugins[this.getName()] = this;
      let libraryScript = document.querySelector(
        "head script#BDFDBLibraryScript"
      );
      if (
        !libraryScript ||
        performance.now() - libraryScript.getAttribute("date") > 600000
      ) {
        if (libraryScript) libraryScript.remove();
        libraryScript = document.createElement("script");
        libraryScript.setAttribute("id", "BDFDBLibraryScript");
        libraryScript.setAttribute("type", "text/javascript");
        libraryScript.setAttribute(
          "src",
          "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.min.js"
        );
        libraryScript.setAttribute("date", performance.now());
        libraryScript.addEventListener("load", _ => {
          this.initialize();
        });
        document.head.appendChild(libraryScript);
      } else if (window.BDFDB && typeof BDFDB === "object" && BDFDB.loaded)
        this.initialize();
      this.startTimeout = setTimeout(_ => {
        try {
          return this.initialize();
        } catch (err) {
          console.error(
            `%c[${this.getName()}]%c`,
            "color: #3a71c1; font-weight: 700;",
            "",
            "Fatal Error: Could not initiate plugin! " + err
          );
        }
      }, 30000);
    }

    initialize() {
      if (window.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
        if (this.started) return;
        BDFDB.PluginUtils.init(this);
        this.runVideo();
        
      } else {
        console.error(
          `%c[${this.getName()}]%c`,
          "color: #3a71c1; font-weight: 700;",
          "",
          "Fatal Error: Could not load Youtube Background functions!"
        );
      }
    }

    stop() {
      if (window.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
        this.stopping = true;
        this.deleteVideo();

        BDFDB.PluginUtils.clear(this);
      }
    }

    // begin of own functions

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
        videolink += "&controls=1&mute=1&showinfo=0&rel=0&autoplay=1&loop=1";

      }
      if (videolink.search("watch") > -1) {
        console.log("Youtube Background: loading single video!");
        let videoID = videolink.substring(videolink.search("watch") + 8, videolink.search("watch") + 19);
        videolink = "https://www.youtube.com/embed/";
        videolink += videoID;
        videolink += "?controls=1&mute=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=";
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

    onSettingsClosed() {
      if (this.SettingsUpdated) {
        delete this.SettingsUpdated;
        this.forceUpdateAll();
      }
    }

    forceUpdateAll() {
      BDFDB.ModuleUtils.forceAllUpdates(this);
      BDFDB.MessageUtils.rerenderAll();
    }
  };
})();
