const contentDiv = document.getElementById('content');

async function showView(view) {
    contentDiv.innerHTML = ''; // Clear content

    if (view === 'recursos') {
        showRecursos();
    } else if (view === 'socios') {
        showSocios();
    } else if (view === 'admins') {
        showAdmins();
    }
}

async function showRecursos() {
    const response = await fetch('/recursos');
    const recursos = await response.json();

    let html = '<h2>Recursos</h2><a href="add-recurso.html"><button>Agregar Recurso</button></a>';
    html += '<table><thead><tr><th>ID</th><th>Título</th><th>Tipo</th><th>Ejemplares</th><th>Acciones</th></tr></thead><tbody>';
    for (const recurso of recursos) {
        html += `<tr><td>${recurso.id}</td><td>${recurso.titulo}</td><td>${recurso.tipo_recurso}</td><td>${recurso.num_ejemplares}</td><td><button onclick="deleteRecurso(${recurso.id})">Eliminar</button></td></tr>`;
    }
    html += '</tbody></table>';
    contentDiv.innerHTML = html;
}

async function showSocios() {
    const response = await fetch('/socios');
    const socios = await response.json();

    let html = '<h2>Socios</h2><a href="add-socio.html"><button>Agregar Socio</button></a>';
    html += '<table><thead><tr><th>ID</th><th>DNI</th><th>Nombre</th><th>Acciones</th></tr></thead><tbody>';
    for (const socio of socios) {
        html += `<tr><td>${socio.id}</td><td>${socio.dni}</td><td>${socio.nombre}</td><td><button onclick="deleteSocio(${socio.id})">Eliminar</button></td></tr>`;
    }
    html += '</tbody></table>';
    contentDiv.innerHTML = html;
}

async function showAdmins() {
    const response = await fetch('/admins');
    const admins = await response.json();

    let html = '<h2>Admins</h2><a href="add-admin.html"><button>Agregar Admin</button></a>';
    html += '<table><thead><tr><th>ID</th><th>DNI</th><th>Nombre</th><th>Cargo</th><th>Acciones</th></tr></thead><tbody>';
    for (const admin of admins) {
        html += `<tr><td>${admin.id}</td><td>${admin.dni}</td><td>${admin.nombre}</td><td>${admin.cargo}</td><td><button onclick="deleteAdmin(${admin.id})">Eliminar</button></td></tr>`;
    }
    html += '</tbody></table>';
    contentDiv.innerHTML = html;
}

async function deleteRecurso(id) {
    if (confirm('¿Está seguro de que desea eliminar este recurso?')) {
        const response = await fetch(`/recursos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            showRecursos();
        } else {
            alert('Error al eliminar el recurso.');
        }
    }
}

async function deleteSocio(id) {
    if (confirm('¿Está seguro de que desea eliminar este socio?')) {
        const response = await fetch(`/socios/${id}`, { method: 'DELETE' });
        if (response.ok) {
            showSocios();
        } else {
            alert('Error al eliminar el socio.');
        }
    }
}

async function deleteAdmin(id) {
    if (confirm('¿Está seguro de que desea eliminar este admin?')) {
        const response = await fetch(`/admins/${id}`, { method: 'DELETE' });
        if (response.ok) {
            showAdmins();
        } else {
            alert('Error al eliminar el admin.');
        }
    }
}

// Show initial view
showView('recursos');
