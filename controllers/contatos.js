import sql from 'mssql';

export const getContatos = (req, res) => {
	let query = `
		SELECT C.*
		FROM RKF_CONTATOS_RECALL C
		LEFT JOIN FOLHA12..SENIOR_COLABORADOR S ON (
				C.MATRICULA <> ''
				AND S.MATRICULA = CAST(C.MATRICULA AS INT)
				)
		WHERE ISNULL(S.DATA_DEMISSAO, '') = ''
			AND C.DELETADO = 0
		ORDER BY C.TIPO, C.CONTATO
	`;

	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing getContatos: ", err);
			console.error("Query: ", query);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const postContatos = (req, res) => {
	let query = `
		INSERT INTO RKF_CONTATOS_RECALL (
			CONTATO
			,MATRICULA
			,SETOR
			,TELEFONE
			,EMAIL
			,SITE
			,TIPO
			,DELETADO
			)
		VALUES (
			'${req.body.contato}'
			,'${req.body.matricula}'
			,'${req.body.setor}'
			,'${req.body.telefone}'
			,'${req.body.email}'
			,'${req.body.site}'
			,'${req.body.tipo}'
			,0
			)
	`;

	console.log(query);

	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing postContatos: ", err);
			console.error("Query: ", query);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const getFuncionarios = (req, res) => {
	let query = `
		SELECT RIGHT(replicate('0',6) + CAST(MATRICULA AS VARCHAR),6) matricula,
			TRIM(NOME) nome 
		FROM FOLHA12..SENIOR_COLABORADOR
		WHERE DATA_DEMISSAO = ''
		ORDER BY NOME
		`

	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing getFuncionarios: ", err);
			console.error("Query: ", query);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const patchContato = (req, res) => {
	const { contato, matricula, setor, telefone, email, site, deletado } = req.body;

	let query = "";

	if (deletado == 1) {
		query = `UPDATE RKF_CONTATOS_RECALL SET DELETADO = 1 WHERE ID = ${req.params.idcontato}`;
	} else {
		query = `
		UPDATE RKF_CONTATOS_RECALL
		SET CONTATO = '${contato}'
			,MATRICULA = '${matricula}'
			,SETOR = '${setor}'
			,TELEFONE = '${telefone}'
			,EMAIL = '${email}'
			,SITE = '${site}'
		WHERE ID = ${req.params.idcontato}
	`
	}

	console.log(query);

	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing patchContato: ", err);
			console.error("Query: ", query);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}
