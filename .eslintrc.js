module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    babelOptions: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    }
  }
}; 