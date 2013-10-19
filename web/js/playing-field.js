(function() {
    createRows = function() {
        rows = [];
        for(rowsCreated = 1; rowsCreated <= window.field.rows; rowsCreated++) {
            currentRow = $('<tr></tr>');
            currentRow.append(createCols(rowsCreated))
            rows.push(currentRow)
        }
        return rows;
    };

    createCols = function(currentRow) {
        cols = [];
        for(colsCreated = 1; colsCreated <= window.field.cols; colsCreated++) {
            cols.push($('<td x="' + currentRow + '" y="' + colsCreated + '" title="Zeile ' + currentRow + ' Spalte ' + colsCreated + '"></td>'))
        }
        return cols;
    };

    $('.player table').each(function(key, playerfield) {
        $(playerfield).append(createRows())
    });
})()