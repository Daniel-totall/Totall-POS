var db;
var dbCreated = false;

function onDeviceReady() {
    db = window.openDatabase("TotallPOSDB", "1.0", "Totall POS", 200000);
    if (dbCreated)
    	db.transaction(getDados, transaction_error);
    else
    	db.transaction(criaDados, transaction_error, criaDados_success);
}

function transaction_error(tx, error) {
	alert("Erro ao acessar banco de dados: " + error);
}

function criaDados_success() {
	dbCreated = true;
    db.transaction(getDados, transaction_error);
}

function getDados(tx) {
	var sql = "select ip_servidor " + 
				"from config";
	tx.executeSql(sql, [], getDados_success);
}

function getDados_success(tx, results) {
	var config = results.rows.item(0);	
	$('#ipservidor').text(config.ip_servidor);	
	db = null;
}

function criaDados(tx) {
	tx.executeSql('DROP TABLE IF EXISTS config');
	var sql = 
		"CREATE TABLE IF NOT EXISTS config ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"ip_servidor VARCHAR(50))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO config (id,ip_servidor) VALUES (1,'192.168.1.8')");
}
