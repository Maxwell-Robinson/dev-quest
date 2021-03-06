import React from 'react'
import BoardElement from './boardElement'

class Board extends React.Component {

  render(){
    const {tileGrid, playerPosition, enemies} = this.props
    return (
      <div>
        <h1> This is rendered by board.js </h1>
        <div className="grid">
          {tileGrid.map((row, i) => {
            return row.map((tile, j) => {
              return (
                <BoardElement
                  playerPosition={playerPosition}
                  enemies={enemies}
                  i={i}
                  j={j}
                  tileGrid={tileGrid}
                  />
              )
            })
          })
        }
        </div>
      </div>
    )
  }
}

export default Board
