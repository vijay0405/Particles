const particles = [];
var colors = generateRandomColor(Math.min(Math.floor(window.innerWidth), 100));


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	
	const particlesLength = Math.min(Math.floor(window.innerWidth), 100);
	for(let i=0; i<particlesLength; i++) {
		particles.push(new Particle());
	}
}

function draw() {
    
    // var random = Math.floor(Math.random() * colors.length);

    background(0);

    particles.forEach((particle, idx) => {
		particle.update();
		particle.draw();
		particle.checkParticles(particles.slice(idx));
	});
}

function generateRandomColor(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColors());
	}

	return arr;
}

function randomColors(){
	var r = Math.floor(Math.random() * 256);	
	var g = Math.floor(Math.random() * 256);	
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";	
}

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-2, 2), random(-2, 2));
		this.size = 5;
	}
	
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	
	draw() {
        noStroke();
        var random = Math.floor(Math.random() * colors.length);
		fill(colors[random]);
		circle(this.pos.x, this.pos.y, this.size * 2);
	}
	
	edges() {
		if(this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
        }
    }

    checkParticles(particles) {
		particles.forEach(particle => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			if(d < 120) {
                const alpha = map(d, 0, 120, 0, 0.25)
                var random = Math.floor(Math.random() * colors.length);
				stroke(colors[random]);
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
			}
		});
	}
}