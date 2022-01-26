import React from "react";

import { InputForm } from "#c/components/Home/InputForm/InputForm";
import { NewMemoList } from "#c/components/Home/NewMemoList/NewMemoList";

import "#c/components/Home/Home.css";

export const Home: React.FC = () => {
    console.log("home");
    return (
        <div id="Home--Base">
            <div id="Home--Input">
                <InputForm />
            </div>
            <div id="Home--NewList">
                <NewMemoList />
            </div>
        </div>
    );
};

// const name = "test";
//     const [data, setData] = useState<ResponseProps>({ test: "null" });
//     useEffect(() => {
//         function testfetch() {
//             fetch(`${process.env.REACT_APP_SERVER_HOST}/api/test`)
//                 .then((res) => {
//                     res.json().then((json) => {
//                         setData(json);
//                     });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//         testfetch();
//     }, []);

//     return (
//         <div>
//             <h1>Top {name}</h1>
//             {data.test}
//         </div>
//     );
