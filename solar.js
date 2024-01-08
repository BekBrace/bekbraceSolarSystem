paper.install(window);

//function to generate the sun
generateSun = () => {
  let sun = new Path.Circle({
    center: view.center,
    radius: 30,
  });
  sun.fillColor = {
    gradient: {
      stops: [
        ["white", 0.01],
        ["#fff6c9", 0.05],
        ["#ffefa3", 0.5],
        ["orange", 0.99],
      ],
      radial: true,
    },
    origin: sun.position,
    destination: sun.bounds.rightCenter,
  };
};

//generate orbit for all the planets
generateOrbit = (offset) => {
    let path = new Path();
    path.strokeColor = "#fff";
    let centerOfCanvas = view.center;
    let center_y = centerOfCanvas._y;
    let center_x = centerOfCanvas._x;
    path.add(
      new Point(center_x - offset - 100, center_y),
      new Point(center_x, center_y - offset),
      new Point(center_x + offset + 100, center_y),
      new Point(center_x, center_y + offset)
    );
    path.opacity = 0.3;
    path.closed = true;
    path.smooth();
    return path;
  };

// Function to generate Mercury
generateMercury = () => {
    let mercury = new Path.Circle({
      center: view.center,
      radius: 5,
    });
    mercury.fillColor = {
      gradient: {
        stops: ["#D3D3D3", "#C0C0C0", "#fff", "#A9A9A9", "#808080"],
        radial: false,
      },
      origin: mercury.bounds.leftCenter,
      destination: mercury.bounds.rightCenter,
    };
    return mercury;
  };

// Function to generate Venus
generateVenus = () => {
let venus = new Path.Circle({
    center: view.center,
    radius: 6,
});
venus.fillColor = {
    gradient: {
        stops: ["#fbab60", "#ffb347", "#fff", "#A9A9A9", "#808080"],
        radial: false,
    },
    origin: venus.bounds.letfCenter,
    destination: venus.bounds.rightCenter,    
  };
    return venus;
};

// Function to generate Earth
generateEarth = () => {
let earth = new Path.Circle({
    center: view.center,
    radius: 10,
});
earth.fillColor = {
    gradient: {
        stops:["#44dfff", "#46a35b", "green", "#448cff", "#44dfff"],
        radial: false,
    },
    origin: earth.bounds.letfCenter,
    destination: earth.bounds.rightCenter,    
  };
    return earth;
};

// Function to generate Mars
generateMars = () => {
let mars = new Path.Circle({
    center: view.center,
    radius: 10,
});
mars.fillColor = {
    gradient: {
        stops:["#ffa500", "#ffcc99", "#ff9966", "#fbab60", "#fb9902"],
        radial: false,
    },
    origin: mars.bounds.letfCenter,
    destination: mars.bounds.rightCenter,    
  };
    return mars;
};

// Function to generate Jupiter
generateJupiter = () => {
let jupiter = new Path.Circle({
    center: view.center,
    radius: 18,
});
jupiter.fillColor = {
    gradient: {
        stops:["#ff9966", "#606060", "#ffa07a", "#ff9933", "#707070"],
        radial: false,
    },
    origin: jupiter.bounds.letfCenter,
    destination: jupiter.bounds.rightCenter,    
  };
    return jupiter;
};

// Function to generate Saturn
generateSaturn = () => {
let saturn = new Path.Circle({
    center: view.center,
    radius: 15,
});
saturn.fillColor = {
    gradient: {
        stops:["#fbab60", "#9bc4e2", "#87ceeb", "#707070", "#888888"],
        radial: false,
    },
    origin: saturn.bounds.letfCenter,
    destination: saturn.bounds.rightCenter,    
  };
    return saturn;
};

// Function to generate Uranus
generateUranus = () => {
let uranus = new Path.Circle({
    center: view.center,
    radius: 13,
});
uranus.fillColor = {
    gradient: {
        stops:["#C0C0C0", "#C8C8C8", "#D3D3D3", "#E0E0E0", "#F0F0F0"],
        radial: false,
    },
    origin: uranus.bounds.letfCenter,
    destination: uranus.bounds.rightCenter,    
  };
    return uranus;
};

// Function to generate Neptune
generateNeptune = () => {
let neptune = new Path.Circle({
    center: view.center,
    radius: 12,
});
neptune.fillColor = {
    gradient: {
        stops:["#9bc4e2", "#4682b4", "#89cff0", "#8cbed6", "#7cb9e8"],
        radial: false,
    },
    origin: neptune.bounds.letfCenter,
    destination: neptune.bounds.rightCenter,    
  };
    return neptune;
};


// Common functionto move the planets across the oribit
// For now, we have the functions that generate the planets, but they cannot move ... yet !
movePlanet = (planet, orbit, offset) =>{
planet.rotate(10);
if (offset < orbit.length){
        planet.position = orbit.getPointAt(offset);
        offset += 1;
    }else{
        offset = 0;
    }
    return offset;
}

// Now, let us have the stars in the background
// this is an initial aplha value for the pulsating glow!
let glowAlpha = 0.2;

generateStars = () => {
    let star = new Path.Circle(new Point(20, 20), 2);
    // Use color class for RGBA with Alpha
    star.fillColor = new Color(1,1,1, glowAlpha);
    let symbol = new Symbol(star);
    let {width, height} = view.size;
    // fell free to increase or decrease the number of stars
    for (let i = 0; i < 2000; i++){
        const randomPoint = Point.random();
        let random_x = randomPoint.x,
            random_y = randomPoint.y;
        let placed = symbol.place(new Point( width * random_x, height * random_y));
        placed.scale(1, 0.5);
    }

    // On each frame, update the alpha for the pulsating glow
    view.onFrame = function (e) {
        // Adjust the amplitude and frequency for the pulsatin effect
        glowAlpha = 0.2 + 0.1 * Math.sin(e.time);
        star.fillColor = new Color( 1,1,1,glowAlpha);
    };
};

window.onload = function(){
    paper.setup("myCanvas");

    //Generate the sun
    generateSun();

    //Mercury
    let mercuryOrbit = generateOrbit(100);
    let mercury = generateMercury();
    let mercuryOffset = 0;
    
    //Venus
    let venusOrbit = generateOrbit(150);
    let venus = generateVenus();
    let venusOffset = 0;
    
    //Earth
    let earthOrbit = generateOrbit(200);
    let earth = generateEarth();
    let earthOffset = 0;
    
    //Mars
    let marsOrbit = generateOrbit(250);
    let mars = generateMars();
    let marsOffset = 0;
    
    //Jupiter
    let jupiterOrbit = generateOrbit(300);
    let jupiter = generateJupiter();
    let jupiterOffset = 0;
    
    //Saturn
    let saturnOrbit = generateOrbit(350);
    let saturn = generateSaturn();
    let saturnOffset = 0;
    
    //Uranus
    let uranusOrbit = generateOrbit(400);
    let uranus = generateUranus();
    let uranusOffset = 0;
    
    //Neptune
    let neptuneOrbit = generateOrbit(450);
    let neptune = generateNeptune();
    let neptuneOffset = 0;


generateStars();
view.onFrame = () =>{
    //Move Mercury
    mercuryOffset = this.movePlanet(mercury, mercuryOrbit, mercuryOffset);
    
    //Move Venus
    venusOffset = this.movePlanet(venus, venusOrbit, venusOffset);
    
    //Move Earth
    earthOffset = this.movePlanet(earth, earthOrbit, earthOffset);
    
    //Move Mars
    marsOffset = this.movePlanet(mars, marsOrbit, marsOffset);
    
    //Move Jupiter
    jupiterOffset = this.movePlanet(jupiter, jupiterOrbit, jupiterOffset);

    //Move Saturn
    saturnOffset = this.movePlanet(saturn, saturnOrbit, saturnOffset);
    
    //Move Uranus
    uranusOffset = this.movePlanet(uranus, uranusOrbit, uranusOffset);

    // Move Neptune
    neptuneOffset = this.movePlanet(neptune, neptuneOrbit, neptuneOffset);
    
    };
};