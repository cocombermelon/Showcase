// This script is to use webcam inside the portal

AFRAME.registerComponent('camera-sky', {
    init: function () {
        var portalEntity = this.el
        var sceneEl = this.el.sceneEl;

        // Check if getUserMedia is supported by the browser
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    var videoEl = document.createElement('video');
                    videoEl.setAttribute('autoplay', '');
                    videoEl.setAttribute('muted', '');
                    videoEl.srcObject = stream;

                    var texture = new THREE.VideoTexture(videoEl);
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.format = THREE.RGBFormat;

                    portalEntity.object3D.traverse(function (node) {
                        if (node.isMesh && node.material.map) {
                            node.material.map = texture;
                            node.material.needsUpdate = true;
                        }
                    });
                })
                .catch(function (error) {
                    console.error('Failed to access camera', error);
                });
        } else {
            console.error('getUserMedia is not supported by this browser');
        }
    }
});