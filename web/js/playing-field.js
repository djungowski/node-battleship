(function() {
    var fieldRows = 20;
    var fieldCols = 20;

    createRows = function() {
        rows = [];
        for(rowsCreated = 1; rowsCreated <= fieldRows; rowsCreated++) {
            currentRow = $('<tr></tr>');
            currentRow.append(createCols(rowsCreated))
            rows.push(currentRow)
        }
        return rows;
    };

    createCols = function(currentRow) {
        cols = [];
        for(colsCreated = 1; colsCreated <= fieldCols; colsCreated++) {
            cols.push($('<td>' + currentRow + '</td>'))
        }
        return cols;
    };

    $('.player table').each(function(key, playerfield) {
        $(playerfield).append(createRows())
    });
})()