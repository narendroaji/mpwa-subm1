const CACHE_NAME = "submission-1rev1";
var urlsToCache = [
    "/",
    "icon-big.png",
    "icon-small.png",
    "/nav.html",
    "/index.html",
    "/pages/anggota.html",
    "/pages/awal.html",
    "/pages/diskografi.html",
    "/pages/pendahuluan.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/register-sw.js",
    "/manifest.json",
    "img/album/alexandria.jpg",
    "img/personil/ariel.jpeg",
    "img/album/bintang_di_surga.jpg",
    "img/personil/david.jpg",
    "img/personil/ex_andika.jpg",
    "img/personil/ex_indra.jpg",
    "img/personil/ex_reza.jpg",
    "img/personil/ex_uki.jpg",
    "img/album/hari_yang_cerah.jpg",
    "img/album/keterkaitan_keterikatan.jpg",
    "img/logo-noah.png",
    "img/personil/lukman.jpg",
    "img/album/sebuah_nama_sebuah_cerita.jpg",
    "img/album/second_chance.jpg",
    "img/album/seperti_seharusnya.jpg",
    "img/album/sings_legends.jpg",
    "img/album/taman_langit.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});