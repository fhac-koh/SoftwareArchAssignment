import React from "react";

type HelloProps = {
    name: string;
};

const Hello: React.FC<HelloProps> = ({ name }) => <h1>Hello, {name}</h1>;

export default Hello;
