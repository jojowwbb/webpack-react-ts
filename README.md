### 前端开发环境安装与配置(React+Webpack5+TS+ESLint+Prettier)

#### 前言

这篇文章更多的意义在于记录吧，同时也分享一下。

其实前端脚手架有很多。比如非常流行的 create react app，一个命令就完成我们的开发环境搭建。省心省力，能让我们更加的专注于业务的开发。

我个人还是习惯自己搭建开发环境。

-   可以更大程度的对项目进行掌控
-   可以更好的理解我们使用的工具，比如 loader 的使用，各种插件的集成方式，遇到问题、知道怎么去处理
-   可以自由的订制适合项目的的集成环境，使项目整洁干净，可能是强迫症导致的，😄
-   可以深入理解前端工程化的整个生命周期，开发，部署，集成，团队的协作

这篇文章、是记录如何搭建一个 webpack+ts+react 的前端开发环境的；

#### 依赖的包

-   [x] webpack v5
-   [x] webpack-dev-server
-   [x] typescript
-   [x] react
-   [x] eslint
-   [x] prettier

简单的介绍一下每个包的作用吧

##### webpack

用于打包我们的 js 代码、对于非 js 代码、我们通过 webpack 的 loader 来处理，比如我们使用的 ts 文件，我们就可以安装 ts-loader 来扩展 webpack 的打包能力

##### Webpack-dev-server

提供一个 web server，用于实时预览我们开发的页面。并且打包的文件是放在内存当中的；

##### typescript

现如今，typescript 应该是大势所趋，不得不学、不得不会呀！

#### react

这就是我们开发页面的主要的 ui 框架

##### eslint

代码检查、团队合作的时候保证代码风格的工具

##### prettier

格式化我们的代码、保证团队合作的时候代码统一

#### 开始搭建

##### 初始化一个目录

首先、我们新建一个工程目录、然后初始化它，后续所有的操作都在该目录下`webpack-react-ts`;

执行以下命令:

```shell
mkdir webpack-react-ts

cd webpack-react-ts

npm init -y
```

> 提示
>
> 由于我使用的是 npm 包管理器。所以我执行的 npm  init -y。当然你可以使用别的包管理器。比如：`yarn`

##### 安装 webpack

执行以下命令：

```shell
npm install -D webpack webpack-cli webpack-dev-server
```

> 注意
>
> npm 命令参数
>
> -D, --save-dev // 表示 devDependencies
>
> -S, --save //表示 dependencies

然后，在`package.json`中添加俩个`npm script`命令,用于执行`webpack`;

下面是 package.json 的配置

```json
{
    "name": "webpack-react-ts",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack serve", //用于本地开发
        "build": "webpack" //用于打包
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "webpack": "^5.71.0",
        "webpack-cli": "^4.9.2",
        "webpack-dev-server": "^4.7.4"
    }
}
```

这样 webpack 就安装好了。我们来写个例子来验证一下！

我们在项目根目录下添加一个`webpack.config.js`配置文件，然后新建一个入口文件`src/index.js`来测试一下；

```javascript
// webpack.config.js
const path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
    },
}
```

```javascript
// src/index.js
// 在页面上显示hello world
function hello() {
    document.body.innerText = 'hello world'
}
hello()
```

执行命令

```shell
npm run build
```

这时我们发现已经在`dist`目录下、生成了我们打包好的文件；

然后我用`webpack-dev-server` ，`html-webpack-plugin`来看看打包的代码对不对！

> html-webpack-plugin 会自动帮我生成打包好后的 html 运行环境。
>
> 也就是说，会自动生成包含了打包后的 js 文件的 html 页面，这样我们就能直接在浏览器中查看、不需要手动去编写 html 文件

安装 `html-webpack-plugin`

```shell
npm i -D html-webpack-plugin
```

配置插件，在 webpack.config.js 中添加一个 plugins 配置；

```javascript
const HtmlWebpackPlugin=require('html-webpack-plugin')
...
plugins:[
  new HtmlWebpackHtml({
    //使用pulibc目录下的index.html文件作为模块来生成页面
    template:'./public/index.html'
  })
]
...
```

执行命令

```shell
npm run dev
```

打开浏览器（http://localhost:8080）

> 我们也可以在 webpack.config.js 中配置自动打开浏览器选项

看到浏览器上显示 hello world;

至此、webpack 已经安装好

##### 安装 typescript

由于我们采用 ts 来开发，所以只要安装 typescript 和 ts-loader 来处理我们的脚本就行了，不再需要 babel-loader 了;

```shell
npm i -D typescript ts-loader
```

然后再根目录下执行 tsc --init 来生成 tsconfig.json 配置文件

```shell
tsc --init
```

我们可以按需修改该配置、来符合我们的项目！

这里呢，我给出一个例子;

```json
{
    "compilerOptions": {
        "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
        "jsx": "react", //后面添加react的时候、需要配置这个属性
        "allowJs": true, //
        "module": "commonjs" /* Specify what module code is generated. */,
        "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    },
    "include": ["./src/*"]
}
```

接下来、我们来测试一下`typescript`是否配置完成；

按照约定、typescript 的文件使用`.ts`作为后缀。对于 webpack 来说`.ts`不是一个 js 模块，需要引入专门的 loader 来处理；

这里、我们需要用 ts-loader 来加载、解析 ts 文件。

所以我们给 webpack 添加一个 loader 配置。

```javascript
...
module:{
  rules:[{
    test: /\.tsx?$/,//由于后续react组件的文件类型为tsx,所以都要使用ts-loader来处理
    use: [
      {
        loader: 'ts-loader',
      },
    ]
  }]
}
...
```

然后把我们的刚刚创建的 app.js 文件名称，改成 app.ts。webpack 配置里面的 entry 入口文件名字、也改成 app.ts;

执行 rum run dev,

页面也正常；

##### 安装 react

```shell
npm i -S react react-dom
```

我们知道 typescript 是通过类型声明来检查代码的！如果没有类型声明文件、将会检查失败！

对于非 typescript 编写的，或者没有导出类型声明文件的第三方模块。我们都需要自己编写一个类型声明文件。

当然，对于 react 来说，我们有现成的，直接使用就好！

```shell
npm i -D @types/react @types/react-dom
```

编写一个 react 组件。这里呢，我们使用 jsx 来编写 react 组件，按照约定呢，我们的组件文件名称需要用`.tsx`

```javascript
//Hello.tsx
import React, { FC } from 'react'

interface IProps {
    name: string;
}
//函数式组件
const Hello: FC<IProps> = (props) => {
    return <h1>hello {props.name}</h1>
}

export default Hello
```

在写一个 react 入口组件，来测试一下

我们直接来修改 app.ts 文件

```javascript
// app.ts --> app.tsx
import React from 'react'
import { render } from 'react-dom'
import Hello from './Hello'
//我们还需要在html文件中添加一个div#root 用于挂载react组件
render(<Hello name="jojo" />, document.getElementById('root'))
```

> 提示
>
> 这里呢、我们引用的 Hello 组件没有添加.tsx 后缀。
>
> 因为我们在 webpack 配置文件中添加了 resolve 配置，用于自动匹配后缀；

```javascript
//webpack.config.js
...
resolve:{
    extensions: ['.ts', '.tsx', '.js'],
},
...
```

至此，我们的 webpack+react+ts 就配置完成了！

后面呢、我们继续来配置团队合作时的一些工程化配置。比如 eslint，prettier

##### 安装 eslint

执行以下命令:

```shell
npm i -D eslint
npx eslint --init
```

> 提示
>
> npx 是用于执行项目下安装的模块命令。如：
>
> 我们在项目下安装了 webpack 模块，但是我们并不能直接在命令行执行 webpack 命令。
>
> 只能使用以下方式执行，或者添加到`package.json`脚本模块中去执行
>
> `node_modules/.bin/webpack`
>
> npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。
>
> 由于 npx 会检查环境变量`$PATH`，所以系统命令也可以调用；
>
> 而且 npx 随用随删，对于不存在的模块命令、会先去下载执行完后会删除模块；

我们通过`npx eslint --init`来安装 eslint 配置：

```shell
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

```shell
eslint-plugin-react@^7.28.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · No / Yes
```

这样，就生成一个 eslint 配置文件`.eslintrc.js`

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
}
```

##### 安装 prettier

prettier 是一个流行的代码格式化工具，支持的语言很多，比如 react，vue，js，ts，html，css...

执行以下命令:

```shell
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

> 提示
>
> 由于我们同时使用 prettier 和 eslint。有些配置选项会冲突，所以我们使用了第三方插件来解决配置冲突问题；
>
> eslint-config-prettier，eslint-plugin-prettier

我们在根目录下创建一个配置文件`.prettierrc.json`

```json
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true
}
```

然后把 prettier 添加到 eslint 配置中。修改`.eslintrc.js`文件

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/jsx-filename-extension': 'off', //允许在tsx中使用jsx语法
        'react/function-component-definition': [
            //由于前面我们使用函数式组件的写法、所以需要配置该选项，并且使用箭头函数
            2,
            { namedComponents: '"arrow-function' },
        ],
        'prettier/prettier': 2,
    },
}
```

配置完成后、我们需要重启一下编辑器(vscode);

##### 使用 eslint 和 prettier

在安装好 eslint 和 prettier 后、要怎么使用呢？

1. 通过命令行来使用:

```shell
npx eslint index.js --fix
```

2. 在 npm scripts 中使用

```javascript
"scripts": {
  "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}' --fix"
}
```

3. 使用插件（eslint,prettier）

    如果我们使用的是 vscode 的话、可以使用 eslint,prettier 插件

    我们可以配置在保存代码的时候、自动检测代码规则和自动格式化样式

##### 总结

1. 学习 webpack 的使用
2. webpack loader 的使用
3. typescript+react 的配置安装
4. eslint+prettier 的配合使用
5. 学习 npx 知识点
