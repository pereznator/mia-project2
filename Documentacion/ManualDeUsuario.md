
# Manual de Usuario
## AviCar

----

## Objetivos
  - Dar a conocer todas las funcionalidades de la aplicación AviCar para que el usuario entienda su comportamiento y pueda sacarle el mayor provecho a las ventajas de la aplicación.
  - Exponer la aplicación en una dirección pública para que cualquier persona pueda entrar y utilizar todas sus funcionalidades.
  - Alentar a los usuarios a construir una aplicación con la misma estructura pero con diferentes funcionalidades utilizando nodejs, Angular, docker y aws para la construcción de toda la aplicación.

---  

## Descripción de la aplicación
Al iniciar la aplicación, existirá solamente un usuario administrador con las credenciales guardadas en un archivo `docker-compose.yml` en donde su dirección de correo electrónico (`ADMIN_EMAIL`), su nombre de usuario (`ADMIN_USER`) y su contraseña (`ADMIN_PASSWORD`) serán los datos en los que se basa para su creación. Un correo de confirmación se enviará a la dirección de correo del administrador para poder iniciar sesipón.

**Es importante recalcar que todos los usuarios deben confirmar su correo para poder iniciar sesión en AviCar** 

Una vez se confirma el correo electrónico, en la ruta /login entrando su nombre de usuario o correo electrónico y su contraseña se podra iniciar sesión. 

#### Administrador
En la página de inicio del administrador se puede observar un mensaje de bienvenida y una serie de opciones que solamnete el administrador podrá tener acceso. Tendrá la opción de administrar usuarios, también podrá gestionar los viajes disponibles en la aplicación y podrá gestionar los autos disponibles en el sistema.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/Screenshot+from+2022-12-28+13-17-45.png)


En la página de administración de usuarios, el administrador podrá ver un listado de todos los usuarios con información basica. También tiene disponible la creación y eliminación de usuarios.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/usuarios-admin.png)

El administrador pude crear y eliminar viajes en la interfaz de viajes disponibles en el sistema. Para crear viajes se debe ir a la parte superior derecha de la pantalla para crear un nuevo viaje llenando el formulario de viajes. Para eliminar un viaje debe hacer click en el boton "eliminar" que hay en la tabla de viajes en la columna de "acción".

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/viajes-admin.png)

De la misma manera que con los viajes, el administrador puede crear y eliminar autos disponibles en la plataforma. Para crea un nuevo objeto de tipo auto, deberá hacer click en el boton "Craer auto" en la parte superior derecha de la pantalla y llenar el formulario. Para eliminar un auto, solo debe presionar el boton "eliminar" en la columna de "accion" en la tabla de autos.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/autos-admin.png)

#### Turista
Cuando un turista inicia sesión en AviCar lo primero que verá es la pantalla de inicio. La pantalla de inicio contiene una serie de opciones que son propias de un usuario tipo turista, entre ellas podemos encontrar: ver viajes, ver autos y ver solicitudes pertenecientes al turista.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/home-turista.png)

La pantalla de viajes para el turista consiste en una tabla llena con los viajes disponibles en la plataforma. Para poder solicitar un viaje se debe hacer click en el boton "reservar" que hay en la columna "acción" de la tabla de viajes. La tabla de viajes muestra información importante sobre cada viaje.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/viajes-turista.png)

De igual manera que con la pantalla de viajes, los usuarios turista tendran disponibles la opción de reservar autos en la pantalla de autos. Hacinedo click en el boton "reservar" en la columna de acción en la tabla de autos, el turista podrá hacer la solicitud de un auto.
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/autos-turista.png)

En el apartado de solicitudes, los turistas podrán ver el historial de solicitudes, tanto de viajes como de autos, que han hecho y verán el estado actual de sus solicitudes. Los estados pueden ser "esperando a ser califiado" y "calificado", mientras que los resultados pueden ser: "esperando" si todavía no ha sido calificada la solicitud, "aprobada" si la solicitud fue aprobada o "rechazada" si la solicitud fue rechazada.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/solicitudes-turista.png)

#### Recepcionista
La pantalla de inicio de los usuarios recepcionistas tienen opciones distintas a los del resto de usuarios. Los recepcionistas podrán ver las solicitudes que los turistan han hecho y ellos podrán decidir si aprobar o rechazar las solizitudes, tanto de viajes como de autos.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/home-recepcionista.png)

La pantalla de solicitudes de viajes le permite al recepcionista aprobar y rechazar las solicitudes de los usuarios. En la tabla de solicitudes se puede observar la información del viaje y del usuario. En caso de que no hayan solicitudes, se mostrará un mensaje de información.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/viajes-recepcionista.png)

La pantalla de solicitudes de autos le permite al recepcionista aprobar y rechazar las solicitudes de los usuarios. En la tabla de solicitudes se puede observar la información del auto y del usuario. En caso de que no hayan solicitudes, se mostrará un mensaje de información.

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/autos-recepcionista.png)

#### Perfil
Todos los usuarios tendrán la opción de ver su perfil en la barra de navegación en la parte superior de la pantalla. En la pantalla de perfil, los usuarios podrán ver su información básica y podrán editar opciones como su nombre y foto de perfil. Para guardar los cambios solo deberán de hacer click en el boton "guardar cambios".

![alt text](https://appweb-201900810-p2.s3.amazonaws.com/perfil.png)


