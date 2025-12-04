async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("content").innerHTML = "<p>ID produk tidak ditemukan.</p>";
        return;
    }

    try {
        const response = await fetch(`../products/${id}.json`);
        const data = await response.json();

        document.getElementById("content").innerHTML = `
            <h3>${data.product_name}</h3>
            <p><b>Client:</b> ${data.client}</p>
            <p><b>Status:</b> ${data.status}</p>

            <div class="progress-bar">
                <div class="progress" style="width:${data.progress_percent}%"></div>
            </div>

            <h4>Timeline:</h4>
            <ul>
                ${data.timeline.map(t => `<li>${t.date} - ${t.desc}</li>`).join("")}
            </ul>

            <h4>Foto Update:</h4>
            ${data.images.map(img => `<img src="${img}" width="300"/>`).join("")}
        `;
    } catch (e) {
        document.getElementById("content").innerHTML = "<p>Data produk tidak ditemukan.</p>";
    }
}

loadProduct();
