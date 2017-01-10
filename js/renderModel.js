var container;
var camera, scene, particle;
var canvasRenderer, webglRenderer;
var mesh, zmesh, geometry;

function initModel()
{

	//CAMERA AND SCENE
	camera = new THREE.PerspectiveCamera(75, WRAP_WIDTH / WRAP_HEIGHT, 1, 100000);
	camera.position.z = 20;
	scene = new THREE.Scene();

	// LIGHTS
	var ambient = new THREE.AmbientLight(0x222222);
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight(0xCCCCCC);
	directionalLight.position.set(0, 40, 100).normalize();
	scene.add(directionalLight);

	//PARTICLES
	var spriteMat = new THREE.SpriteMaterial({
		map: new THREE.CanvasTexture(generateSprite()),
		blending: THREE.AdditiveBlending
	});
	for (var i = 0; i < 750; i++)
	{
		particle = new THREE.Sprite(spriteMat);
		initParticle(particle, i * 17.5);
		scene.add(particle);
	}

	//RENDERER
	webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	webglRenderer.setSize(WRAP_WIDTH, WRAP_HEIGHT);
	webglRenderer.domElement.style.position = "relative";

	//SET CONTAINER
	$("#mech_wrap").append(webglRenderer.domElement);

	//LOAD MODEL AND UV
	var loader = new THREE.JSONLoader();
	var callbackKey = function (geometry) { createScene(geometry, 0, -5, 0, 3, "model/mechUV.jpg") };
	loader.load("model/mech.js", callbackKey);
}


function createScene(geometry, x, y, z, scale, tmap)
{
	zmesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(tmap) }));
	zmesh.position.set(x, y, z);
	zmesh.scale.set(scale, scale, scale);
	scene.add(zmesh);
}
function render()
{
	//PARTICLES
	TWEEN.update();

	//CAMERA
	camera.position.x = (mouseX) * -.025;
	camera.position.y = (mouseY) * .025;
	camera.lookAt(scene.position);
	webglRenderer.render(scene, camera);
}
function animateModel()
{
	requestAnimationFrame(animateModel);
	render();
}


function generateSprite()
{
	var canvas = document.createElement('canvas');
	canvas.width = 8;
	canvas.height = 16;

	var context = canvas.getContext('2d');
	var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
	gradient.addColorStop(0, 'rgba(255,255,255,1)');
	gradient.addColorStop(1, 'rgba(255,255,255,0)');

	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

	return canvas;
}

function initParticle(particle, delay)
{

	var particle = this instanceof THREE.Sprite ? this : particle;
	var delay = delay !== undefined ? delay : 0;

	particle.position.set(0, -1000, -1500);
	particle.scale.x = particle.scale.y = Math.random() * 8 + 16;

	new TWEEN.Tween(particle)
		.delay(delay)
		.to({}, 10000)
		.onComplete(initParticle)
		.start();

	new TWEEN.Tween(particle.position)
		.delay(delay)
		.to({ x: Math.random() * 4000 - 2000, y: Math.random() * 4300 , z: Math.random() * 4000 }, 10000)
		.start();

	new TWEEN.Tween(particle.scale)
		.delay(delay)
		.to({ x: 0.01, y: 0.01 }, 10000)
		.start();

}













function MouseMoveModel(event)
{
	mouseX = (event.clientX - (WRAP_WIDTH / 2)) / 4;
	mouseY = (event.clientY - (WRAP_HEIGHT / 2)) / 8;
};
function WindowResizeModel() {
	updateWrapWidthHeight();
	camera.aspect = WRAP_WIDTH / WRAP_HEIGHT;
	camera.updateProjectionMatrix();
	webglRenderer.setSize(WRAP_WIDTH, WRAP_HEIGHT);
}
function updateWrapWidthHeight()
{
	WRAP_WIDTH = $("#mech_wrap").width();
	WRAP_HEIGHT = $("#mech_wrap").height();
}




