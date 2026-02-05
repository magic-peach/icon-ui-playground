
document.addEventListener('DOMContentLoaded', () => {

    const controlsConfig = [
        {
            id: 'btn-duration',
            label: 'Button Hover Duration',
            type: 'range',
            min: '0.1',
            max: '1.0',
            step: '0.1',
            varName: '--btn-duration',
            unit: 's',
            defaultValue: 0.2
        },
        {
            id: 'fade-duration',
            label: 'Text Fade Duration',
            type: 'range',
            min: '0.5',
            max: '5.0',
            step: '0.5',
            varName: '--fade-duration',
            unit: 's',
            defaultValue: 2
        },
        {
            id: 'text-delay',
            label: 'Text 2 Delay',
            type: 'range',
            min: '0.1',
            max: '2.0',
            step: '0.1',
            varName: '--text-delay',
            unit: 's',
            defaultValue: 0.3
        },
        {
            id: 'spin-duration',
            label: 'Loader Spin Duration',
            type: 'range',
            min: '0.5',
            max: '3.0',
            step: '0.5',
            varName: '--spin-duration',
            unit: 's',
            defaultValue: 1
        },
        {
            id: 'toggle-speed',
            label: 'Toggle Switch Speed',
            type: 'range',
            min: '0.1',
            max: '1.0',
            step: '0.1',
            varName: '--toggle-speed',
            unit: 's',
            defaultValue: 0.3
        }
    ];

    const controlPanel = document.getElementById('controls-container');
    const root = document.documentElement;

    // Helper: Restart all active CSS animations
    function restartAnimations() {
        // Force reflow method: drastically more reliable for restarting CSS animations 
        // when variables change mid-flight.
        const animatedElements = document.querySelectorAll('.line, .preview-loader');

        animatedElements.forEach(el => {
            // 1. Remove animation
            el.style.animation = 'none';
            // 2. Trigger reflow
            void el.offsetWidth;
            // 3. Restore animation (null removes the inline style, falling back to CSS class)
            el.style.animation = null;
        });
    }

    // 1. Generate Controls
    controlsConfig.forEach(config => {
        const wrapper = document.createElement('div');
        wrapper.className = 'control-group';

        const label = document.createElement('label');
        label.setAttribute('for', config.id);
        label.textContent = config.label;

        const valueDisplay = document.createElement('span');
        valueDisplay.className = 'control-value';
        valueDisplay.id = `${config.id}-val`;
        valueDisplay.textContent = config.defaultValue + config.unit;

        label.appendChild(valueDisplay);

        const input = document.createElement('input');
        input.type = config.type;
        input.id = config.id;
        input.min = config.min;
        input.max = config.max;
        input.step = config.step;
        input.value = config.defaultValue;

        // Update value in real-time
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            valueDisplay.textContent = val + config.unit;
            root.style.setProperty(config.varName, val + config.unit);
        });

        // Restart animation on release to show effect immediately
        input.addEventListener('change', () => {
            if (config.id === 'btn-duration') {
                // Special handling for transition: Simulate hover
                const btn = document.querySelector('.preview-btn');
                if (btn) {
                    btn.classList.add('simulate-hover');
                    // Remove after the duration (plus buffer) so it animates back
                    const durationInMs = parseFloat(input.value) * 1000;
                    setTimeout(() => {
                        btn.classList.remove('simulate-hover');
                    }, durationInMs + 100);
                }
            } else {
                // For keyframe animations (loader, text)
                restartAnimations();
            }
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        controlPanel.appendChild(wrapper);
    });

    // 2. Action Buttons
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'control-actions';

    // Play/Pause Button
    const pauseBtn = document.createElement('button');
    pauseBtn.textContent = 'Pause';
    pauseBtn.className = 'theme-btn';
    let isPlaying = true;

    pauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            root.style.setProperty('--anim-play-state', 'running');
            pauseBtn.textContent = 'Pause';
        } else {
            root.style.setProperty('--anim-play-state', 'paused');
            pauseBtn.textContent = 'Play';
        }
    });

    // Restart Button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart';
    restartBtn.className = 'theme-btn';
    restartBtn.addEventListener('click', () => {
        restartAnimations();
    });

    actionsWrapper.appendChild(pauseBtn);
    actionsWrapper.appendChild(restartBtn);
    controlPanel.appendChild(actionsWrapper);

    // Automatic Toast Preview
    function startToastPreviewLoop() {
        const previewContainer = document.querySelector('.toast-loader');
        
        // Safety check: only run if the element exists (prevents errors on other pages)
        if (previewContainer) {
            const loop = async () => {
                // Check if global animation state is paused
                const isPaused = getComputedStyle(root).getPropertyValue('--anim-play-state').trim() === 'paused';
                
                if (!isPaused) {
                    await createToast(previewContainer, '✔ Notification');
                }
                
                // Wait 1.5 seconds before showing the next one
                setTimeout(loop, 1500); 
            };
            
            // Kickstart the loop
            loop();
        }
    }

    // Helper: Creates a toast inside the target container
    function createToast(container, message) {
        return new Promise((resolve) => {
            const toast = document.createElement('div');
            toast.className = 'toast-preview'; 
            toast.innerHTML = `<span>${message}</span>`;
            
            container.appendChild(toast);

            // Cleanup after animation (3s total duration)
            setTimeout(() => {
                toast.remove();
                resolve(); // Signal that this cycle is done
            }, 3000);
        });
    }

    // Automatic Toggle Switch Preview
    function startTogglePreviewLoop() {
        const toggleCheckbox = document.querySelector('.preview-toggle input');
        
        if (toggleCheckbox) {
            const loop = () => {
                // Check if paused
                const isPaused = getComputedStyle(root).getPropertyValue('--anim-play-state').trim() === 'paused';
                
                if (!isPaused) {
                    // Simply flip the checked state
                    toggleCheckbox.checked = !toggleCheckbox.checked;
                }
                
                // Flip every 1.5 seconds
                setTimeout(loop, 1500);
            };
            loop();
        }
    }

    // Initialize the loop immediately
    startToastPreviewLoop();
    startTogglePreviewLoop();
});
