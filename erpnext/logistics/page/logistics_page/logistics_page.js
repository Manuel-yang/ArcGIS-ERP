let mymap;
let count=0;

frappe.pages['logistics-page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Logistics',
		single_column: true,
	});

	page.set_title("Logistics");
	let link = document.createElement("link");
	link.type = "text/css"
	link.rel = "stylesheet"
	link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
	document.head.appendChild(link);

	let bootstrap = document.createElement("link");
	bootstrap.type = "text/css"
	bootstrap.rel = "stylesheet"
	bootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css";
	document.head.appendChild(bootstrap);

	let js = document.createElement("script");
	js.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
	document.head.appendChild(js);

	js.onload = function() {
		frappe.call({
			method: 'erpnext.logistics.page.logistics_page.logistics_page.get_data',
			callback: function(r) {
				let data = r.message;
				console.log(data[0][0])
				$(frappe.render_template('logistics_page', {'data': data})).appendTo(page.main);

				// 开始初始化地图
				mymap = L.map('mapid').setView([32.03602003973757,-241.22680664062503], 5);
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					maxZoom: 18,
					id: 'mapbox/streets-v11',
					tileSize: 512,
					zoomOffset: -1,
					accessToken: 'pk.eyJ1IjoieWFuYWVtb25zIiwiYSI6ImNrczN6MjN4eTBydWszMXBpaDF6ZjRjdTgifQ.Vkl7ugCcEhVBUd8Qzm8hiA'
						}).addTo(mymap);
						pLineGroup = L.layerGroup();
			}
		});
	}
}

function updateLine(rawData) {
	if (count == 0) {
		drawLine(rawData);
		count++;
		return;
	}
	else {
		pLineGroup.removeFrom(mymap);
		drawLine(rawData);
		return;
	}
}

function drawLine(rawData) {
	pLineGroup = L.layerGroup();
	let data = rawData.getAttribute('data');
	var latlngs = JSON.parse(data);
	mymap.setView(latlngs[latlngs.length-1], 5)
	this.pLineGroup.addLayer( L.polyline(latlngs, {color: '#64C9CF'}))
	pLineGroup.addTo(mymap)
	L.marker(latlngs[latlngs.length-1]).addTo(pLineGroup)
}