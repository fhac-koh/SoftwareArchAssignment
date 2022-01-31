import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from "react";

import { InputForm } from "#c/components/Home/InputForm/InputForm";
import { NewMemoList } from "#c/components/Home/NewMemoList/NewMemoList";

import "#c/components/Home/Home.css";

interface requireAbstract {
    requireReload: boolean;
    setRequireReload: Dispatch<SetStateAction<boolean>>;
}

export const StatusContext = createContext<requireAbstract>({
    requireReload: true,
    setRequireReload: {} as Dispatch<SetStateAction<boolean>>,
});

export const Home: React.FC = () => {
    const [requireReload, setRequireReload] = useState(true);
    const homeState: requireAbstract = {
        requireReload: requireReload,
        setRequireReload: setRequireReload,
    };

    return (
        <div id="Home--Base">
            <StatusContext.Provider value={homeState}>
                <div id="Home--Input">
                    <InputForm />
                </div>
                <div id="Home--NewList">
                    <NewMemoList />
                </div>
            </StatusContext.Provider>
        </div>
    );
};
