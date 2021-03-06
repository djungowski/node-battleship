var PlayingField = function(gameInterface) {
    this.gameInterface = gameInterface;
};

PlayingField.prototype.gameInterface = null;

PlayingField.ORIENTATION_HORIZONTAL = 0;
PlayingField.ORIENTATION_VERTICAL = 1;

PlayingField.prototype.currentlyMovingShip = false;

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

// This needs an offset 1!
PlayingField.prototype.getField = function(x, y) {
    return $('.player.you table tr:nth-child(' + y + ') td:nth-child(' + x + ')');
};

// This needs an offset 1!
PlayingField.prototype.getOpponentField = function(x, y) {
    return $('.player.opponent table tr:nth-child(' + y + ') td:nth-child(' + x + ')');
};

PlayingField.prototype.canShipBePlaced = function(x, y, shipInfo) {
    x = parseInt(x) + 1;
    y = parseInt(y) + 1;

    var field;

    for (var i = 1; i <= shipInfo.ship.size; i++) {
        field = this.getField(x, y);
        if (field.hasClass('ship') && !field.hasClass(shipInfo.ship.type)) {
            return false;
        }

        if (shipInfo.orientation == PlayingField.ORIENTATION_HORIZONTAL) {
            x += 1;
        } else {
            y += 1;
        }
    }
    return true;
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
    });
};

PlayingField.prototype.placeShip = function(x, y, shipInfo) {
    this.renderShip(x, y, shipInfo);
    var shipOnField = $('.player.you table .ship.' + shipInfo.ship.type);
    shipOnField.bind('click', {shipInfo: shipInfo}, $.proxy(this.moveShip, this));
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
        // Increase values for next ship field
        if (shipInfo.orientation == PlayingField.ORIENTATION_HORIZONTAL) {
            x += 1;
        } else {
            y += 1;
        }
    }
};

PlayingField.prototype.moveShip = function(event) {
    if (this.currentlyMovingShip) {
        return;
    }
    this.currentlyMovingShip = true;

    var shipInfo = event.data.shipInfo;
    var shipOnField = $('.player.you table .ship.' + shipInfo.ship.type);

    // Stop the event
    event.stopPropagation();

    // First: remove click binding of ship
    shipOnField.unbind('click', this.moveShip);
    // Second: Add different click binding
    $('.player.you table td').bind('click', {shipInfo: shipInfo}, $.proxy(this.onshipplacement, this));
    // Last: mouseover binding for table
    $('.player.you table').bind('mouseover', {shipInfo: shipInfo}, $.proxy(this.whenmovingship, this));
};

PlayingField.prototype.onshipplacement = function(event) {
    var shipInfo = event.data.shipInfo;
    var target = $(event.target);
    var x = target.attr('x');
    var y = target.attr('y');

    if (!this.canShipBePlaced(x, y, shipInfo)) {
        return;
    }

    if (x != undefined && y != undefined) {
        x = parseInt(x);
        y = parseInt(y);

        if (x + shipInfo.ship.size > window.field.cols) {
            x = window.field.cols - shipInfo.ship.size;
        }
        $('.player.you table').unbind('mouseover');
        this.placeShip((x + 1), (y + 1), shipInfo);
        $('.player.you table td').unbind('click', this.onshipplacement);
        $('.player.you table .ship.' + shipInfo.ship.type).bind('click', {shipInfo: shipInfo}, $.proxy(this.moveShip, this));

        this.currentlyMovingShip = false;

        this.gameInterface.placeShip(shipInfo.ship.type, x, y, shipInfo.orientation);
    }
};

PlayingField.prototype.whenmovingship = function(event) {
    // Only allow TD tags
    if (event.target.tagName != 'TD') {
        return;
    }
    var shipInfo = event.data.shipInfo
    var target = $(event.target);

    var x = target.attr('x');
    var y = target.attr('y');
    var hasAxisInfo = (x != undefined && y != undefined);

    x = parseInt(x);
    y = parseInt(y);
    var canShipBePlaced = this.canShipBePlaced(x, y, shipInfo);
    // Ship must not leave the playing field
    if (x + shipInfo.ship.size > window.field.cols) {
        x = window.field.cols - shipInfo.ship.size;
    }
    if (hasAxisInfo && canShipBePlaced) {
        this.renderShip((x + 1), (y + 1), shipInfo);
    }
};

PlayingField.prototype.setFieldStatus = function(player, x, y, status, shipType) {
    if (player == 'you') {
        var field = this.getField(x, y);
    } else {
        var field = this.getOpponentField(x, y);
    }
    switch(status) {
        case 'used':
            field.addClass('used');
            break;

        case 'hit':
            field.addClass('used hit ship ' + shipType)
            break;

        case 'normal':
            field.removeClass('used hit');
            break;
    }
};