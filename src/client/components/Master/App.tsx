import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { NavHeader } from "#c/components/NavHeader/NavHeader";
import { MemoList } from "#c/components/MemoList/MemoList";
import { Top } from "#c/components/Top/Top";
import { InnerPaths } from "#c/routes/InnerPaths";

import "#c/components/Master/App.css";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NavHeader />
            <Routes>
                <Route path={InnerPaths.top} element={<Top />} />
                <Route path={InnerPaths.memoList} element={<MemoList />} />
                <Route
                    path="/*"
                    element={<Navigate to={InnerPaths.top} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};
