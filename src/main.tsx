import { registerSW } from "virtual:pwa-register";

import "./styles/index.scss";
import { render } from "preact";

import { internalEmit } from "./lib/eventEmitter";

import { App } from "./pages/app";

export const updateSW = registerSW({
    onNeedRefresh() {
        internalEmit("PWA", "update");
    },
    onOfflineReady() {
        console.info("Ready to work offline.");
        // show a ready to work offline to user
    },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, document.getElementById("app")!);
