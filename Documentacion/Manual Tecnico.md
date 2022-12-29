# Manual Técnico
### AviCar

---

## Objetivos
  1. Dar a conocer las herramientas utilizadas para la creación de AviCar, tales como el frontend, como el backend y los servicios de la nube.
  2. Explicar los servicios utilizados de AWS y la configuración de cada uno de estos y su proposito en el desarrollo de AviCar.
  3. Recomendar la estructura utiilzada para la elaboración de la aplicación la cual se puede adaptar a las necesidades de cada proyecto.

## Arquitectura utilizada
Toda la arquitectura del sistema se encuentra ejecutandose en una instancia de una maquina virtual en AWS con ayuda de docker. Si se quiere acceder al frontend o consumir la API, se debe ingresar la ip de la maquina virtual seguido del puerto en el que se esta ejecutando.

#### Backend
El backend consiste en un API con una serie de rutas disponibles para ser consumidas por cualquier cliente que tenga la dirección correcta. El API fue desarrollado con Nodejs 14.17.2 utilizando la libreria de express para faciltar el proceso. La información es guardada en archivos json en lugar de utilizar una base de datos como se indicaba en el enunciado del proyecto. Existen 5 tipos de objetos para manejar toda la información del proyecto: 
  - Usuario: Almacena todos los usuarios registrados en el sistema.
  - Viaje: Almacena todos los viajes creados por el administrador.
  - Auto: Almacena todos los autos creados por el administrador.
  - Usuario-viaje: Almacena relaciones entre usuarios y viajes cuando los turistas solicitan reservar un viaje.
  - Usuario-auto: Almacena relaciones entre usuarios y autos cuando los turistas solicitan reservar un auto.
  
Además, el backend está conectado con el servicio de administración de usuarios que ofrece AWS llamado cognito. Para almacenar las imagenes que suben los usuarios a sus perfiles se utiliza el servicio de AWS S3 Bucket, del cual se hablará proximamente.

#### Frontend
Para el desarrollo de la interfaz de usuario se utilizó el framework Angular versión 14.1.3 con versión de Nodejs 14.17.2. El frontend tiene un diseño básico ya que se utilizaron las librerías de bootstrap para los estilos de css. La intergaz consiste en una serie de vistas que pertenecientes a cada tipo de usuario disponible en el sistema, a excepción de las vistas para inicio de sesión y de registro ya que esas están para cualquier usuario sin necesidad de haber iniciado sesión. Las rutas con información de usuarios están bloqueadas para el públido ya que solamente usuarios registrados pueden tener acceso a ellas.

#### Cognito
AWS ofrece un servicio a sus clientes para poder administrar los usuarios registrados en sus sistemas llamado Cognito. Con ayuda de Cognito, AviCar puede registrar nuevos usuarios en el sistema, dejarlos iniciar sesión en el sistema y borrarlos completamente del sistema. Cada vez que un usuario se regestra en AviCar, Cognito se encarga de enviar un correo a la dirección de correo electrónico del usuario para que el usuario verifique su cuenta. Si el usuario no verifica su correo, no podrá iniciar sesión en AviCar. 

#### Bucket
Los usuario de AviCar pueden modifica su foto de perfil en cualquier momento, para ello solo deben subir una foto desde su computadora local y se cargara automáticamente en el sistema. AWS ofrece un servicio para almacenamiento de archivos de cualquier tipo. AviCar aprovecha este servicio y cuando cada usuario quiere subir una nueva foto, AviCar solo la manda al servicio de Bucket de AWS y de respuesta envía un link en donde se puede ver la imagen. AviCar solo almacena la ruta de donde se encuentra la imagen y la despliega en la plataforma en las vistas del usuario.

## Usuarios IAM
Para la elboración del sistema se utilzaron 3 servicios de AWS en total. Fue necesario crear un usuario IAM de AWS por cada servicio ya que las credenciales de los usuarios IAM son necesarios para conectar el backend con el servicio correspondiente de AWS.

#### Usuario de Cognito
Fue necesario crear un usuario IAM para utilizar los servicios de cognito. El usuario root de AWS tuvo que crear un usuario y otorgarle todos los permisos que requiere Cognito para funcionar


#### Usuario EC2
Los proyectos frontend y backend se encuentran ejecutandose en una instancia de una maquina virtual de AWS. Para el gestionamiento de instancias fue necesario crear un usuario IAM con todas los permisos para administrar los servicios de maquinas virtuales llamado EC2. 

#### Usuario S3
Las imagenes que suben los usuarios a AviCar son almacenadas en un Buquet de archivos que ofrece el servicio de S3 de AWS. Para conectar el backend con S3 fue necesario crear un usuario IAM con los permisos necesarios sobre S3 y generar una llave de acceso para subir las imagenes sin ningún problema. 


## Configuración de servicios
#### Servicio EC2
Para la maquina virtual en EC2 se utilizó una instancia de Ubunutu de 64 bits con 20GB de almacenamiento y 1GB de memoria. Para acceder a la maquina virtual remotamente se generó una llave SSH única la cual hay que ingresar en un comando para que AWS permita el acceso.
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/ec2-config1.png)
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/ec2-congif2.png)

##### Servicio Cognito
Para utilizar AWS cognito se generó un usuario con todos los permisos de Cognito necesarios para administrar usuarios en el sistema. Se creó un nuevo grupo de usuarios el cual tendrá todos los usuarios de AviCar.
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/cognito-config.png)

#### Servicio S3
Las imagenes de AviCar son almacenadas en un Bucket de S3. Se creó un bucket nuevo buquet con permisos para que todo el público pueda subir archivos al buquet y que sea más facil la conexión entre el backend y S3.
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/bucket-config1.png)
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/bucket-config2.png)
![alt text](https://appweb-201900810-p2.s3.amazonaws.com/bucket-config3.png)

## Conclusiones
  1. Los servicios en la nube para aplicaciones web que utilicen frontend, un API y una base de datos resultan útiles, faciles de configurar y más baratos de mantener que servidores locales.
  2. Con ayuda de docker se pueden ejecutar proyectos en maquinas virtuales sin necesidad de tener el codigo fuente, sino solamente la imagen y los archivos de configuarción de docker para administrar las variables de entorno.
  3. AWS cuenta con servicios disponibles para sus usuarios para ayudarles a administrar usuarios y archivos escenciales para el funcionamiento de las aplicaciones, además de ofrecer una conectividad a sus servicios desde casi cualquier tecnología que use el proyecto (en este caso fue Nodejs).
