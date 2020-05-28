var dbPromised = idb.open("news-reader", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "ID"
    });
    articlesObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
});

function saveForLater(article) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("articles", "readwrite");
            var store = tx.objectStore("articles");
            console.log(article);
            store.add(article.result);
            return tx.complete;
        })
        .then(function () {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("articles", "readonly");
            let store = tx.objectStore("articles");
            return store.getAll();
        }).then(articles => {
            resolve(articles);
        })
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("articles", "readonly");
            let store = tx.objectStore("articles");
            return store.get(id);
        }).then(article => {
            resolve(article);
        });
    });
}