How to Start Visual Studio Code
===

[参考链接: https://code.visualstudio.com/docs](https://code.visualstudio.com/docs)

## 1. Setup ##

从 
[https://code.visualstudio.com/docs?dv=win](https://code.visualstudio.com/docs?dv=win)
中找到 Download VS Code ，进行下载安装。
然后打开本文档，使用下图所示的按键进行预览：

![预览按键](src/p1.png)

## 2. Quick Start ##

打开链接：[https://code.visualstudio.com/docs/editor/codebasics](https://code.visualstudio.com/docs/editor/codebasics)，阅读方法：
* 先看大标题，如：    
    ### Files, Folders & Projects ###
    ### Basic Layout ###
    ### Side by Side Editing ###
    ### Explorer ###
    .....
    
    理解大标题的意思，这部分讲的是VSCode的界面组成部分，以及各部分有什么功能，很多功能在其他的编辑器中也有使用，对照标题含义适当快速浏览或者跳过自己熟悉的部分，然后找到自己不熟悉的地方进行该段落的仔细阅读。

* 再看图示，图示基本上概括了某一小节的内容。

* 再看黑体字， 如:
    **File > Preferences > User Settings** .....

    这样的粗体字一般代表的是特定名词，比如File指的是菜单栏上的File，这是一个控件的名称，出现这种样式的文字一般代表一种功能或者一种设置的具体步骤或者目标名称。

* 再看这种红色的单词，如：``\*.cs.meta``, 这样的一般代表某种文件名，或者配置文件中的某项属性以及属性值，这一版告诉你

* 这种蓝色的单词，如：`` Ctrl+S ``, 这样的代表一些快捷键, 经常用的除了``Ctrl+C``, ``Ctrl+X``, ``Ctrl+Z``之外，或许还会常用``Ctrl+D``，VSCode快捷键可以通过百度搜索，将你常用的记下来。VSCode的快捷键可以进行自定义配置，安装插件可以增加快捷键的种类与功能。

## 3. My Advise ##

* 首先，[IntelliSense](https://code.visualstudio.com/docs/languages/javascript)，如何设置，详细的看这个链接，简单说，就是：
    + 先安装npm，npm的介绍在这里[ npm ](http://www.runoob.com/nodejs/nodejs-npm.html)
    + ```Ctrl+\```可以打开当前路径下的cmd（Windows），当然你首先得```cd```到你需要写代码的工程文件夹下，使用```npm install tsd 或者 npm install typings```， typings是VSCode建议使用并用来代替tsd的，它主要是可以用来将ts文件编译成js文件的
    + 使用```tsd install jQuery```来安装jQuery的tsd文件，该文件使用typeScript定义了jQuery所需要的类型以及其API，可以用来做智能提示，也可以使用```typings install jQuery```来下载tsd文件，
    + 如果你同时使用这两个工具进行下载，你会发现下载的文件会有所区别。如果你并不明确知道你所需要的模块的名字，可以使用```tsd query node[a-z]+```这条命令搭配正则表达式进行搜索，或者干脆```tsd install node[a-z]+```将匹配到的字符串的模块全部下载，同样，在typings这个工具里，不是使用query而是使用search来搜索模块，
    + 经过上面的步骤，你会发现仍然使用不了智能提示，因为缺少一个配置文件```jsconfig.json```：这是
[详细内容](https://code.visualstudio.com/docs/languages/javascript#_javascript-project-jsconfigjson)。
你只需要新建一个这个文件，然后抄上这段配置代码：
        ```
        {
            "compilerOptions": {
                "target": "ES6"
            },
            "exclude": [
                "node_modules"
            ]
        }
        ```
        就可以使用智能提示了，不过，智能提示只限于啊你下载了tsd文件的模块。

* 然后，你需要装几个插件：比如```ESLint```，```Path Intellisense```等等。使用关键字进行搜索，比如，关于搜索可以阅读VSCode的帮助文档进行学习。

* 再者，在```文件 > 首选项 > 用户代码片段(Snippets)```，你可以自定义自己的代码段，使用几个字母就可以打出一群自己经常用但却写法很固定的代码，如何写，在其中有示例。

* 最后，在```文件 > 首选项 > 用户设置(Setting)```中，你会看到VSCode默认设置，你可以将设置复制到你的用户设置文件里，对默认设置进行覆盖，设置中除了CSS以及后面的Html5还有其他的一些设置之外，基本上都用中文注明该设置的作用了。

* 再最后，如果感觉有什么想用的但没有，那就看一下如何写插件，这个早晚都得接触的。

* 再在最后，学习一下使用markdown吧，这个用来写文档还是很不错的，推荐学习网站：[Markdown 编辑器语法指南](https://segmentfault.com/markdown)。Markdown完全兼容html，复杂的效果完全可以使用html进行编写，不过这就背离了Markdown的初衷了。

## 4. More ##

当你需要写html时，首先需要编辑器VSCode支持对html标签的自动补全，因此你可以下载插件：

![插件下载](src/p2.png)

下载了插件就可以对需要语言进行支持了。

这里有一个中文VSCode帮助计划：[中文帮助计划](https://github.com/jeasonstudio/CN-VScode-Docs)，阅读该文档可以加速掌握该编辑器的速度。

下面就是我写的代码的支持效果：

![JavaScript支持](src/p3.png)

![Html的支持](src/p4.png)
