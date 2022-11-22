import { createGlobalStyle } from "styled-components";

const GeneralStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow-x: hidden;
    font-family: "Poppins", sans-serif;
    background-color: #f6f6f6;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
}

button, input {
    border: none;
    outline: none;
    font-family: 'Poppins', sans-serif;
}
`;

export default GeneralStyles;
