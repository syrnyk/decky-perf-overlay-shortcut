import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  staticClasses
} from "@decky/ui";
import { ShortcutAction } from "./components/shortcutAction";
import { routerHook } from "@decky/api";
import { LogoIcon, SELECT, START } from "./components/icons";
import { perfStore } from "./components/perfStore";

function PerfOverlayShortcutMenu() { 
  const version = ""; //TODO: retrieve version from package.json here
  return (
    <PanelSection>
      <PanelSectionRow>
        <div className={staticClasses.Text} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          Press SELECT <SELECT style={{ height: "24px", width: "auto", marginBottom: "-6.5px" }} /> + START <START style={{ height: "24px", width: "auto", marginBottom: "-6.5px" }} /> to switch between performance overlay levels.
        </div>
      </PanelSectionRow>
      <PanelSectionRow>
          <div className={staticClasses.Text} style={{ marginLeft:"auto", marginRight:0 }}>
            {version}
          </div>
      </PanelSectionRow>
    </PanelSection>
  )
}

export default definePlugin(() => {
  console.log("PerfOverlayShortcut - plugin frontend startup");
  perfStore.init() // initializing perfStore that will be used to get/set perf overlay level on shortcut press
  routerHook.addGlobalComponent("ShortcutAction", () => (<ShortcutAction />));

  return {
    title: <div className={staticClasses.Title}>Perf Overlay Shortcut</div>,
    icon: <LogoIcon />,
    content: <PerfOverlayShortcutMenu />,
    onDismount() {
      routerHook.removeGlobalComponent("ShortcutAction");
    },
  };
});
