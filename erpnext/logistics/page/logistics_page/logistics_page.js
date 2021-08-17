let mymap;
let count=0;
let groupList;
let page;

frappe.pages['logistics-page'].on_page_load = function(wrapper) {
		page = frappe.ui.make_app_page({
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

	// 获取分组数据
	frappe.call({
		method:'erpnext.logistics.page.logistics_page.logistics_page.get_group',
		callback: function(r) {
			groupList = r.message
		}
	})

	// 获取组内数据
	js.onload = function() {
		frappe.call({
			method: 'erpnext.logistics.page.logistics_page.logistics_page.get_data',
			callback: function(r) {
				let data = r.message;
			
				$(frappe.render_template('logistics_page', {'data': data, 'group': groupList})).appendTo(page.main);
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
		$('button').removeClass("active")
		drawLine(rawData);
		count++;
		$(rawData).addClass("active")
		return;
	}
	else {
		$('button').removeClass("active")
		pLineGroup.removeFrom(mymap);
		drawLine(rawData);
		$(rawData).addClass("active")
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

function generateGroup(rawData) {
	$('a').removeClass("active")
	let data = rawData.getAttribute('data')
	$(rawData).addClass("active")
	filterList(data)
}

function filterList(name) {
	frappe.call({
		method: 'erpnext.logistics.page.logistics_page.logistics_page.filterGroup',
		args: {groupName: name},
		callback: function(r) {
			let newData = r.message
			$('#list').replaceWith(frappe.render_template('logistics_page_list', {'data': newData}))
		}
	})
}