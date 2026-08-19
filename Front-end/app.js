const API_BASE_URL = 'http://127.0.0.1:5000/tienda-ropa-api/v1';

document.addEventListener('DOMContentLoaded', () => {
    cargarTodo();

    const formPrenda = document.getElementById('prendaForm');
    if (formPrenda) formPrenda.addEventListener('submit', guardarPrenda);

    const formVenta = document.getElementById('ventaForm');
    if (formVenta) formVenta.addEventListener('submit', procesarVenta);

    document.querySelectorAll('.btn-recargar, #btnRecargar').forEach(btn => {
        btn.addEventListener('click', cargarTodo);
    });
});

function cargarTodo() {
    cargarPrendas();
    cargarSelectCaja();
    cargarVistaA();
    cargarVistaB();
    cargarVistaC();
}

async function cargarPrendas() {
    const tbody = document.getElementById('tabla-prendas');
    if (!tbody) return;
    try {
        const res = await fetch(`${API_BASE_URL}/prendas`);
        const prendas = await res.json();
        tbody.innerHTML = '';
        if (!prendas || prendas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay prendas</td></tr>`;
            return;
        }
        prendas.forEach(p => {
            const idStr = p._id?.$oid || p._id;
            let marcaNombre = (typeof p.marca === 'object') ? (p.marca.nombre || 'N/A') : (p.marca || 'N/A');
            tbody.innerHTML += `
                <tr>
                    <td>${p.nombre || ''}</td>
                    <td>${p.categoria || ''}</td>
                    <td>${p.talla || ''}</td>
                    <td>₡${p.precio || 0}</td>
                    <td>${p.stock || 0}</td>
                    <td>${marcaNombre}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="eliminarPrenda('${idStr}')">Eliminar</button></td>
                </tr>`;
        });
    } catch (error) {
        console.error('Error prendas:', error);
    }
}

async function guardarPrenda(e) {
    e.preventDefault();
    const prendaData = {
        nombre: document.getElementById('nombre')?.value,
        categoria: document.getElementById('categoria')?.value,
        talla: document.getElementById('talla')?.value,
        precio: parseFloat(document.getElementById('precio')?.value || 0),
        stock: parseInt(document.getElementById('stock')?.value || 0),
        marca: {
            nombre: document.getElementById('nombreMarca')?.value || 'Genérica',
            pais_origen: document.getElementById('paisMarca')?.value || 'N/A'
        }
    };
    try {
        await fetch(`${API_BASE_URL}/prendas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prendaData)
        });
        e.target.reset();
        cargarTodo();
    } catch (error) {
        alert('Error al guardar');
    }
}

window.eliminarPrenda = async function(id) {
    if (!confirm('¿Seguro?')) return;
    try {
        await fetch(`${API_BASE_URL}/prendas/${id}`, { method: 'DELETE' });
        cargarTodo();
    } catch (error) {
        alert('Error al eliminar');
    }
};

async function cargarSelectCaja() {
    const select = document.getElementById('selectPrendaVenta');
    if (!select) return;
    try {
        const res = await fetch(`${API_BASE_URL}/prendas`);
        const prendas = await res.json();
        select.innerHTML = '<option value="">-- Seleccione una prenda --</option>';
        prendas.forEach(p => {
            const idStr = p._id?.$oid || p._id;
            select.innerHTML += `<option value="${idStr}">${p.nombre} - (Stock: ${p.stock})</option>`;
        });
    } catch (error) {
        console.error('Error caja:', error);
    }
}

async function procesarVenta(e) {
    e.preventDefault();
    const prendaId = document.getElementById('selectPrendaVenta')?.value;
    const cantidad = parseInt(document.getElementById('cantidadVenta')?.value || 1);
    if (!prendaId) {
        alert('Seleccione una prenda');
        return;
    }
    try {
        const res = await fetch(`${API_BASE_URL}/ventas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prenda_id: prendaId, cantidad: cantidad })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error');
        alert('¡Venta realizada!');
        e.target.reset();
        cargarTodo();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function cargarVistaA() {
    const tbody = document.getElementById('tabla-vista-a');
    if (!tbody) return;
    try {
        const res = await fetch(`${API_BASE_URL}/consultas/vista-a`);
        const datos = await res.json();
        tbody.innerHTML = datos.length ? '' : `<tr><td colspan="2" class="text-center">No hay registros</td></tr>`;
        datos.forEach(i => tbody.innerHTML += `<tr><td>${i.marca || 'N/A'}</td><td>${i.pais_origen || 'N/A'}</td></tr>`);
    } catch (e) { console.error(e); }
}

async function cargarVistaB() {
    const tbody = document.getElementById('tabla-vista-b');
    if (!tbody) return;
    try {
        const res = await fetch(`${API_BASE_URL}/consultas/vista-b`);
        const datos = await res.json();
        tbody.innerHTML = datos.length ? '' : `<tr><td colspan="3" class="text-center">No hay datos</td></tr>`;
        datos.forEach(i => tbody.innerHTML += `<tr><td>${i.nombre || 'N/A'}</td><td>${i.total_vendido ?? 0}</td><td>${i.stock_actual ?? 0}</td></tr>`);
    } catch (e) { console.error(e); }
}

async function cargarVistaC() {
    const tbody = document.getElementById('tabla-vista-c');
    if (!tbody) return;
    try {
        const res = await fetch(`${API_BASE_URL}/consultas/vista-c`);
        const datos = await res.json();
        tbody.innerHTML = datos.length ? '' : `<tr><td colspan="3" class="text-center">No hay datos</td></tr>`;
        datos.forEach((i, idx) => tbody.innerHTML += `<tr><td>${idx + 1}</td><td>${i.marca || 'N/A'}</td><td>${i.total_ventas ?? 0}</td></tr>`);
    } catch (e) { console.error(e); }
}