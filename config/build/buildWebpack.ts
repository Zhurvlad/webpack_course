import webpack from 'webpack';
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildDevServer} from './buildDevServer';
import {buildLoaders} from './buildLoader';
import {buildPlugins} from './buildPlugins';
import {buildResolvers} from './buildResolvers';
import {BuildOptions} from './types/types';

type Mode = 'production' | 'development'

interface EnvVariables {
    mode: Mode,
    port: number
}

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const isDev = options.mode === 'development'
    const isProd = options.mode === 'production'

    return {
        mode: options.mode ?? 'development',
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },

        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    }
}