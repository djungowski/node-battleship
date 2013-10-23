(function() {
    var PlayingField = function() {};

    PlayingField.prototype.renderField = function() {
        var me = this;

        $('.player table').each(function(key, playerfield) {
            $(playerfield).append(me.createRows())
        });
    };

    PlayingField.prototype.createRows = function() {
        rows = [];
        for(rowsCreated = 0; rowsCreated < window.field.rows; rowsCreated++) {
            currentRow = $('<tr></tr>');
            currentRow.append(this.createCols(rowsCreated))
            rows.push(currentRow)
        }
        return rows;
    };

    PlayingField.prototype.createCols = function(currentRow) {
        cols = [];
        for(colsCreated = 0; colsCreated < window.field.cols; colsCreated++) {
            cols.push($('<td x="' + currentRow + '" y="' + colsCreated + '" title="Zeile ' + (currentRow + 1) + ' Spalte ' + (colsCreated + 1) + '"></td>'))
        }
        return cols;
    };

    PlayingField.prototype.setShips = function(ships) {
        ships.forEach(function(ship) {
            console.log(ship);
        });
    };

    window.playingField = new PlayingField();
})()