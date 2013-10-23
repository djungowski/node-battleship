(function() {
    var PlayingField = function() {};

    PlayingField.ORIENTATION_HORIZONTAL = 0;
    PlayingField.ORIENTATION_VERTICAL = 1;

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
        ships.forEach(function(shipInfo) {
            // x: get nth column
            // y: get nth row
            // CSS has offset 1
            var x = shipInfo.x + 1;
            var y = shipInfo.y + 1;

            // Do as long as there is ship
            for (var i = 1; i <= shipInfo.ship.size; i++) {
                var shipPart = $('.player.you table tr:nth-child(' + y + ') td:nth-child(' + x + ')');
                shipPart.addClass('ship ' + shipInfo.ship.type);

                // Increase values for next ship field
                if (shipInfo.orientation == PlayingField.ORIENTATION_HORIZONTAL) {
                    x += 1;
                } else {
                    y += 1;
                }
            }

            // TODO: implement rotation
        });
    };

    window.playingField = new PlayingField();
})()