import { useEffect, useRef } from 'react';

const VideoPlayer = (props) => {

    let videoRef = useRef()

    const { url, image } = props

    const stopVideo = (e) => {
        console.log('Off')
        e.target.pause();
        e.target.currentTime = 0;
    }
    
    const playVideo = (e) => {
        e.target.play();
    }

    useEffect(() => {
        // to stop the auto play
        var mouseOutEvent = document.createEvent('Events');
        mouseOutEvent.initEvent('mouseout', true, false);
        videoRef.dispatchEvent(mouseOutEvent)
        // eslint-disable-next-line
    })

    return (
        <video ref={element => videoRef = element} 
            onMouseOver={(e) => playVideo(e)}
            onMouseOut={(e) => stopVideo(e)}
            style={{objectFit: 'cover', height: '100%', width: '100%'}}
            src={url}
            // poster={image}
            // playsInline={true}
            autoPlay={true}
            loop
            preload='auto' 
            muted={true}
        />
    )
}

export default VideoPlayer;