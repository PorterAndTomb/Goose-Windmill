$(function() {
  console.log('hello');

  // var combo = {primary: '#003366', secondary: '#CCCCCC', tertiary: '#FFCC00'};
  var combo = {primary: '#B7C68B', secondary: '#F4F0CB', tertiary: '#DED29E', storyTitle: '#685642', pointsBar: '#B3A580'};

  var changeTheme = function(combo) {
    $('<style> body { background-color: ' + combo.primary + '; }</style>').appendTo('head');
    $('<style>.story { background-color: ' + combo.secondary + '; }</style>').appendTo('head');
    $('<style>.tabs { background-color: ' + combo.secondary + '; }</style>').appendTo('head');
    $('<style>.auth-container { background-color: ' + combo.tertiary + '; }</style>').appendTo('head');
    $('<style>.following-header { color: ' + combo.tertiary + '; }</style>').appendTo('head');
    $('<style>.points-bar { background-color: ' + combo.pointsBar + '; }</style>').appendTo('head');
    $('<style>.story-title { color: ' + combo.storyTitle + '; }</style>').appendTo('head');

  }
  
  changeTheme(combo);
});

