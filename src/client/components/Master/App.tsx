import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { NavHeader } from "#c/components/NavHeader/NavHeader";
import { MemoList } from "#c/components/MemoList/MemoList";
import { Home } from "#c/components/Home/Home";
import { InnerPaths } from "#c/routes/InnerPaths";

import "#c/components/Master/App.css";

export const App: React.FC = () => {
    return (
        <div id="App--Base">
            <BrowserRouter>
                <NavHeader />
                <div id="App--Content">
                    <Routes>
                        <Route path={InnerPaths.home} element={<Home />} />
                        <Route
                            path={InnerPaths.memoList}
                            element={<MemoList />}
                        />
                        <Route
                            path="/*"
                            element={<Navigate to={InnerPaths.home} replace />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};
