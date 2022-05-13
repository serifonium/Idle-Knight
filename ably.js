var ably = new Ably.Realtime(
    "DpINhA.k0XtSA:DQcJRsOOqx2nLIE0KLBY0EtuPSLeFYm3lEa6gdfPFKY"
  );
  var online = false
  ably.connection.on("connected", () => {
    console.log("connected with alby");
    online = true
  });
  
  var onlineId = `${Math.random()}`,
    gameRoomName = prompt("Game room name?") || "defualt"  
  
  var channel = ably.channels.get(`slay-${gameRoomName}`);
  channel.subscribe("gameMoves", (message) => {
    if (hosting) {
        var msg = JSON.parse(message.data)

        for (let i = 0; i < msg.moves.length; i++) {
          var move = msg.moves[i];

          if (move.type == "claim") {
            var tile = gameScene.tileGrid[move.pos.x][move.pos.y]

            tile.owner = move.player
            console.log(move.player.color, gameColors[tile.value])
            tile.color = pSBC(0.5, move.player.color, gameColors[tile.value])
            console.log(tile.color)
          } else if (move.type == "placeObject") {
            var tile = gameScene.tileGrid[move.pos.x][move.pos.y]

            tile.object = move.object
          }
          
        }
    }
  });
  channel.subscribe("gameBoardUpdates", (message) => {
      if (!hosting) {
          var tileGrid = JSON.parse(message.data)

          for (let x = 0; x < tileGrid.length; x++) {
            const row = tileGrid[i];
            for (let y = 0; y < row.length; y++) {
              const tile = row[y];
              tileGrid[x][y].objectHideen = tile.objectHideen
            }
          }

          gameScene.tileGrid = tileGrid




          if (!firstMessage) {
            firstMessage = true

            player = new Player("Player1", gameScene)
            console.log('start')

            channel.publish("gameLogins", JSON.stringify({
              color:player.color,
              Id:player.Id
          }))
          }
          
      }
});
channel.subscribe("gameLogins", (message) => {
  if (hosting) {
      var dat = JSON.parse(message.data),
        player = new Player("guestPlayer", gameScene, {
          color:dat.color,
          Id:dat.Id,
        })

      console.log(player, dat)

  }
});
  
  function broadcastData() {
      channel.publish("gamePlayers", JSON.stringify({

      }))
  }

  