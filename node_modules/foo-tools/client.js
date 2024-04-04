document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        data.forEach(row => {
          const tr = document.createElement('tr');
          Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
          });
          tableBody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });