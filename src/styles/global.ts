import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    background:#fefefe;
    color:#000000;
    font-family: 'Poppins', sans-serif;
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fefefe;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0e0e0e;
  border-radius: 10px;
}

`;
