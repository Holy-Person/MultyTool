@ECHO OFF
if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit

CMD /C "yarn dev"

EXIT