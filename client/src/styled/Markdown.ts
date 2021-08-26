import styled from 'styled-components';

interface mds {
  taskDetail?: boolean;
}

export const MarkdownStyles = styled.div<mds>`
width: 100%;
overflow-x: hidden;
overflow-y: auto;
height: ${(props) => props.taskDetail ? '70vh' : '60vh'};
padding: 7px;

* {
  word-break: break-word !important;
}

pre { 
  white-space: pre-wrap;
  overflow-x: auto; 
  tab-size: 2; 
  width: min-content;
  max-width: 700px;
  @media only screen and (max-width: 1378px) {
    max-width: 500px;
  }
  @media only screen and (max-width: 1168px) {
    max-width: 400px;
  }
  @media only screen and (max-width: 1023px) {
    max-width: 700px;
  }
  @media only screen and (max-width: 793px) {
    max-width: 500px;
  }
  @media only screen and (max-width: 593px) {
    max-width: 300px;
  }
  @media only screen and (max-width: 399px) {
    max-width: 260px;
  }
  @media only screen and (max-width: 340px) {
    max-width: 230px;
  }
}
/* Blocks
=============================================================================*/

p, blockquote, ul, ol, dl, table, pre {
  margin: 15px 0;
}

ul > li {
  list-style: disc;
}
ol > li {
  list-style: decimal;
}

input[type="checkbox"]{
  margin-top:0 !important;
}

/* Headers
=============================================================================*/

h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
}

h1 tt, h1 code, h2 tt, h2 code, h3 tt, h3 code, h4 tt, h4 code, h5 tt, h5 code, h6 tt, h6 code {
  font-size: inherit;
}

h1 {
  font-size:2em;
  color:#000;
}

h2 {
  font-size:1.6em;
  color:#111;
}

h3 {
  font-size:1.2em;
  color:#222;
  }

h4 {
  font-size:1em;
  color:#333;
}

body>h2:first-child, body>h1:first-child, body>h1:first-child+h2, body>h3:first-child, body>h4:first-child, body>h5:first-child, body>h6:first-child {
  margin-top: 0;
  padding-top: 0;
}

a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
  margin-top: 0;
  padding-top: 0;
}

h1+p, h2+p, h3+p, h4+p, h5+p, h6+p {
  margin-top: 10px;
}

/* Links
=============================================================================*/

a {
  color:#dd0000;
  text-decoration:none;
}
a:hover {
  color:#333333;
  text-decoration:underline;
}

/* Lists
=============================================================================*/

ul, ol {
  padding-left: 30px;
}

ul li > :first-child, 
ol li > :first-child, 
ul li ul:first-of-type, 
ol li ol:first-of-type, 
ul li ol:first-of-type, 
ol li ul:first-of-type {
  margin-top: 0px;
}

ul ul, ul ol, ol ol, ol ul {
  margin-bottom: 0;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px;
}

dl dt:first-child {
  padding: 0;
}

dl dt>:first-child {
  margin-top: 0px;
}

dl dt>:last-child {
  margin-bottom: 0px;
}

dl dd {
  margin: 0 0 15px;
  padding: 0 15px;
}

dl dd>:first-child {
  margin-top: 0px;
}

dl dd>:last-child {
  margin-bottom: 0px;
}

/* Code
=============================================================================*/

pre, code, tt {
  font-size: 12px;
  font-family: Consolas, "Liberation Mono", Courier, monospace;
}

code, tt {
  margin: 0 0px;
  padding: 0px 0px;
  white-space: nowrap;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
  border-radius: 3px;
}

pre>code {
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent;
  word-wrap: break-word;
}

pre {
  background-color: #f8f8f8;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 10px 15px;
  border-radius: 3px;
}

pre code, pre tt {
  background-color: transparent;
  border: none;
}

kbd {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: #DDDDDD;
    background-image: linear-gradient(#F1F1F1, #DDDDDD);
    background-repeat: repeat-x;
    border-color: #DDDDDD #CCCCCC #CCCCCC #DDDDDD;
    border-image: none;
    border-radius: 2px 2px 2px 2px;
    border-style: solid;
    border-width: 1px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 10px;
    padding: 1px 4px;
}

/* Quotes
=============================================================================*/

blockquote {
  border-left: 4px solid #DDD;
  padding: 0 15px;
  color: #777;
}

blockquote>:first-child {
  margin-top: 0px;
}

blockquote>:last-child {
  margin-bottom: 0px;
}

/* Horizontal Rules
=============================================================================*/

hr {
  clear: both;
  margin: 15px 0;
  height: 0px;
  overflow: hidden;
  border: none;
  background: transparent;
  border-bottom: 2px solid #ddd;
  padding: 0;
}

/* Table
=============================================================================*/

table {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 1em 0;
  width: 100%;
  max-width: 100%;
  border-width: 1px; 
  border-style: solid;
  background-color: transparent; 
}

table, table tr, table tr td, table tr th {
  border-color: #e5e5e5; 
} 

table th {
  color: #666666; 
  background-color: #fdfdfd; 
} 

tr th, tr td {  
  padding: 6px 13px;    
}

table tbody > tr:nth-child(odd) > td,table tbody > tr:nth-child(odd) > th {
  background-color: #f9f9f9; 
}

/* Images
=============================================================================*/

img {
  max-width: 100%
}
`;
