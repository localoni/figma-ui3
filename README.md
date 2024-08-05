# Enable Figma UI3 for Windows and MacOS

## Guide
1. Install [Proxyman](https://proxyman.io/)
2. Add script using **Scripting**
3. Save script
4. Open context menu in Figma (arrow icon in right corner on top) and select **Help** -> **Troubleshooting** -> **Clear Cache and Restart**
5. Relogin and enjoy!

> [!NOTE]
> It will work only with default Figma app version, not working for Figma Beta app

## Matching Rule
> URL: `https:\/\/.*figma-.*\.min\.js\.br$` 
> Any / Use Regex

## Script code
```
async function onResponse(context, url, request, response) {
    try {
        console.log('URL fetched successfully:', url);
        if (url.includes('figma_app-') && url.includes('.min.js.br') && !url.includes('runtime~figma_app')) {
            console.log('URL matches pattern');
            let data = response.body;

        // Use string replacement methods
        let modifiedContent = data.replace(/e\?"ui3":"ui2"/g, '"ui3"');
        modifiedContent = modifiedContent.replace(/c\(e\)?"ui3":"ui2"/g, '"ui3"');
        modifiedContent = modifiedContent.replace(/version:"ui2",/g, 'version:"ui3",');
        modifiedContent = modifiedContent.replace(/initialVersion:a="ui2"}\)/g, 'initialVersion:a="ui3"})');
        modifiedContent = modifiedContent.replace(/"ui2"===o.version/g, "false");

        console.log('Content modified');
        response.body = modifiedContent;
    } else {
        console.log('URL does not match pattern');
    }
} catch (error) {
    console.log('Error fetching URL:', error);
}

return response;

}
```
