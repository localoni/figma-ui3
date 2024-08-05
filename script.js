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
