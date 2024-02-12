import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BuildOptions} from './types/types';
import {ModuleOptions} from 'webpack';
import ReactRefreshTypeScript  from 'react-refresh-typescript'
import {buildBabelLoader} from './buildBableLoader';


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'
    const isProd = options.mode === 'production'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                           name: 'convertColors',
                           params: {
                               currentColor: true
                           }
                        }
                    ]
                }
            }}],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },

        },
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            //Порядок лоудеров важен
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",

        ],
    }

    const babelLoader = buildBabelLoader(options)

    const tsLoader = {
        test: /\.tsx?$/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
            }
        }],
        exclude: /node_modules/,
    }

    return [
        cssLoader,
        /*tsLoader,*/
        babelLoader,
        assetLoader,
        svgrLoader
    ]
}