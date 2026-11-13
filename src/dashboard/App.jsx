import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { CollectionEditor } from "./components/CollectionEditor";
import { Layout } from "./components/Layout";
import { Overview } from "./components/Overview";
import { ReferencePage } from "./components/ReferencePage";
import {
  DataProvider,
  DirtyProvider,
  ToastProvider,
} from "./providers";

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <DirtyProvider>
          <DataProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Overview />} />
                <Route path="collections/:key" element={<CollectionEditor />} />
                <Route path="reference/:kind" element={<ReferencePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </DataProvider>
        </DirtyProvider>
      </ToastProvider>
    </HashRouter>
  );
}
