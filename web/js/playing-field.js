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
            cols.push($('<td x="' + colsCreated + '" y="' + currentRow + '" title="Zeile ' + (currentRow + 1) + ' Spalte ' + (colsCreated + 1) + '"></td>'))
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

        var shipOnField = $('.player.you table .ship.' + shipInfo.ship.type);
        this.renderShip(x, y, shipInfo);
        shipOnField.bind('click', {shipInfo: shipInfo, me: this}, this.moveShip);
    };

    PlayingField.prototype.renderShip = function(x, y, shipInfo) {
        var shipClassName = 'ship ' + shipInfo.ship.type;

        // First: remove current ship
        var shipOnField = $('.player.you table .ship.' + shipInfo.ship.type);
        shipOnField.removeClass(shipClassName);

        // Do as long as there is ship
        for (var i = 1; i <= shipInfo.ship.size; i++) {
            var shipPart = this.getField(x, y);
            shipPart.addClass(shipClassName);
            // Todo: don't add click handler if currently moving ship
            shipPart.bind('click', {shipInfo: shipInfo, me: this}, this.moveShip);
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
        var me = event.data.me;
        var shipOnField = $('.player.you table .ship.' + shipInfo.ship.type);

        // Stop the event
        event.stopPropagation();

        // First: remove click binding of ship
        shipOnField.unbind('click', this.moveShip);
        // Second: Add different click binding
        $('.player.you table').bind('click', function(event) {
            var target = $(event.target);
            var x = target.attr('x');
            var y = target.attr('y');
            if (x != undefined && y != undefined) {
                x = parseInt(x);
                y = parseInt(y);
                me.placeShip((x + 1), (y + 1), shipInfo);
                $('.player.you table').unbind('mouseover', {shipInfo: shipInfo, me: me}, me.whenmovingship);
                $('.player.you table .ship.' + shipInfo.ship.type).bind('click', {shipInfo: shipInfo, me: me}, this.moveShip);
            }
        });

        // Last: mouseover binding for table
        $('.player.you table').bind('mouseover', {shipInfo: shipInfo, me: me}, me.whenmovingship);
    };

    PlayingField.prototype.whenmovingship = function(event) {
        var shipInfo = event.data.shipInfo
        var me = event.data.me;
        var target = $(event.target);

        var x = target.attr('x');
        var y = target.attr('y');
        var hasAxisInfo = (x != undefined && y != undefined);
        // Ship must not leave the playing field
        x = parseInt(x);
        y = parseInt(y);
        if (x + shipInfo.ship.size > window.field.cols) {
            x = window.field.cols - shipInfo.ship.size;
        }
        if (hasAxisInfo) {
            me.renderShip((x + 1), (y + 1), shipInfo);
        }
    }

    window.playingField = new PlayingField();
})()