import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { NavHeader } from "#c/components/NavHeader/NavHeader";
import { Home } from "#c/components/Home/Home";
import { MemoList } from "#c/components/MemoList/MemoList";
import { MemoDetail } from "#c/components/MemoDetail/MemoDetail";
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
                            path={InnerPaths.memoDetail(":memoId")}
                            element={<MemoDetail />}
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
