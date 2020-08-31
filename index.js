const nodeExternals = require('webpack-node-externals')

function modify({ allowlist }) {
    return (config, { target, dev }) => {
        //this describes here my goal
        //https://github.com/jaredpalmer/razzle/issues/689

        //if production build just to what the normal razzle to
        if (!dev) return config

        //when target is node we need to add the node-external for hte modules that we are interested
        if (target === 'node') {
            config.externals = [
                nodeExternals({
                    allowlist: [
                        'webpack/hot/poll?300',
                        /\.(eot|woff|woff2|ttf|otf)$/,
                        /\.(svg|png|jpg|jpeg|gif|ico)$/,
                        /\.(mp4|mp3|ogg|swf|webp)$/,
                        /\.(css|scss|sass|sss|less)$/,
                        ...allowlist
                    ].filter((x) => x)
                })
            ]
        }
        return config
    }
}

module.exports = {
    modify
}