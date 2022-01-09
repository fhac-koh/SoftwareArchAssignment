import React from "react";
import ReactDOM from "react-dom";

type HelloProps = {
    name: string;
};

export const Hello: React.FC<HelloProps> = (props: HelloProps) => {
    const name: string = props.name;
    const testfetch: unknown = () => {
        fetch(`http://localhost:3000/api/test`).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <h1>Hello {name}</h1>
            {testfetch}
        </div>
    );
};

ReactDOM.render(<Hello name={"aa"} />, document.getElementById("index"));
