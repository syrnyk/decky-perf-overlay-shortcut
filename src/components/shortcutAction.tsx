import { FC, useEffect } from "react";
import { Button, Input } from "./input";
import { perfStore } from "./perfStore";

export const ShortcutAction: FC<{}> = () => {
    const state: State = new State();

    useEffect(() => {
        console.log("PerfOverlayShortcut - init state: " + JSON.stringify(state));
        state.onStateChanged(onStateChanged);
        const suspend_register = SteamClient.User.RegisterForPrepareForSystemSuspendProgress((() => {
            console.log("PerfOverlayShortcut - set state false on suspend registered: " + JSON.stringify(state));
            state.setState(false);
        }));
        console.log("PerfOverlayShortcut - setting input for shortcut");
        const input = new Input([Button.START, Button.SELECT]);
        input.onShortcutPressed(onShortcutPressed);
        return () => {
            console.log("PerfOverlayShortcut - action ended");
            state.offStateChanged(onStateChanged);
            suspend_register.unregister();
            input.offShortcutPressed(onShortcutPressed);
            input.unregister();
        };
    }, []);

    const onShortcutPressed = () => {
        state.setState(!state.getState());
        console.log("PerfOverlayShortcut - on shortcut pressed > new state: " + JSON.stringify(state));
    }

    const onStateChanged = () => {
        console.log("PerfOverlayShortcut - on state changed called: " + JSON.stringify(state));
        var steamindex: number = perfStore.getSteamIndex();
        if (steamindex === 4) {
            steamindex = 0; 
        } else {
            steamindex += 1;
        } 
        perfStore.setSteamIndex(steamindex);
    }
    return <></>;
}

export class State {
    private state = false;
    private onStateChangedListeners: Array<(b: boolean) => void> = [];

    onStateChanged(callback: (b: boolean) => void) {
        this.onStateChangedListeners.push(callback);
    }

    offStateChanged(callback: (b: boolean) => void) {
        const index = this.onStateChangedListeners.indexOf(callback);
        if (index !== -1) {
            this.onStateChangedListeners.splice(index, 1);
        }
    }

    setState(b: boolean) {
        if (this.state === b)
            return;

        this.state = b;
        this.onStateChangedListeners.forEach(callback => {
            callback(b);
        });
    }

    getState(): boolean {
        return this.state;
    }
}

