import './style.css';

const $table = document.createElement('table') as HTMLTableElement;

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr') as HTMLTableRowElement;
  for (let k = 0; k < 3; k++) {
    const $td = document.createElement('td') as HTMLTableCellElement;

    $tr.append($td);
  }
  $table.append($tr);
}

document.body.append($table);
