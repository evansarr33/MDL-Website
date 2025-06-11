function loadLogs(key) {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data : [];
}

function saveLogs(key, logs) {
    localStorage.setItem(key, JSON.stringify(logs));
}

function addRow(table, entry) {
    const tr = document.createElement('tr');
    const dateTd = document.createElement('td');
    dateTd.textContent = entry.date;
    const descTd = document.createElement('td');
    descTd.textContent = entry.desc;
    tr.appendChild(dateTd);
    tr.appendChild(descTd);
    table.querySelector('tbody').appendChild(tr);
}

function setupSection(formId, tableId, storageKey) {
    const form = document.getElementById(formId);
    const table = document.getElementById(tableId);
    const logs = loadLogs(storageKey);
    logs.forEach(entry => addRow(table, entry));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = form.querySelector('input[type="date"]').value;
        const desc = form.querySelector('input[type="text"]').value.trim();
        if (!date || !desc) return;
        const entry = { date, desc };
        logs.push(entry);
        saveLogs(storageKey, logs);
        addRow(table, entry);
        form.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupSection('visit-form', 'visit-table', 'security_visits');
    setupSection('exercise-form', 'exercise-table', 'security_exercises');
    setupSection('evac-form', 'evac-table', 'security_evacuations');
});
