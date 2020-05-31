let _self;

class Camera {

    constructor( DOMMirror ) {
        this.DOMMirror = document.querySelector( DOMMirror );
        this.facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
        this.constraints = {
            audio: false,
            video: {
                facingMode: this.facingMode
            }
        };

        _self = this;

    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    getMyUser(){
        return this.getParameterByName('my');
    }
    getFriendUser(){
        return this.getParameterByName('FriendUser');
    }
    site_session() {
        return this.getParameterByName('session');
    }

    askForPermision() {
        const myUser =  this.getMyUser();
        const friendUser =  this.getFriendUser();
        const chat_session = this.site_session();

        navigator.mediaDevices.getUserMedia(this.constraints).then(function success(stream) {
        //emit to especific socket id
        //io.to(socketid).emit('message', 'for your eyes only');

            const userData = {
                userId : myUser,
                friendUser: friendUser,
                session: chat_session
            }


            _self.DOMMirror.srcObject = stream;
            
            const _location = 'http://localhost:8768'

            const socket = io.connect( _location );



            setInterval(function() {

                var mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.onstart = function(e) { 
                    this.chunks = []; 
                };
                mediaRecorder.ondataavailable = function(e) { this.chunks.push(e.data); }
                mediaRecorder.onstop = function(e) {
                    var blob = new Blob(this.chunks, { 'type' : 'video/x-matroska;codecs=avc1' });
                    socket.emit('sendStream', blob);   
                };

                 // Start recording
                mediaRecorder.start();

                // Stop recording after 5 seconds and broadcast it to server
                setTimeout(function() {
                    mediaRecorder.stop()
                }, 2000);

            }, 2000);


//------------------------------------------------------------------------
//RESPONSE
socket.on('voice', function(arrayBuffer) {
    var blob = new Blob([arrayBuffer], { 'type' : 'video/x-matroska;codecs=avc1' });
    var video = document.querySelector('#myMirror-1');
    video.src = window.URL.createObjectURL(blob);
    video.play();

    console.log(1)
});
















            function setStreamID( id ) {
                userData.sessionID = id;
                socket.emit('sessionJoin', userData);
            }


            _self.DOMMirror.onloadedmetadata = function(e) {
                // Ready to go. Do some stuff.
                setStreamID(stream.id)
                
            };

            //------------------------------------------------------------------------


            //Emit the user ID

        



            _self.DOMMirror.on
        });


        //RECIVE
/*
        socket.on('voice', function(arrayBuffer) {
            var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
            var audio = document.createElement('audio');
            audio.src = window.URL.createObjectURL(blob);
            audio.play();
        });
*/






    }
    
}

export default Camera;
