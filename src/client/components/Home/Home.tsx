import React, { createContext, Dispatch, SetStateAction, useState } from "react";

import { InputForm } from "#c/components/Home/InputForm/InputForm";
import { NewMemoList } from "#c/components/Home/NewMemoList/NewMemoList";

import "#c/components/Home/Home.css";

interface requireAbstract{
    requireReload: boolean,
    setRequireReload: Dispatch<SetStateAction<boolean>>
}

export const StatusContext = createContext<requireAbstract>({
    requireReload: true,
    setRequireReload: {} as Dispatch<SetStateAction<boolean>>
});

export const Home: React.FC = () => {
    const [requireReload, setRequireReload] = useState(true);
    const homeState : requireAbstract = {
        requireReload: requireReload,
        setRequireReload: setRequireReload
    }

    console.log("home");
    console.log("now", requireReload);
    const [addisional, setAddisional] = useState<DataProps[]>([]);
    const add = {
        addisional: addisional,
        setAddisional: setAddisional
    }

    return (
        <div id="Home--Base">
            <testContext.Provider value={add}>
            <StatusContext.Provider value={homeState}>
                <div id="Home--Input">
                    <InputForm />
                </div>
                <div id="Home--NewList">
                    <NewMemoList />
                </div>
            </StatusContext.Provider>
            </testContext.Provider>
        </div>
    );
};



export const testContext = createContext({
    addisional: [] as DataProps[],
    setAddisional: {} as Dispatch<SetStateAction<DataProps[]>>
})

interface DataProps {
    key: string,
    title: string,
    date: string
}
