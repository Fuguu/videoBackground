# Video Background for BetterDiscord
This is a guide to using the plugin. When working, it will insert a `<video>` element under the page which requires some css to make visible. I have provided a sample css theme that will do so.

Example: 

![](https://thumbs.gfycat.com/ClumsyGreenHookersealion-size_restricted.gif)

# Install
Download [`videoBackground.plugin.js`](https://raw.githubusercontent.com/Fuguu/videoBackground/master/videoBackground.plugin.js) (can right click this link and save as) and drop it in the BetterDiscord plugin folder. 

This can be found in:
+ `Discord settings > BetterDiscord > Plugins > 'Open Plugin Folder'`
+ `C:\Users\{name}\AppData\Roaming\BetterDiscord\plugins`

Restart discord and it should show up like so:

![](https://i.imgur.com/1wzj3HE.png)

Include the following code to your css (this is included in the sample theme):
```css
.fullscreen-bg video {
  position: fixed;
  top: 50%; left: 50%;
  z-index: -100;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
}
```

# Setting up Video
Clicking on the `Settings` button will open a window like so:

![](https://i.imgur.com/kWQK9za.png)

The link must be a direct link to any `MP4/WebM/OGG` file. This work with websites such as Streamable and Gfycat. The link must also be https:// or the video will not play. Hit save and if the css has been set up, it should appear.

# Getting Direct Link
<h4>Streamable</h4>

On any streamable video, you can right click the video to pop up a menu which you can again right click on `Download Video` and copy the link address like so:

![](https://i.imgur.com/SsxNFXV.png)

<h4>Gfycat</h4>

In a similar fashion to Streamable, you can right click a gfycat video and copy the link address:

![](https://i.imgur.com/BPzKJMM.png)

<h4>Youtube</h4>

For Youtube, I recommend converting the video to Streamable and following the same method.

# Contact
Feel free to message me about any question you may have and i'll try to help out.
+ Twitter: **@Fuguzors**
+ Discord: **Fugu#1249**
