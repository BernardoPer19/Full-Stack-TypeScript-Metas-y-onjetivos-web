SELECT  m.metas_id,
		m.nombre_meta AS meta,
		m.descripcion,
		m.fecha_creacion,
		m.beneficio,
		m.tiempo_de_realizacion,
		m.user_id,
		p.nombre,
		c.nombre,
		e.nombre
FROM
	metas_tb m
	INNER JOIN
	prioridad_tb p ON m.prioridad_id = p.prioridad_id
	INNER JOIN 
	etiqueta_tb e ON m.etiqueta_id = e.etiqueta_id 
	INNER JOIN
	completado_tb c ON m.completado_id = c.completado_id
WHERE user_id = $1