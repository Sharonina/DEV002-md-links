# Md-links
Md-links es un proyecto basado en recibir una ruta y en ella, buscar los links que se encuentran en los archivos mark-down (.md) retornandonos un objecto que contiene el nombre del link, el link y la ruta en que fue encontrado. De la misma forma, md-links nos proveé una validación del link encontrado con su código de estado y su mensaje.

# Modo de uso

Teniendo la librería instalada:
- Para buscar los links en una carpeta: md-link ./directory
- Para buscar los links en un archivo: md-link ./directory/fileName
- Para buscar los links en una carpeta y validarlos: md-link ./directory true
- Para buscar los links en un archivo y validarlos: md-link ./directory/fileName true
- Para buscar el numero total de links y cuantos son únicos: md-link ./directory --stats
- Para buscar el numero total de links, cuantos son únicos y cuantos estan rotos: md-link ./directory --stats --validate
