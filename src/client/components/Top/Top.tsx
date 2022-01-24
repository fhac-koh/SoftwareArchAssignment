import React, { useEffect, useState } from "react";

type ResponseProps = {
    test: string;
};

export const Top: React.FC = () => {
    const name = "test";
    const [data, setData] = useState<ResponseProps>({ test: "null" });
    useEffect(() => {
        function testfetch() {
            fetch(`${process.env.REACT_APP_SERVER_HOST}/api/test`)
                .then((res) => {
                    res.json().then((json) => {
                        setData(json);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        testfetch();
    }, []);

    return (
        <div>
            <h1>Top {name}</h1>
            {data.test}
        </div>
    );
};
