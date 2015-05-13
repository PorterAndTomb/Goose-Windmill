$(function() {

  // var combo = {primary: '#003366', secondary: '#CCCCCC', tertiary: '#FFCC00'};
  // var combo = {primary: '#B7C68B', secondary: '#F4F0CB', tertiary: '#DED29E', quaternary: '#B3A580', storyTitle: '#685642'};
  // var combo = {primary: '#59323c', secondary: '#260126', tertiary: '#f2eeb3', storyTitle: '#bfaf80', quaternary: '#8c6954'};
  // var nightMode = {primary: '#000', secondary: '#191919', tertiary: '#070707', quaternary: '#D82421',  storyTitle: '#FF0000', storyTitleVisited: '#7C0000'};
  var hackerMode = {primary: '#000', secondary: '#191919', tertiary: '#070707', quaternary: '#24D821',  storyTitle: '#00FF00', storyTitleVisited: '#007C00'};

  var changeTheme = function(combo) {
    $('<style> body { background-color: ' + combo.primary + '; }</style>').appendTo('head');
    $('<style>.left-container { color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.story { background-color: ' + combo.secondary + '; }</style>').appendTo('head');
    $('<style>.tabs { background-color: ' + combo.secondary + '; }</style>').appendTo('head');
    $('<style>.auth-container { background-color: ' + combo.tertiary + '; }</style>').appendTo('head');
    $('<style>.following-header { color: ' + combo.tertiary + '; }</style>').appendTo('head');
    $('<style>.points-bar { background-color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.story-title { color: ' + combo.storyTitle + '; }</style>').appendTo('head');
    $('<style>.story-title:visited { color: ' + combo.storyTitleVisited + '; }</style>').appendTo('head');
    $('<style>.bottom-row { color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.bottom-row a { color: ' + combo.quaternary + '; font-weight: bold;}</style>').appendTo('head');
    $('<style>.source-url { color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.comment { background-color: ' + combo.secondary + '; }</style>').appendTo('head');
    $('<style>.comment { color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.top-row { color: ' + combo.quaternary + '; }</style>').appendTo('head');
    $('<style>.top-row a { color: ' + combo.quaternary + '; font-weight: bold;}</style>').appendTo('head');

  }
  
  changeTheme(hackerMode);
});

