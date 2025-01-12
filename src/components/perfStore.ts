import { findModuleChild, sleep } from "decky-frontend-lib";

export class perfStore {

    private static perfStore: any;

    public static async init() {
        try {
            console.log("PerfOverlayShortcut - started perfStore retrieval");
            var perfStoreClass;
            var count = 0;
            while(!this.perfStore){
                perfStoreClass = findModuleChild((m: any) => {
                    if (typeof m !== "object") return undefined;
                    for (let prop in m) {
                        //if module found contains fps limit prop, keep it and use it to get/set perf overlay level
                        if (m[prop]?.prototype?.SetFPSLimit) return m[prop];
                    }
                });
                this.perfStore = perfStoreClass?.Get();
                console.log("PerfOverlayShortcut - perfStore found: " + JSON.stringify(this.perfStore));
                await sleep(100);
                count++;
                if(count>=10){
                    console.error("PerfOverlayShortcut - perfStore not found");
                }
            }
        } catch(e) {
            console.error(e)
        }

    }

    public static getPerfStore(){
        return this.perfStore
    }

    public static getSteamIndex(){
        if(!this.perfStore||this.perfStore?.msgSettingsGlobal?.perf_overlay_level==undefined){
            return -1;
        }
        switch(this.perfStore?.msgSettingsGlobal?.perf_overlay_level){
            case(0):
                return 0;
            case(4):
                return 1;
            case(1):
                return 2;
            case(2):
                return 3;
            case(3):
                return 4;
            default:
                return -1;
        }
    }

    public static setSteamIndex(index:number){
        if(!this.perfStore||!this.perfStore?.SetPerfOverlayLevel){
            return false;
        }
        var target=0;
        switch(index){
            case(0):
                target = 0;
                break;
            case(1):
                target = 4;
                break;
            case(2):
                target = 1;
                break;
            case(3):
                target = 2;
                break;
            case(4):
                target = 3;
                break;
            default:
                return false;
        }
        try {
            this.perfStore?.SetPerfOverlayLevel(target);
        } catch {
            return false;
        }
        return true;
    }
}