spa.shell = (function () {
  let configMap = {
    mainHtml: '<div class="spa-hell-head">'
      + '<div class="spa-shell-head-logo"></div>'
      + '<div class="spa-shell-head-acct"></div>'
      + '<div class="spa-shell-head-search"></div>'
    + '</div>'
    + '<div class="spa-shell-main">'
      + '<div class="spa-shell-main-nav"></div>'
      + '<div class="spa-shell-main-content"></div>'
    + '</div>'
    + '<div class="spa-shell-foot"></div>'
    + '<div class="spa-shell-chat"></div>'
    + '<div class="spa-shell-modal"></div>',
    chatExtendTime: 1000,
    chatRetractTime: 1000,
    chatExtendHeight: 450,
    chatRetracrHeight: 15,
    extendedChatTitle: 'Click to retract',
    retractedChatTitle: 'Click to extend',
    anchorSchemaMap: {
      chat: {
        open: true,
        closed: true,
      },
    },
  };

  /* admin functional modules */
  // anchorMap:　現在のURIのアンカーを格納する
  let stateMap = {
    container: null,
    isChatRetracted: true,
    anchorMap: {},
   };

  /* cache JQuery Object */
  let jQMap = {
    container: null,
    chat: null,
  };

  let initModule = function ($container) {
    stateMap.container = $container;
    $container.html(configMap.mainHtml);
    setJQMap();

    jQMap.chat.attr('title', configMap.retractedChatTitle).click(onClickChat);
    $.uriAnchor.configModule({
      schema_map: configMap.anchorSchemaMap,
    });

    $(window).bind('hashchange', onHashChange).trigger('hashchange');
  };

  let setJQMap = function () {
    let container = stateMap.container;
    jQMap.container = container;
    jQMap.chat = container.find('.spa-shell-chat');

  };

  let toggleChat = function (doExtend, callback) {
    let chatHeight = jQMap.chat.height();
    isOpen = chatHeight === configMap.chatExtendHeight;
    isClosed = chatHeight === configMap.chatRetracrHeight;
    isSliding = !isOpen && !isClosed;

    if (isSliding) { return false; }

    if (doExtend) {
        jQMap.chat.animate({height: configMap.chatExtendHeight}, configMap.chatExtendTime,
        function () {
          jQMap.chat.attr('title', configMap.extendedChatTitle);
          stateMap.isChatRetracted = false;
          if (callback) {
            callback(jQMap.chat);
          }
        });

        return true;
    }

    jQMap.chat.animate({ height: configMap.chatRetracrHeight}, configMap.chatRetractTime,
    function () {
      jQMap.chat.attr('title', configMap.retractedChatTitle);
      stateMap.isChatRetracted = true;
      if (callback) {
        callback(jQMap.chat);
      }
    });
  };

  // アンカー変更メソッドであるchangeAnchorPartを呼びだす
  onClickChat = function (event) {
    changeAnchorPart({chat: stateMap.isChatRetracted ? 'open' : 'closed'});
    console.log(stateMap.isChatRetracted);
    // preventDeafult
    return false;
  };

  // argMap: 変更したいURIアンカー部分のマップ
  // function: アンカー部分の変更
  let copyAnchorMap = function () {
    // extend(a,b): aにbをマージする。　bにaと同じプロパティがある場合、bの値で上書きする。
    return $.extend(true, {}, stateMap.anchorMap);
  };

  let changeAnchorPart = function (argMap) {
    let anchorMapRevise = copyAnchorMap();

    KEYVAL:
    for (let keyName in argMap) {
      if (argMap.hasOwnProperty(keyName)) {
        if (keyName.indexOf('_') === 0) {
          continue KEYVAL;
        }

        anchorMapRevise[keyName] = argMap[keyName];
        keyNameDep = '_' + keyName;
        console.log('↓anchorMapRevise');
        console.log(anchorMapRevise);
        if (argMap[keyNameDep]) {
          anchorMapRevise[keyNameDep] = argMap[keyNameDep];
        } else {
          delete anchorMapRevise[keyNameDep];
          delete anchorMapRevise['_s' + keyNameDep];
        }
      }
    }

    try {
      // アンカーのセット
      $.uriAnchor.setAnchor(anchorMapRevise);
    } catch(error) {
      $.uriAnchor.setAnchor(stateMap.anchorMap, null, true);
      return false;
    }

    return true;
  };

  // アンカー部分の変更を検出する
  // 検出後、chat部分をtoggleする
  let onHashChange = function (event) {
    let anchorMapProposed = null;
    let anchorMapPrevious = copyAnchorMap();
    console.log('↓anchorMapPrevious');
    console.log(anchorMapPrevious);

    try {
      anchorMapProposed = $.uriAnchor.makeAnchorMap();
      console.log('↓anchorMapProposed');
      console.log(anchorMapProposed);
    } catch(error) {
      $.uriAnchor.setAnchor(stateMap.anchorMap, unll, true);
      return false;
    }

    stateMap.anchorMap = anchorMapProposed;

    let _s_chat_previous = anchorMapPrevious._s_chat;
    let _s_chat_proposed = anchorMapProposed._s_chat;

    if (!anchorMapPrevious || _s_chat_previous !== _s_chat_proposed) {
      let s_chat_proposed = anchorMapProposed.chat;
      switch (s_chat_proposed) {
        case 'open':
          toggleChat(true);
          break;
        case 'closed':
          toggleChat(false);
          break;
        default:
          // アンカーに不正な値が設定された場合、chatを閉じ、設定されているアンカーをクリアする
          toggleChat(false);
          delete anchorMapProposed.chat;
          $.uriAnchor.setAnchor(anchorMapProposed, null, true)
      }
    }

    return false;
  };


  return {initModule: initModule};
  })();
