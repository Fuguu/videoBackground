//META{"name":"videoBackground","authorId":"83151710654038016", "transparencyCSS":"https://github.com/Fuguu/videoBackground/blob/master/transparent.css"}*//

var videoBackground = (_ => {
  return class videoBackground {
    getName() {
      return "VideoBackground";
    }

    getVersion() {
      return "2.0";
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
            description: "Video link goes here - MP4/WebM/OGG"
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
                this.injectVideo();
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
    load() {}

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
        this.injectVideo();

        BDFDB.ModuleUtils.patch(
          this,
          BDFDB.LibraryModules.QuoteUtils,
          "videoBackground",
          { instead: e => {} }
        );
      } else
        console.error(
          `%c[${this.getName()}]%c`,
          "color: #3a71c1; font-weight: 700;",
          "",
          "Fatal Error: Could not load BD functions!"
        );
    }

    stop() {
      if (window.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
        this.stopping = true;
        this.deleteVideo();

        BDFDB.PluginUtils.clear(this);
      }
    }

    // begin of own functions

    injectVideo() {
      console.log("injecting video stuff");
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
