import * as THREE from 'three';

    // Elegant subtle 3D background
    const canvas = document.getElementById('webgl-bg');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    // Ambient + subtle lights
    const ambient = new THREE.AmbientLight(0x1a1a2e);
    scene.add(ambient);
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
    mainLight.position.set(1, 2, 3);
    scene.add(mainLight);
    const fillLight = new THREE.PointLight(0x8866ff, 0.3);
    fillLight.position.set(-2, 1, 4);
    scene.add(fillLight);

    // Central elegant torus knot
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.35, 180, 24, 3, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x331a66, roughness: 0.25, metalness: 0.7 });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Particle ring
    const particleCount = 1200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i*3+2] = radius * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xa880ff, size: 0.05, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(particlesGeo, particleMat);
    scene.add(particles);

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.006;
      knot.rotation.x = time * 0.3;
      knot.rotation.y = time * 0.5;
      particles.rotation.y = time * 0.1;
      particles.rotation.x = Math.sin(time * 0.2) * 0.1;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Contact form handler
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const msg = document.getElementById('contactMsg')?.value.trim();
        if (name && email && msg) {
          statusDiv.innerHTML = '✓ Message sent successfully. I\'ll get back to you soon.';
          statusDiv.style.color = '#a855f7';
          form.reset();
          setTimeout(() => statusDiv.innerHTML = '', 4000);
        } else {
          statusDiv.innerHTML = '✗ Please fill all fields.';
          statusDiv.style.color = '#f87171';
        }
      });
    }

    // Download resume simulation
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 Resume download: Sailendra_Khatiwada_Resume_2025.pdf (In production, link your actual PDF)');
      });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a, .logo, .btn-primary, .btn-outline').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });