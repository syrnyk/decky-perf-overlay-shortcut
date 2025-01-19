import os
import decky # type: ignore

import time

STEAM_CONFIG = [
    [
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\nno_display",
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\npreset=0"
    ],
    [
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\nframe_timing=0\ncpu_stats=0\ngpu_stats=0\nfps=1\nfps_only\nlegacy_layout=0\nwidth=40\nframetime=0",
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\npreset=1"
    ],
    [
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\nlegacy_layout=0\nhorizontal\nbattery\ngpu_stats\ncpu_stats\ncpu_power\ngpu_power\nram\nfps\nframetime=0\nhud_no_margin\ntable_columns=14\nframe_timing=1",
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\npreset=2"
    ],
    [
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\ncpu_temp\ngpu_temp\nram\nvram\nio_read\nio_write\narch\ngpu_name\ncpu_power\ngpu_power\nwine\nframetime\nbattery",
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\npreset=3"
    ],
    [
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\nfull\ncpu_temp\ngpu_temp\nram\nvram\nio_read\nio_write\narch\ngpu_name\ncpu_power\ngpu_power\nwine\nframetime\nbattery",
        "control=mangohud\nmangoapp_steam\nfsr_steam_sharpness=5\nnis_steam_sharpness=10\npreset=4"
    ]
]

class Plugin:

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        decky.logger.info("Running Perf Overlay Shortcut")
        self._shortcut=Shortcut()
        self._shortcut.register()

    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        decky.logger.info("Stopping Perf Overlay Shortcut")
        pass 

    # Function called after `_unload` during uninstall, utilize this to clean up processes and other remnants of your
    # plugin that may remain on the system
    async def _uninstall(self):
        decky.logger.info("Uninstalling Perf Overlay Shortcut")
        pass


    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        decky.logger.info("Migrating logs")
        decky.migrate_logs(os.path.join(decky.DECKY_USER_HOME,
                                               ".config", "decky-perf-overlay-shortcut", "decky-perf-overlay-shortcut.log"))

class Shortcut:

    def register(self):
        self.findConfigPath(True)  

    def __init__(self):
        self._procPath=""    #path to PID folder for a given app
        self._appPid=""     #PID for mango app
        self._appcmdLine=""     #cmdline
        self._configPath=""      #path to mango app configuration in system files (used to get/set overlay level)
        self._steamIndex=-1
        self._findConfig=False        #flag to be set to true when mango app config found in system files
        self._findInterval=2     
        self._findCount=0   
        self._maxFindCount=3    

    #method searching for the mango app configuration to get/set overlay level
    def findConfigPath(self,refind:bool):
        procPath="/proc"
        findCmd=False
        if not refind and self._findConfig:
            return True
        for procdir in os.listdir(procPath):
            try:
                if os.path.isdir(procPath + "/" + procdir):
                    appPid = int(procdir)
                    appProcPath = procPath + "/" + procdir
                    appCmdLine = open(appProcPath + "/" +"cmdline", "r").read().strip()
                if appCmdLine.startswith("mangoapp"):
                    self._procPath = appProcPath
                    self._appPid = appPid
                    self._appcmdLine = appCmdLine
                    decky.logger.info(f"PerfOverlayShortcut - Mango app appPid={appPid}, appCmdLine={appCmdLine} ")
                    findCmd=True
                    break
            except:
                continue
        if not findCmd:
            decky.logger.error(f"PerfOverlayShortcut - MangoApp config not found = {self._configPath}")
            time.sleep(self._findInterval)
            if self._findCount + 1 < self._maxFindCount:
                self._findCount = self._findCount + 1
                return self.findConfigPath(True)
            else:
                self._findCount = 0
                return False
        appEnvs =  open(self._procPath + "/" +"environ", "r").read().strip()
        for appEnv in appEnvs.split("\0"):
            try:
                if appEnv.startswith("MANGOHUD_CONFIGFILE"):
                    self._configPath=appEnv.split("=")[1]
                    self._findConfig = True
                    decky.logger.info(f"PerfOverlayShortcut - MANGOHUD_CONFIGFILE found = {self._configPath}")
                    return True
            except:
                continue
        return False
