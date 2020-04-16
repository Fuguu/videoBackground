# Video Background for BetterDiscord
This is a guide to using the plugin. When working, it will insert a `<video>` or `<iframe>` element after `<app-mount>` which requires some css to make visible. I have provided a sample css theme that will do so.

Example: 

![](https://thumbs.gfycat.com/ClumsyGreenHookersealion-size_restricted.gif)

# Install
Download [`videoBackground.plugin.js`](https://raw.githubusercontent.com/Fuguu/videoBackground/master/videoBackground.plugin.js) (can right click this link and save as) and drop it in the BetterDiscord plugin folder. 

This can be found in:
+ `Discord settings > BetterDiscord > Plugins > 'Open Plugin Folder'`
+ `C:\Users\{name}\AppData\Roaming\BetterDiscord\plugins`

Restart discord and it should show up like so:

![](https://i.imgur.com/lyWHjmT.png)

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

![](https://i.imgur.com/ruybwfM.png)


Links that can be used:


Youtube video: `https://www.youtube.com/watch?v=9sgTdjmTiL4`


Youtube playlist: `https://www.youtube.com/playlist?list=PLgA8PQBu3V3abH0MbSslHCeVToaa9keLE`


Direct link to any `MP4/WebM/OGG` file: `https://giant.gfycat.com/TenderAgileAsiaticlesserfreshwaterclam.webm`


Direct links work with websites such as Streamable and Gfycat. The link must also be https:// or the video will not play. It will autosave and update the video when link is added.

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
+ Discord: **Fugu#1064**
