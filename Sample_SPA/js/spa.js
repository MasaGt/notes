let spa = (function () {
  let initModule = function ($spaContainer) {
    spa.shell.initModule($spaContainer);
  };

  return { initModule: initModule };
})();
