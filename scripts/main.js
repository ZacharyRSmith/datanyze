window.layoutCommands = function (session, commands) {
  // These arguments are ensured to be objects of the structures:
  // var session = {
  //   startTime:123456789, // timestamp
  //   endTime:133456999 // timestamp
  // };
  // var commands = [
  //   { timestamp:123456799, // timestamp
  //     commandName:'Lock', // human readable command
  //     commandType:'lock' // fontawesome name without fa­
  //   },
  //   {
  //     timestamp:123456889,
  //     commandName:'Chat',
  //     commandType:'comment­o'
  //   }
  // ];
  commands.sort(function (a, b) {
    return b.timestamp - a.timestamp;
  });
  commands.forEach(function (command) {
    command.timestamp = formatTime(command.timestamp);
  });

  function appendClassBoundary (time, text) {
    $('#schedule').append(
      '<div class="command-container">' +
        '<div class="column-left time">' + time + '</div>' +
        '<span class="class-boundary column-center fa-stack fa-lg">' +
          '<i class="fa fa-circle fa-stack-2x"></i>' +
          '<i class="fa fa-circle-thin fa-stack-2x"></i>' +
          '<i class="fa fa-lock fa-stack-1x"></i>' +
        '</span>' +
        '<div class="column-right">' + text + '</div>' +
      '</div>'
    );
  }

  function appendCommand (command) {
    $('#schedule').append(
      '<div class="command-container">' +
        '<div class="column-left time">' + command.timestamp + '</div>' +
        '<span class="column-center fa-stack fa-lg">' +
          '<i class="fa fa-circle fa-stack-2x"></i>' +
          '<i class="fa fa-circle-thin fa-stack-2x"></i>' +
          '<i class="fa fa-lock fa-stack-1x"></i>' +
        '</span>' +
        '<div class="column-right">' + command.commandName + '</div>' +
      '</div>'
    );
  }

  function formatTime (timestamp) {
    return moment.unix(timestamp).format("h.mma");
  }

  var endTime = formatTime(session.endTime);
  appendClassBoundary(endTime, "Class session ended");

  commands.forEach(function (command) {
    appendCommand(command);
  });

  var startTime = formatTime(session.startTime);
  appendClassBoundary(startTime, "Class session started");

  jsPlumb.connect({
      source: $('.class-boundary')[0],
      target: $('.class-boundary')[1],

      anchor: "Center",
      connector: "Straight",
      endpoint:"Blank"
  });
};
