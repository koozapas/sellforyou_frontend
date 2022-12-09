const path = require("path");
const {
    override,
    addLessLoader,
    addWebpackPlugin,
    overrideDevServer
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
    stylesDir: path.join(__dirname, "./src/assets/styles"),
    antDir: path.join(__dirname, "./node_modules/antd"),
    varFile: path.join(__dirname, "./src/assets/styles/vars.less"),
    themeVariables: ["@primary-color"],
    indexFileName: "index.html"
};
// const reactAppRewirePostcss = require('react-app-rewire-postcss');
// const postcssNesting = require('postcss-nested');


// module.exports = override(
//     // fixBabelImports("antd", {
//     //     libraryName: "antd",
//     //     libraryDirectory: "es",
//     //     style: true
//     // }),
//     addWebpackPlugin(new AntDesignThemePlugin(options)),
//     addLessLoader({
//         lessOptions: {
//             javascriptEnabled: true
//         }
//     }),
//     // reactAppRewirePostcss(config, {
//     //     plugins: () => [postcssNesting]
//     // })
// );

const devServerConfig = () => config => {
    return {
        ...config,
        historyApiFallback: true
    }
}

// http 실패 처리
module.exports = {
    webpack: override(
        addWebpackPlugin(new AntDesignThemePlugin(options)),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true
            }
        })
    ),
    devServer:overrideDevServer(devServerConfig())
}