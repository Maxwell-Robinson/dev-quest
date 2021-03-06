var initialState = require('./initialState')
var combineReducers = require('redux').combineReducers
var levelGrids = require('../levels/levelGrids')

function reducer (state = initialState, action) {

  var newState = Object.assign({}, state)
  var { tileGrid, enemies } = newState
  var i = state.player.position.y
  var j = state.player.position.x
  var nextTile

  switch(action.type){

    //these are the cases for player movement
    case 'PLAYER_MOVE_LEFT':
      nextTile = tileGrid[i][j-1]
      if (nextTile == 1 || nextTile == 2) {
        newState.player.position.x -= 1
      }
      else if (nextTile == 3) {
        newState.display = "win"
      }

      return newState

    case 'PLAYER_MOVE_RIGHT':
      nextTile = tileGrid[i][j+1]
      if (nextTile == 1 || nextTile == 2) {
        newState.player.position.x += 1
      } else if (nextTile == 3) {
        newState.display = "win"
      }
      return newState

    case 'PLAYER_MOVE_UP':
      nextTile = tileGrid[i-1][j]
      if (nextTile == 1 || nextTile == 2) {
        newState.player.position.y -= 1
      } else if (nextTile == 3) {
        newState.display = "win"
      }
      return newState

    case 'PLAYER_MOVE_DOWN':
      nextTile = tileGrid[i+1][j]
      if (nextTile == 1 || nextTile == 2) {
        newState.player.position.y += 1
      } else if (nextTile == 3) {
        newState.display = "win"
      }
      return newState

    //these are the cases for the player attacking

    case 'PLAYER_ATTACK':
      var attackedEnemy = newState.enemies.find(function(enemy){
        return enemy.position.x == action.payload.position.x && enemy.position.y == action.payload.position.y
      })
      attackedEnemy.health --
      if (attackedEnemy.health == 0) {
        var enemyIndex = newState.enemies.findIndex(function(enemy){
          return enemy.position.x == action.payload.position.x && enemy.position.y == action.payload.position.y
        })
        newState.enemies.splice(enemyIndex, 1)
      }
      console.log('attacking', action.payload)
      return newState

    //these are the cases for game running
    case 'START_GAME':
      newState.display = "game"
      return newState

    case 'WIN_GAME':
      newState.display = "win"
      return newState

    case 'LOSE_GAME':
      newState.display = "loss"
      return newState

    case 'NEXT_LEVEL':
      newState.currentLevel ++
      if (newState.currentLevel == 2){
        console.log(levelGrids[0]);
        newState.tileGrid = levelGrids[0]
        return newState
      }
      if (newState.currentLevel == 3){
        console.log(levelGrids[1]);
        newState.tileGrid = levelGrids[1]
        return newState
      }
      if (newState.currentLevel == 3){
        console.log(levelGrids[2]);
        newState.tileGrid = levelGrids[2]
        return newState
      }  if (newState.currentLevel == 4){
          console.log(levelGrids[3]);
          newState.display = "win"
          return newState
        }
      console.log(newState);


    default:
      return state
  }
}

module.exports = reducer
