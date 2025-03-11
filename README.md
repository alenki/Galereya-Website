IMPORTANT
In carousel.json all elements .image url link is written with domain in the beginning, you'll have to change the domain in it if you change the domain of the site.
Слайдов именно в JSON файле не должно 3, они должны цикловаться, иначе баг появляется
Чтобы слайды цикловались, нужно добавить 3 слайда в json с айдишниками 1, 2, 3, потом скопировать их и еще раз добавить с айдишниками 4, 5, 6. Так, они добавятся на странице в таком виде: "1 2 3 1 2 3" (записаны как (1 2 3 4 5 6), но первые 3 и последние 3 одинаковые)
Основной слайд начинается с первой тройки: (. . O . . .), его айдишник в json: 3, айдишники второго и третьего слайдов: 1, 2
IMPORTANT



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


Hexidecimal Opacity converter table (Add the 2 digit HEX prefix to the end of the HEX code to change opacity)
Opacity %   255 Step        2 digit HEX prefix
0%          0.00            00
5%          12.75           0C
10%         25.50           19
15%         38.25           26
20%         51.00           33
25%         63.75           3F
30%         76.50           4C
35%         89.25           59
40%         102.00          66
45%         114.75          72
50%         127.50          7F
55%         140.25          8C
60%         153.00          99
65%         165.75          A5
70%         178.50          B2
75%         191.25          BF
80%         204.00          CC
85%         216.75          D8
90%         229.50          E5
95%         242.25          F2
100%        255.00          FF