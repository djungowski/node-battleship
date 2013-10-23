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

    PlayingField.prototype.getField = function(x, y) {
        return $('.player.you table tr:nth-child(' + y + ') td:nth-child(' + x + ')');
    };

    PlayingField.prototype.setShips = function(ships) {
        var me = this;

        ships.forEach(function(shipInfo) {
            // x: get nth column
            // y: get nth row
            // CSS has offset 1
            var x = shipInfo.x + 1;
            var y = shipInfo.y + 1;

            me.placeShip(x, y, shipInfo);

            // TODO: implement rotation
        });
    };

    PlayingField.prototype.placeShip = function(x, y, shipInfo) {
        var shipClassName = 'ship ' + shipInfo.ship.type;

        // First: remove current ship
        $('.player.you table .ship.' + shipInfo.ship.type).removeClass(shipClassName);

        // Do as long as there is ship
        for (var i = 1; i <= shipInfo.ship.size; i++) {
            var shipPart = this.getField(x, y);
            shipPart.addClass(shipClassName);
            shipPart.bind('click', {shipInfo: shipInfo}, this.moveShip);
            // Increase values for next ship field
            if (shipInfo.orientation == PlayingField.ORIENTATION_HORIZONTAL) {
                x += 1;
            } else {
                y += 1;
            }
        }
    };

    PlayingField.prototype.moveShip = function(event) {
        var shipInfo = event.data.shipInfo;
        var me = this;

        // First: remove click binding
        $(event.target).unbind('click', this.moveShip);
        // mouseover binding for table
        $('.player.you table').bind('mouseover', function(event) {
            var target = $(event.target);
            var x = target.attr('x');
            var y = target.attr('y');
            if (x != undefined && y != undefined) {
                me.placeShip(x, y, shipInfo);
            }
        });
    };

    window.playingField = new PlayingField();
})()