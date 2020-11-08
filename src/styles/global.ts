import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: #f0f0f0;
    overflow-x: hidden;
  }

  ul, ol{
    list-style-position: inside;
    margin-left: 16px;
  }

  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }

  code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }

`
