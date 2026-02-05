(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

// Enhanced Floating Valentine Images with Physics and Responsive Scaling
function createFloatingImages() {
    const imageFolder = './images/';
    let floatingImages = [];
    let animationId;
    
    // Get all images from the images folder
    async function loadImagesFromFolder() {
        // Real images found in the folder
        const actualImages = [
            '1a45e5a2-8eea-455b-a1a0-e6d951107138.jpeg',
            '21c942fd-edcd-41c0-a434-bdd1af2a83f7.jpeg',
            '61206349-31f3-4603-a6c4-f0e25ad42921.jpeg',
            '617ee791-7562-4ed2-b9c3-66a7ee9758a8.jpeg',
            '8510b7f2-b3a0-462b-8045-2a36d384fe33.jpeg',
            '851f15d0-ecc6-42a7-ad78-98856a287e95.jpeg',
            '88b0a813-2140-430d-9fa5-fad1d1e57a8b.jpeg',
            '8df68b21-e8a0-47d3-bace-575989a33c80.jpeg',
            '9460de48-41dc-470a-94b8-5fdd5a9782f8.jpeg',
            'aaf72977-dab2-4dd9-9cf4-5f33c35f1377.jpeg',
            'b6e19ec1-c39c-468c-bea7-3f6d6c4438a2.jpeg'
        ];
        
        // Verify which images actually exist and load properly
        const validImages = [];
        for (const imageName of actualImages) {
            try {
                const response = await fetch(`${imageFolder}${imageName}`, { method: 'HEAD' });
                if (response.ok) {
                    validImages.push(imageName);
                }
            } catch (error) {
                console.log(`Could not load ${imageName}:`, error);
            }
        }
        
        console.log(`Found ${validImages.length} valid images in folder:`, validImages);
        return validImages.length > 0 ? validImages : ['test1.png']; // Fallback to test1.png if none load
    }
    
    class FloatingImage {
        constructor(imageSrc, index) {
            this.img = document.createElement('img');
            this.img.src = imageSrc;
            this.img.className = 'floating-valentine-physics';
            
            // Enhanced responsive size calculation - bigger scaling for larger screens
            const screenArea = window.innerWidth * window.innerHeight;
            const screenDiagonal = Math.sqrt(screenArea);
            
            // More aggressive scaling based on screen type
            let baseSize;
            if (screenArea < 500000) {        // Mobile screens
                baseSize = screenDiagonal * 0.06;     // 6% of diagonal
            } else if (screenArea < 1000000) { // Tablet screens
                baseSize = screenDiagonal * 0.09;     // 9% of diagonal
            } else if (screenArea < 2000000) { // Laptop screens
                baseSize = screenDiagonal * 0.12;     // 12% of diagonal (much bigger!)
            } else {                          // Large desktop/4K screens
                baseSize = screenDiagonal * 0.14;     // 14% of diagonal
            }
            
            const sizeVariation = baseSize * 0.5; // 50% size variation for more diversity
            this.size = baseSize + Math.random() * sizeVariation;
            
            // Adjusted size constraints - higher minimum for larger screens
            const minSize = screenArea < 1000000 ? 80 : 120; // Bigger minimum for laptop+
            this.size = Math.max(minSize, Math.min(400, this.size));
            
            this.img.style.width = this.size + 'px';
            this.img.style.height = 'auto';
            
            // Random starting position across the screen
            this.x = Math.random() * (window.innerWidth - this.size);
            this.y = Math.random() * (window.innerHeight - this.size);
            
            // Enhanced velocity calculation with speed limits
            const screenSize = Math.min(window.innerWidth, window.innerHeight);
            let velocityScale = screenSize / 800; // Base scale factor
            
            // Speed limits based on screen size
            const maxSpeed = screenArea < 1000000 ? 1.5 : 2.5; // Faster on larger screens
            const minSpeed = 0.3;
            
            // Generate base velocity
            let baseVx = (Math.random() - 0.5) * 2 * velocityScale;
            let baseVy = (Math.random() - 0.5) * 2 * velocityScale;
            
            // Enforce speed limits
            this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, baseVx));
            this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, baseVy));
            
            // Ensure minimum speed (not too slow)
            if (Math.abs(this.vx) < minSpeed) {
                this.vx = this.vx >= 0 ? minSpeed : -minSpeed;
            }
            if (Math.abs(this.vy) < minSpeed) {
                this.vy = this.vy >= 0 ? minSpeed : -minSpeed;
            }
            
            // Random starting rotation
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2; // -1 to 1 degrees per frame
            
            this.updatePosition();
            document.body.appendChild(this.img);
        }
        
        updatePosition() {
            this.img.style.left = this.x + 'px';
            this.img.style.top = this.y + 'px';
            this.img.style.transform = `rotate(${this.rotation}deg)`;
        }
        
        update() {
            // Apply drag/friction to gradually slow down movement
            const dragFactor = 0.998; // Very gentle drag (0.2% reduction per frame)
            this.vx *= dragFactor;
            this.vy *= dragFactor;
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            
            // Bounce off all edges of the viewport/screen with velocity damping
            let bounced = false;
            
            if (this.x <= 0) {
                this.x = 0;
                this.vx = Math.abs(this.vx) * 0.8; // Bounce right with 20% energy loss
                bounced = true;
            } else if (this.x >= window.innerWidth - this.size) {
                this.x = window.innerWidth - this.size;
                this.vx = -Math.abs(this.vx) * 0.8; // Bounce left with 20% energy loss
                bounced = true;
            }
            
            if (this.y <= 0) {
                this.y = 0;
                this.vy = Math.abs(this.vy) * 0.8; // Bounce down with 20% energy loss
                bounced = true;
            } else if (this.y >= window.innerHeight - this.size) {
                this.y = window.innerHeight - this.size;
                this.vy = -Math.abs(this.vy) * 0.8; // Bounce up with 20% energy loss
                bounced = true;
            }
            
            // If bounced and moving too fast, add extra damping
            if (bounced) {
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const maxBounceSpeed = 2.0;
                
                if (currentSpeed > maxBounceSpeed) {
                    const scale = maxBounceSpeed / currentSpeed;
                    this.vx *= scale;
                    this.vy *= scale;
                }
            }
            
            // Ensure minimum movement to prevent complete stopping
            const minSpeed = 0.1;
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            
            if (currentSpeed < minSpeed && currentSpeed > 0) {
                const scale = minSpeed / currentSpeed;
                this.vx *= scale;
                this.vy *= scale;
            }
            
            // Add tiny random movement to prevent getting completely stuck
            if (Math.abs(this.vx) < 0.05 && Math.abs(this.vy) < 0.05) {
                this.vx += (Math.random() - 0.5) * 0.1;
                this.vy += (Math.random() - 0.5) * 0.1;
            }
            
            this.updatePosition();
        }
        
        // Check collision with another image
        collidesWith(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const collisionDistance = (this.size + other.size) / 2.2; // More accurate collision detection
            return distance < collisionDistance;
        }
        
        // Bounce off another image
        bounceOff(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && distance < (this.size + other.size) / 2) {
                // Normalize direction
                const nx = dx / distance;
                const ny = dy / distance;
                
                // Separate the images first to prevent overlap
                const overlap = (this.size + other.size) / 2 - distance;
                const separation = overlap * 0.6;
                
                this.x += nx * separation * 0.5;
                this.y += ny * separation * 0.5;
                other.x -= nx * separation * 0.5;
                other.y -= ny * separation * 0.5;
                
                // Calculate relative velocity in collision normal direction
                const rvx = this.vx - other.vx;
                const rvy = this.vy - other.vy;
                const speed = rvx * nx + rvy * ny;
                
                // Do not resolve if velocities are separating
                if (speed > 0) return;
                
                // Apply collision response with bounce factor
                const bounceForce = 0.7; // Good balance between realistic and energetic
                const impulse = 2 * speed / 2; // Assume equal mass
                const impulseX = impulse * nx * bounceForce;
                const impulseY = impulse * ny * bounceForce;
                
                // Update velocities
                this.vx -= impulseX;
                this.vy -= impulseY;
                other.vx += impulseX;
                other.vy += impulseY;
                
                // Apply slight damping only on collision
                const collisionDamping = 0.95;
                this.vx *= collisionDamping;
                this.vy *= collisionDamping;
                other.vx *= collisionDamping;
                other.vy *= collisionDamping;
                
                // Ensure minimum speed after collision
                const minSpeed = 0.2;
                [this, other].forEach(img => {
                    const imgSpeed = Math.sqrt(img.vx * img.vx + img.vy * img.vy);
                    if (imgSpeed < minSpeed) {
                        const scale = minSpeed / (imgSpeed || 0.1);
                        img.vx *= scale;
                        img.vy *= scale;
                    }
                    
                    // Cap maximum collision speed
                    const maxSpeed = 3.5;
                    if (imgSpeed > maxSpeed) {
                        const scale = maxSpeed / imgSpeed;
                        img.vx *= scale;
                        img.vy *= scale;
                    }
                });
            }
        }
    }
    
    async function initFloatingImages() {
        let imageNames = await loadImagesFromFolder();
        
        // Calculate number of images based on screen size with breakpoints
        const screenArea = window.innerWidth * window.innerHeight;
        let targetImageCount;
        
        // Responsive breakpoints for different screen sizes
        if (screenArea < 500000) {        // Small screens (mobile)
            targetImageCount = 6;
        } else if (screenArea < 1000000) { // Medium screens (tablet)
            targetImageCount = 10;
        } else if (screenArea < 2000000) { // Large screens (desktop)
            targetImageCount = 15;
        } else {                          // Very large screens (4K+)
            targetImageCount = 20;
        }
        
        // Ensure minimum of 6 images
        targetImageCount = Math.max(6, targetImageCount);
        
        let selectedImages = [];
        
        // Prioritize unique images first
        if (imageNames.length >= targetImageCount) {
            // We have enough unique images - use them all uniquely
            selectedImages = imageNames.slice(0, targetImageCount);
            console.log(`Using ${selectedImages.length} unique images for floating effect`);
        } else {
            // Not enough unique images - use all unique ones and duplicate some
            selectedImages = [...imageNames]; // Start with all unique images
            
            // Fill remaining spots with duplicates
            const originalImages = [...imageNames];
            while (selectedImages.length < targetImageCount) {
                selectedImages.push(...originalImages);
            }
            selectedImages = selectedImages.slice(0, targetImageCount);
            console.log(`Using ${imageNames.length} unique images, duplicated to ${selectedImages.length} total`);
        }
        
        // Store all available images for swapping
        window.allAvailableImages = [...imageNames];
        
        console.log(`Creating ${selectedImages.length} floating images for screen size ${window.innerWidth}x${window.innerHeight}:`, selectedImages);
        
        // Create all floating images
        selectedImages.forEach((imageName, index) => {
            const floatingImg = new FloatingImage(`${imageFolder}${imageName}`, index);
            floatingImages.push(floatingImg);
        });
        
        // Start animation loop
        animate();
        
        // Start image swapping if we have more images than showing
        if (imageNames.length > selectedImages.length || imageNames.length > 1) {
            startImageSwapping();
        }
    }
    
    function animate() {
        // Update all images
        floatingImages.forEach(img => img.update());
        
        // Check collisions between all images
        for (let i = 0; i < floatingImages.length; i++) {
            for (let j = i + 1; j < floatingImages.length; j++) {
                if (floatingImages[i].collidesWith(floatingImages[j])) {
                    floatingImages[i].bounceOff(floatingImages[j]);
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Image swapping system for variety
    function startImageSwapping() {
        const swapInterval = 15000; // Swap an image every 15 seconds
        
        setInterval(() => {
            if (floatingImages.length > 0 && window.allAvailableImages && window.allAvailableImages.length > 1) {
                // Pick a random floating image to swap
                const randomIndex = Math.floor(Math.random() * floatingImages.length);
                const imageToSwap = floatingImages[randomIndex];
                
                // Get current image source to avoid swapping to the same image
                const currentSrc = imageToSwap.img.src;
                const currentImageName = currentSrc.split('/').pop();
                
                // Pick a different random image from available ones
                let newImageName;
                let attempts = 0;
                do {
                    newImageName = window.allAvailableImages[Math.floor(Math.random() * window.allAvailableImages.length)];
                    attempts++;
                } while (newImageName === currentImageName && attempts < 10);
                
                // Swap the image with a smooth transition
                if (newImageName !== currentImageName) {
                    swapImageSmoothly(imageToSwap, `${imageFolder}${newImageName}`);
                }
            }
        }, swapInterval);
    }
    
    // Smooth image swapping with fade effect
    function swapImageSmoothly(floatingImage, newImageSrc) {
        // Fade out
        floatingImage.img.style.transition = 'opacity 0.5s ease-out';
        floatingImage.img.style.opacity = '0';
        
        setTimeout(() => {
            // Change the image source
            floatingImage.img.src = newImageSrc;
            
            // Fade back in
            floatingImage.img.style.opacity = '0.85';
            
            // Remove transition after fade completes
            setTimeout(() => {
                floatingImage.img.style.transition = 'transform 0.1s ease-out';
            }, 500);
        }, 500);
    }
    
    // Clean up function
    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        floatingImages.forEach(img => {
            if (img.img.parentNode) {
                img.img.parentNode.removeChild(img.img);
            }
        });
        floatingImages = [];
        
        // Clear any existing swap intervals
        if (window.swapInterval) {
            clearInterval(window.swapInterval);
        }
    }
    
    // Handle window resize with complete recreation
    window.addEventListener('resize', () => {
        // Clean up existing images
        cleanup();
        
        // Recreate images with new screen-appropriate sizing and count
        setTimeout(() => {
            initFloatingImages();
        }, 100); // Small delay to ensure window resize is complete
    });
    
    initFloatingImages();
    
    return cleanup;
}

// Start the floating images effect when the page loads
window.addEventListener('load', createFloatingImages);

// Background Music Management
function initBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    
    if (audio) {
        // Set volume to a comfortable level
        audio.volume = 0.3;
        
        // Try to play music automatically (may be blocked by browser)
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Background music started automatically');
                })
                .catch(error => {
                    console.log('Autoplay blocked, music will start on user interaction');
                    // Add click listener to start music on first user interaction
                    document.addEventListener('click', () => {
                        audio.play().catch(e => console.log('Could not play music:', e));
                    }, { once: true });
                });
        }
    }
}

// Initialize background music when page loads
window.addEventListener('load', initBackgroundMusic);
