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
		ORDER BY C.TIPO, C.CONTATO
	`;

	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}