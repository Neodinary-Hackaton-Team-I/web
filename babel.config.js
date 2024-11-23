module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Native Wind 설정
    ['nativewind/babel'],
    // Alias 설정
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@app': './src/app',
          '@routes': './src/app/routes',
          '@widgets': './src/widgets',
          '@screens': './src/screens',
          '@assets': './src/shared/assets',
          '@axios': './src/shared/axios',
          '@zustand': './src/shared/zustand',
        },
      },
    ],
  ],
};
