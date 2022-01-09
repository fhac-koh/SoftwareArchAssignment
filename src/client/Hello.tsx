import React, { useEffect, useState } from "react";

type HelloProps = {
    name: string;
};

type ResponseProps = {
    test: string;
}

export const Hello: React.FC<HelloProps> = (props: HelloProps) => {
    const name: string = props.name;
    const [data, setData] = useState<ResponseProps>({test: "null"})
    useEffect(() => {
        function testfetch() {
            fetch(`http://localhost:8080/api/test`).then(res => {
                res.json().then(json => {
                    setData(json)
                })
            }).catch(err => {
                console.log(err)
            });
        };
        testfetch()
    }, [])

    return (
        <div>
            <h1>Hello {name}</h1>
            {data.test}
        </div>
    );
};
