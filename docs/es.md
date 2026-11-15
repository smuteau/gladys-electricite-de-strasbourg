# Électricité de Strasbourg

Las ofertas verdes a precio fijo de ÉS (Électricité de Strasbourg) para la supervisión de energía de
Gladys: Base, Horas valle y las opciones Week-end, con o sin la opción 100 % regional.

## Qué hace la integración

Añade ocho plantillas de contrato al asistente de contratos de Gladys y proporciona a Gladys los
festivos nacionales franceses que necesitan las opciones Week-end. Después Gladys calcula por sí solo el
coste de su consumo, a partir del contador que ya sigue (Linky, TIC, pinza amperimétrica…).

La integración no se conecta a nada: ni a su área de cliente de ÉS ni a Internet. No hay ninguna
credencial que introducir.

## Los contratos

| Plantilla en Gladys                                         | Contrato ÉS                                 | Precios del kWh    |
| ----------------------------------------------------------- | ------------------------------------------- | ------------------ |
| ÉS Verde precio fijo 1 año – Base                           | Offre verte à prix fixe 1 an                | Los de su contrato |
| ÉS Verde precio fijo 1 año – Horas valle                    | Offre verte à prix fixe 1 an                | Los de su contrato |
| ÉS Verde precio fijo 1 año – Fin de semana                  | Offre verte, opción Week-end Base           | Los de su contrato |
| ÉS Verde precio fijo 1 año – Fin de semana + Horas valle    | Offre verte, Week-end et Heures Creuses     | Los de su contrato |
| ÉS Verde 100 % regional 1 año – Base                        | Offre électricité verte 100 % régionale     | Los de su contrato |
| ÉS Verde 100 % regional 1 año – Horas valle                 | Offre électricité verte 100 % régionale     | Los de su contrato |
| ÉS Verde 100 % regional 1 año – Fin de semana               | 100 % régionale, opción Week-end Base       | Los de su contrato |
| ÉS Verde 100 % regional 1 año – Fin de semana + Horas valle | 100 % régionale, Week-end et Heures Creuses | Los de su contrato |

El nombre de su contrato y su opción figuran en el anverso de su factura de ÉS, apartado «option
tarifaire».

**¿Tiene el Tarif Bleu regulado?** No está en esta integración: elija las plantillas «Électricité de
Strasbourg» del catálogo comunitario de Gladys, en el mismo asistente. Existen para cada potencia, con
el historial de precios.

Las ofertas para profesionales no están cubiertas.

## Crear un contrato

1. Abra **Integraciones → Supervisión de energía → Contratos** y cree un contrato para su contador.
2. Elija la plantilla «ÉS» que corresponde a su factura.
3. Revise los valores propuestos:
   - **Abono mensual**: prerrellenado para 6 kVA. La tabla por
     potencia se recuerda bajo el campo: introduzca el importe de la suya.
   - **Horas valle**: las de su contador, fijadas por Strasbourg Électricité Réseaux (8 horas al día, a
     menudo de 22 a 6 h). Figuran en su factura.
   - **Precios del kWh**: estas ofertas tienen un precio fijo durante un año
     desde su contratación. Los campos están prerrellenados con la tabla vigente: sustitúyalos por los
     precios de su contrato si son distintos.
4. Elija la fecha de inicio del contrato, consulte la vista previa y guarde.

Todos los precios incluyen impuestos.

En la renovación anual, ÉS le comunica nuevos precios: cree entonces un contrato nuevo en Gladys desde
esa fecha, con esos precios.

## Las opciones Week-end y los festivos

Con las opciones Week-end, el precio reducido se aplica del sábado a las 0 h al domingo a medianoche y
los festivos nacionales. El Viernes Santo y el 26 de diciembre, festivos solo en Alsacia, los factura
ÉS como días laborables: la integración hace lo mismo.

La integración publica estos festivos en el calendario `holidays-fr` de Gladys. Si otra integración ya
proporciona ese calendario, lo conserva y las plantillas ÉS leen sus valores. Compruebe entonces que no
cuente los festivos de Alsacia-Mosela.

## Fuentes de los precios

- Ofertas verdes: tablas ÉS del 1 de noviembre de 2026 (INF-1186 e INF-1192).

Las tablas vigentes se publican en [particuliers.es.fr](https://particuliers.es.fr/electricite-gaz/electricite/choisir-la-bonne-offre-delectricite).

## Aviso legal

Sitio oficial de ÉS: [www.es.fr](https://www.es.fr/).

Esta integración es un proyecto comunitario independiente. No está publicada, validada ni respaldada
por ÉS Énergies Strasbourg, Électricité de Strasbourg ni el grupo ÉS, y no tiene ningún vínculo
comercial con ellos. Tampoco es un producto oficial de Gladys Assistant.

Los nombres «ÉS», «Électricité de Strasbourg» y «ÉS Énergies Strasbourg», así como el
logotipo de ÉS, son marcas y elementos gráficos que pertenecen a sus respectivos propietarios. Solo se
usan aquí para designar al proveedor y sus contratos, sin intención de sugerir una colaboración. Se
retirarán a la primera solicitud de su titular.

Los precios se han copiado de las tablas publicadas por ÉS, a título informativo y sin garantía de
exactitud ni de actualización. Solo su contrato y sus facturas de ÉS dan fe: los costes que muestra
Gladys son estimaciones.
