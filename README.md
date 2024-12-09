
When deploying the website, make sure to use SSH keys into github and publish the files there in a repository and monitor there all changes you do to the website so you can change back to anything at any time and you don't lose the website.
But also make copies of the website.

To update SASS files you will need to use a sass compiler, for this project I am using Live Sass Compiler in VS Code extensions. 
After downloading, go to settings and search for Live Sass Compiler format, edit in settings.json and choose the format you want it in, here I am using:
        {
            "format": "compressed",
            "extensionName": ".css",
            "savePath": "/css"
        }

Then live compile the sass file by clicking watch sass file in the bottom of the window.
Then import the created css file into the main index html file as a stylesheet, but keep using the cdn link for the javascript bootstrap.

When downloading a repository from github with node_modules in it, you will have to write npm install in the terminal to reinstall all the dependencies into node_modules as they are automatically ignore by github.